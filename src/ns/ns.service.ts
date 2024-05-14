import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { PrismaService } from 'src/prisma.service';
import { SubnameResolutionResponse } from 'src/types/ens';

@Injectable()
export class NsService {
  private readonly ENS_DOMAIN = process.env.OFFCHAIN_ENS_DOMAIN;
  private readonly COIN_TYPE = 60; // ETH

  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  getIsNameAvailable(label: string) {
    const url = `/v1/subname/availability/${label}/${this.ENS_DOMAIN}`;
    return this.httpService
      .get<{ isAvailable: boolean }>(url)
      .pipe(map((response) => response.data));
  }

  createSubname = async (label: string, address: string) => {
    return this.httpService
      .post('/v1/subname/mint', {
        label,
        address,
        domain: process.env.OFFCHAIN_ENS_DOMAIN,
      })
      .pipe(map((response) => response.data));
  };

  async createTextRecord(label: string, key: string, text: string) {
    return this.httpService
      .put<boolean>(
        `/v1/subname/record/${label}/${this.ENS_DOMAIN}/${key}/${text}`,
      )
      .pipe(map((response) => response.data));
  }

  async getSubnameResolution(address: string) {
    return this.httpService
      .get<Array<SubnameResolutionResponse>>(
        `/v1/subname/resolution/${address}/${this.COIN_TYPE}`,
      )
      .pipe(map((response) => response.data));
  }

  async getSubnameMetadata(label: string, key: string) {
    return this.httpService
      .get<{ record: string }>(
        `/v1/subname/record/${label}/${this.ENS_DOMAIN}/${key}`,
      )
      .pipe(map((response) => response.data));
  }

  async createCustomSubnameData(label: string, key: string, data: string) {
    return this.httpService
      .put<boolean>(`/v1/subname/data/${label}/${this.ENS_DOMAIN}/${key}`, {
        data,
      })
      .pipe(map((response) => response.data));
  }

  async getCustomSubnameData(label: string, key: string) {
    return this.httpService
      .get<string>(`/v1/subname/data/${label}/${this.ENS_DOMAIN}/${key}`)
      .pipe(map((response) => response.data));
  }
}
