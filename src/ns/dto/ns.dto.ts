import { ApiProperty } from '@nestjs/swagger';
import { Chains } from '../types/chains';
import { IsEthereumAddress, IsIn, IsNotEmpty, IsString } from 'class-validator';

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

export class CreateCustomSubnameDataDto {
  @ApiProperty({ description: 'Label of the subname' })
  @IsString()
  label: string;

  @ApiProperty({ description: 'Key for the subname' })
  @IsString()
  key: string;

  @ApiProperty({ description: 'Data to be stored' })
  @IsString()
  data: string;

  @ApiProperty({ description: 'Domain to be stored' })
  @IsString()
  domain: string;
}

export class GetCustomSubnameDataDto {
  @ApiProperty({ description: 'Label of the subname' })
  @IsString()
  label: string;

  @ApiProperty({ description: 'Key associated with the data' })
  @IsString()
  key: string;

  @ApiProperty({ description: 'Domain to be stored' })
  @IsString()
  domain: string;
}

export class CreateSubnameDto {
  @ApiProperty({ description: 'Label for the subname' })
  @IsString()
  @IsNotEmpty()
  label: string;

  @ApiProperty({ description: 'Ethereum address' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ description: 'Domain to be stored' })
  @IsString()
  domain: string;
}

export class GetSubnameMetadataDto {
  @ApiProperty({ description: 'Label of the subname' })
  @IsString()
  label: string;

  @ApiProperty({ description: 'Key for the subname metadata' })
  @IsString()
  key: string;

  @ApiProperty({ description: 'Domain to be stored' })
  @IsString()
  domain: string;
}

export class CreateTextRecordDto {
  @ApiProperty({ description: 'Label of the subname' })
  @IsString()
  label: string;

  @ApiProperty({ description: 'Key for the text record' })
  @IsString()
  key: string;

  @ApiProperty({ description: 'Text to be stored' })
  @IsString()
  data: string;

  @ApiProperty({ description: 'Domain to be stored' })
  @IsString()
  domain: string;
}

export class GetSubnameResolutionDto {
  @ApiProperty({ description: 'Ethereum address to resolve subname for' })
  @IsEthereumAddress()
  address: string;
}
