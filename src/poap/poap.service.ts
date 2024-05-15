import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, catchError } from 'rxjs/operators';
import { OsNft, PoapResponse } from 'src/types/poap';
import { firstValueFrom, throwError } from 'rxjs';

@Injectable()
export class PoapService {
  constructor(private httpService: HttpService) {}

  async getUserPOAPs(address: string): Promise<OsNft[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<PoapResponse[]>(`actions/scan/${address}`).pipe(
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
          catchError((error) => throwError(() => new Error(error))),
        ),
      );
      console.log({ response });
      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async postEventQRCodes(token: string): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.httpService
          .post(
            `/event/${process.env.POAP_EVENT_ID}/qr-codes`,
            {
              secret_code: process.env.POAP_EVENT_SECRET,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          )
          .pipe(map((res) => res.data)),
      );
      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getActionsClaimQr(qr_hash: string, token: string): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.httpService
          .get('/actions/claim-qr', {
            params: { qr_hash },
            headers: { Authorization: `Bearer ${token}` },
          })
          .pipe(map((res) => res.data)),
      );
      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async postActionsClaimQr(body: any, token: string): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.httpService
          .post('/actions/claim-qr', body, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .pipe(map((res) => res.data)),
      );
      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getActionsScan(address: string): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.httpService
          .get(`/actions/scan/${address}/${process.env.POAP_EVENT_ID}`)
          .pipe(map((res) => res.data)),
      );
      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async postOauthToken(): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService
          .post(
            '/oauth/token',
            {
              audience: 'https://api.poap.tech',
              grant_type: 'client_credentials',
              client_id: process.env.POAP_CLIENT_ID,
              client_secret: process.env.POAP_CLIENT_SECRET,
            },
            {
              baseURL: process.env.POAP_AUTH_BASE_URL,
              headers: { 'X-API-Key': undefined },
            },
          )
          .pipe(map((res) => res.data)),
      );
      return response;
    } catch (error: any) {
      console.log({ error });
      throw new Error(error);
    }
  }
}
