import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { SubnameResolutionResponse } from 'src/types/ens';
import { firstValueFrom } from 'rxjs';
import { throwError } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NsService {
  private readonly COIN_TYPE = 60; // ETH

  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  async getIsNameAvailable(label: string, domain: string) {
    console.log({});
    const url = `/v1/subname/availability/${label}/${domain}`;
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

  async createSubname(
    label: string,
    address: string,
    domain: string,
  ): Promise<any> {
    return firstValueFrom(
      this.httpService
        .post('/v1/subname/mint', {
          label,
          address,
          domain,
        })
        .pipe(map((response) => response.data)),
    );
  }

  async createTextRecord(
    label: string,
    key: string,
    text: string,
    domain: string,
  ): Promise<boolean> {
    return firstValueFrom(
      this.httpService
        .put<boolean>(`/v1/subname/record/${label}/${domain}/${key}/${text}`)
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

  async getSubnameMetadata(
    label: string,
    key: string,
    domain: string,
  ): Promise<string> {
    return firstValueFrom(
      this.httpService
        .get<{ record: string }>(`/v1/subname/record/${label}/${domain}/${key}`)
        .pipe(map((response) => response.data.record)),
    );
  }

  async createCustomSubnameData(
    label: string,
    key: string,
    data: string,
    domain: string,
  ): Promise<boolean> {
    return firstValueFrom(
      this.httpService
        .put<boolean>(`/v1/subname/data/${label}/${domain}/${key}`, {
          data,
        })
        .pipe(map((response) => response.data)),
    );
  }

  async getCustomSubnameData(
    label: string,
    key: string,
    domain: string,
  ): Promise<string> {
    return firstValueFrom(
      this.httpService
        .get<string>(`/v1/subname/data/${label}/${domain}/${key}`)
        .pipe(map((response) => response.data)),
    );
  }
}
