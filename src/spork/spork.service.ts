import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import {
  createThirdwebClient,
  getContract,
  sendAndConfirmTransaction,
  sendTransaction,
} from 'thirdweb';
import { polygon } from 'thirdweb/chains';
import { privateKeyAccount, privateKeyToAccount } from 'thirdweb/wallets';
import { approve } from 'thirdweb/extensions/erc20';
import { transferFrom } from 'thirdweb/extensions/erc20';
import { ConfigService } from '@nestjs/config';

const SPORK_ADDRESS = '0x9CA6a77C8B38159fd2dA9Bd25bc3E259C33F5E39';

@Injectable()
export class SporkDAOService {
  constructor(
    private httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

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

  async airDropSpork(
    address: string,
    amount: string,
  ): Promise<{ success: boolean; transactionHash: string }> {
    try {
      const clientId = this.configService.get('THIRDWEB_CLIENT_ID');
      const privateKey = this.configService.get('THIRDWEB_WALLET_PRIVATE_KEY');
      if (!clientId || !privateKey) throw new Error('No thirdweb credentials');
      if (!address || !amount) throw new Error('Invalid address or amount');

      const client = createThirdwebClient({
        clientId: clientId,
      });
      const account = privateKeyToAccount({
        client,
        privateKey: privateKey,
      });

      const sporkTokenContract = getContract({
        address: SPORK_ADDRESS,
        chain: polygon,
        client,
      });
      const approveTransaction = await approve({
        contract: sporkTokenContract,
        spender: account.address,
        amount: amount,
      });

      await sendAndConfirmTransaction({
        account,
        transaction: approveTransaction,
      });

      const transaction = transferFrom({
        contract: sporkTokenContract,
        from: account.address,
        to: address,
        amount,
      });

      const { transactionHash } = await sendTransaction({
        transaction,
        account,
      });

      return { success: true, transactionHash };
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }
}
