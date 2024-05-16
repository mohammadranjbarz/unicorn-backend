import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Put,
  Logger,
  Post,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';

import { NsService } from './ns.service';
import {
  CreateCustomSubnameDataDto,
  CreateSubnameDto,
  CreateTextRecordDto,
  GetCustomSubnameDataDto,
  GetSubnameMetadataDto,
  GetSubnameResolutionDto,
} from './dto/ns.dto';
import { ApiResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import * as FormData from 'form-data';
import axios from 'axios';

@Controller({ path: 'ns' })
export class NsController {
  private readonly logger = new Logger(NsController.name);
  constructor(
    private readonly nsService: NsService,
    private readonly configService: ConfigService,
  ) {}

  // AVAILABILITY API ----------
  @Get('/isAvailable')
  async isAvailable(@Query('label') label: string) {
    try {
      return await this.nsService.getIsNameAvailable(label);
    } catch (error) {
      console.log({ error });
      this.logger.error('Error checking availability', error);
      throw new BadRequestException('Error checking availability');
    }
  }
  // ----------

  // DATA API ----------
  @Put('/createCustomSubnameData')
  async createCustomSubnameData(
    @Body() createCustomSubnameDataDto: CreateCustomSubnameDataDto,
  ) {
    try {
      return await this.nsService.createCustomSubnameData(
        createCustomSubnameDataDto.label,
        createCustomSubnameDataDto.key,
        createCustomSubnameDataDto.data,
      );
    } catch (error) {
      this.logger.error('Error creating custom subname data', error);
      throw new BadRequestException('Error creating custom subname data');
    }
  }

  @Get('/getCustomSubnameData')
  async getCustomSubnameData(
    @Query() getCustomSubnameDataDto: GetCustomSubnameDataDto,
  ) {
    try {
      return await this.nsService.getCustomSubnameData(
        getCustomSubnameDataDto.label,
        getCustomSubnameDataDto.key,
      );
    } catch (error) {
      this.logger.error('Error retrieving custom subname data', error);
      throw new BadRequestException('Error retrieving custom subname data');
    }
  }
  // ----------

  // MINT API ----------
  @Post('createSubname')
  @ApiResponse({ status: 201, description: 'Subname created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async createSubname(@Body() createSubnameDto: CreateSubnameDto) {
    try {
      const result = await this.nsService.createSubname(
        createSubnameDto.label,
        createSubnameDto.address,
      );
      return { message: 'Subname created successfully.', data: result };
    } catch (error) {
      this.logger.error('Failed to create subname', error);
      throw new BadRequestException('Failed to create subname');
    }
  }
  // ----------

  // RECORD API ----------
  @Get('/getSubnameMetadata')
  @ApiResponse({
    status: 200,
    description: 'Subname metadata retrieved successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async getSubnameMetadata(
    @Query() getSubnameMetadataDto: GetSubnameMetadataDto,
  ) {
    try {
      const metadata = await this.nsService.getSubnameMetadata(
        getSubnameMetadataDto.label,
        getSubnameMetadataDto.key,
      );
      return {
        message: 'Subname metadata retrieved successfully.',
        data: metadata,
      };
    } catch (error) {
      this.logger.error('Failed to retrieve subname metadata', error);
      throw new BadRequestException('Failed to retrieve subname metadata');
    }
  }

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('data'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const maxSize = 10 * 1024 * 1024; // 10mb
    const validMimeTypes = ['image/jpeg', 'image/webp', 'image/png'];

    if (!validMimeTypes.includes(file.mimetype))
      throw new BadRequestException('Image format not supported!');

    if (file.size > maxSize)
      throw new BadRequestException('Image size is too big.');

    const data = new FormData();
    const stream = file.buffer;
    data.append('file', stream, {
      filename: file.originalname,
      contentType: file.mimetype,
    });
    try {
      const response = await axios.post(
        this.configService.get('PINATA_UPLOAD_URL')!,
        data,
        {
          headers: {
            ['Content-Type']: `multipart/form-data`,
            Authorization: `Bearer ${this.configService.get('PINATA_JWT')}`,
          },
        },
      );

      return response.data;
    } catch (e) {
      console.error(e);
    }
  }

  @Put('/createTextRecord')
  @ApiResponse({
    status: 200,
    description: 'Text record created or updated successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async createTextRecord(@Body() createTextRecordDto: CreateTextRecordDto) {
    try {
      const result = await this.nsService.createTextRecord(
        createTextRecordDto.label,
        createTextRecordDto.key,
        createTextRecordDto.data,
      );
      return {
        message: 'Text record created or updated successfully.',
        data: result,
      };
    } catch (error) {
      this.logger.error('Failed to create or update text record', error);
      throw new BadRequestException('Failed to create or update text record');
    }
  }

  // ----------

  // RESOLUTION API ----------
  @Get('/getSubnameResolution')
  @ApiResponse({
    status: 200,
    description: 'Subname resolution data retrieved successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async getSubnameResolution(
    @Query() getSubnameResolutionDto: GetSubnameResolutionDto,
  ) {
    try {
      const resolutionData = await this.nsService.getSubnameResolution(
        getSubnameResolutionDto.address,
      );
      return {
        message: 'Subname resolution data retrieved successfully.',
        data: resolutionData,
      };
    } catch (error) {
      this.logger.error('Failed to retrieve subname resolution data', error);
      throw new BadRequestException(
        'Failed to retrieve subname resolution data',
      );
    }
  }
}
