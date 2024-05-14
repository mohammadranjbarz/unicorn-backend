import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PoapModule } from './poap.module';

describe('PoapController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PoapModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should fetch POAPs for a given user address', async () => {
    await request(app.getHttpServer())
      .get('/poap/user/0x00d18ca9782be1caef611017c2fbc1a39779a57c')
      .expect(200);
  });
});
