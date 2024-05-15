import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, catchError } from 'rxjs/operators';
import { PrismaService } from 'src/prisma.service';
import { SubnameResolutionResponse } from 'src/types/ens';
import { firstValueFrom } from 'rxjs';
import { throwError } from 'rxjs';

@Injectable()
export class NsService {
  private readonly ENS_DOMAIN = process.env.OFFCHAIN_ENS_DOMAIN;
  private readonly COIN_TYPE = 60; // ETH

  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  async getIsNameAvailable(label: string) {
    const url = `/v1/subname/availability/${label}/${this.ENS_DOMAIN}`;
    try {
      const response = await firstValueFrom(
        this.httpService
          .get<{ isAvailable: boolean }>(url)
          .pipe(map((response) => response.data.isAvailable)),
      );
      return response;
    } catch (error: any) {
      throwError(() => new Error(error));
    }
  }

  async createSubname(label: string, address: string): Promise<any> {
    return firstValueFrom(
      this.httpService
        .post('/v1/subname/mint', {
          label,
          address,
          domain: this.ENS_DOMAIN,
        })
        .pipe(map((response) => response.data)),
    );
  }

  async createTextRecord(
    label: string,
    key: string,
    text: string,
  ): Promise<boolean> {
    return firstValueFrom(
      this.httpService
        .put<boolean>(
          `/v1/subname/record/${label}/${this.ENS_DOMAIN}/${key}/${text}`,
        )
        .pipe(map((response) => response.data)),
    );
  }

  async getSubnameResolution(
    address: string,
  ): Promise<Array<SubnameResolutionResponse>> {
    return firstValueFrom(
      this.httpService
        .get<Array<SubnameResolutionResponse>>(
          `/v1/subname/resolution/${address}/${this.COIN_TYPE}`,
        )
        .pipe(map((response) => response.data)),
    );
  }

  async getSubnameMetadata(label: string, key: string): Promise<string> {
    return firstValueFrom(
      this.httpService
        .get<{ record: string }>(
          `/v1/subname/record/${label}/${this.ENS_DOMAIN}/${key}`,
        )
        .pipe(map((response) => response.data.record)),
    );
  }

  async createCustomSubnameData(
    label: string,
    key: string,
    data: string,
  ): Promise<boolean> {
    return firstValueFrom(
      this.httpService
        .put<boolean>(`/v1/subname/data/${label}/${this.ENS_DOMAIN}/${key}`, {
          data,
        })
        .pipe(map((response) => response.data)),
    );
  }

  async getCustomSubnameData(label: string, key: string): Promise<string> {
    return firstValueFrom(
      this.httpService
        .get<string>(`/v1/subname/data/${label}/${this.ENS_DOMAIN}/${key}`)
        .pipe(map((response) => response.data)),
    );
  }
}
