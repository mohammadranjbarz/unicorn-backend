import { ApiProperty } from '@nestjs/swagger';
import { Chains } from '../types/chains';
import { IsEthereumAddress, IsIn } from 'class-validator';

export class CreateSubname {
  @ApiProperty({ description: 'Name of the subname' })
  name: string;

  @IsEthereumAddress()
  @ApiProperty({ description: 'The safe ethereum address' })
  safe: string;

  @ApiProperty({
    description: `The chain that the safe address is on, could be:  'ETH
  | 'Gorli' 
  | 'ARB' 
  | 'AUR' 
  | 'AVAX' 
  | 'BSC'
  | 'GNO' 
  | 'OP' 
  | 'MATIC' `,
  })
  @IsIn(['ETH', 'Gorli', 'ARB', 'AUR', 'AVAX', 'BSC', 'GNO', 'OP', 'MATIC'])
  chain: Chains;
}

export class GetSubname {
  @IsEthereumAddress()
  @ApiProperty({ description: 'The safe ethereum address' })
  safe: string;
}
