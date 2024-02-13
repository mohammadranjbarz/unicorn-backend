import { BadRequestException, Injectable, Logger } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { Chains } from './types/chains';

@Injectable()
export class NsService {
  private readonly logger = new Logger(NsService.name);
  constructor(private readonly prismaService: PrismaService) {}

  getSafeSubname = async (safe: string) => {
    const exists = await this.prismaService.user.findFirst({
      where: {
        records: {
          some: {
            value: safe,
          },
        },
      },
    });
    if (!exists) throw new BadRequestException('Invalid address');
    return exists.subname;
  };

  subnameIsAvailable = async (subname: string) => {
    const exists = await this.prismaService.user.findFirst({
      where: { subname: { equals: subname } },
    });

    return !!!exists;
  };

  createSubname = async (safe: string, subname: string, chain: Chains) => {
    const user = await this.prismaService.user.create({
      data: {
        subname,
      },
    });

    const record = await this.prismaService.record.create({
      data: {
        type: 'ADDRESS',
        key: chain,
        value: safe,
        userId: user.id,
      },
    });
  };
}
