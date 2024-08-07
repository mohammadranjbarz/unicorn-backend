import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SporkDAOService {
  constructor(private httpService: HttpService) {}

  async getHasStaked(
    address: string,
  ): Promise<{ success: boolean; exists: boolean }> {
    try {
      return firstValueFrom(
        this.httpService
          .get<{ success: boolean; exists: boolean }>(
            `/api/member/hasStaked/${address}`,
          )
          .pipe(map((response) => response.data)),
      );
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async postMemberData(body: any): Promise<boolean> {
    try {
      return await firstValueFrom(
        this.httpService.post(`/api/member`, body).pipe(map((res) => res.data)),
      );
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
