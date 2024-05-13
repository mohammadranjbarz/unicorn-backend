import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OsNft, PoapResponse } from 'src/types/poap';

@Injectable()
export class PoapService {
  constructor(private httpService: HttpService) {}

  getUserPOAPs(address: string): Observable<OsNft[]> {
    return this.httpService.get<PoapResponse[]>(`actions/scan/${address}`).pipe(
      map((response) =>
        response.data.map((poap) => ({
          collection: 'POAP',
          contract: '',
          description: poap.event.description,
          floorPrice: 0,
          image_url: poap.event.image_url,
          opensea_url: '',
          identifier: poap.tokenId,
          is_disabled: false,
          is_nsfw: false,
          metadata: {
            name: poap.event.name,
            description: poap.event.description,
            image: poap.event.image_url,
            attributes: [],
          },
          name: poap.event.name,
          token_standard: 'ERC721',
          updated_at: poap.created,
        })),
      ),
    );
  }

  postEventQRCodes(token: string): Observable<boolean> {
    return this.httpService
      .post(
        `/event/${process.env.POAP_EVENT_ID}/qr-codes`,
        {
          secret_code: process.env.POAP_EVENT_SECRET,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .pipe(map((res) => res.data));
  }

  getActionsClaimQr(qr_hash: string, token: string): Observable<boolean> {
    return this.httpService
      .get('/actions/claim-qr', {
        params: { qr_hash },
        headers: { Authorization: `Bearer ${token}` },
      })
      .pipe(map((res) => res.data));
  }

  postActionsClaimQr(body: any, token: string): Observable<boolean> {
    return this.httpService
      .post('/actions/claim-qr', body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .pipe(map((res) => res.data));
  }

  getActionsScan(address: string): Observable<boolean> {
    return this.httpService
      .get(`/actions/scan/${address}/${process.env.POAP_EVENT_ID}`)
      .pipe(map((res) => res.data));
  }

  postOauthToken(): Observable<any> {
    return this.httpService
      .post(
        '/oauth/token',
        {
          audience: 'https://api.poap.tech',
          grant_type: 'client_credentials',
          client_id: process.env.POAP_CLIENT_ID,
          client_secret: process.env.POAP_CLIENT_SECRET,
        },
        {
          headers: { 'X-API-Key': undefined },
        },
      )
      .pipe(map((res) => res.data));
  }
}
