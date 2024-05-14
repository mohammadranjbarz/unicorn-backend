import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { NsModule } from './ns.module';

// TODO: DEFINE BETTER INTEGRATION TESTS
describe('NsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [NsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ns/isAvailable (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/ns/isAvailable?label=example')
      .expect(200);
    expect(response.body.isAvailable).toBeDefined();
    expect(response.body.isAvailable).toEqual(false);
  });

  it('/ns/getCustomSubnameData (GET)', async () => {
    const label = 'exampleLabel';
    const key = 'exampleKey';
    await request(app.getHttpServer()) // faulty data
      .get(`/ns/getCustomSubnameData?label=${label}&key=${key}`)
      .expect(500);
  });

  it('/ns/createCustomSubnameData (PUT)', () => {
    const customData = {
      // faulty data
      label: 'testLabel',
      key: 'testKey',
      data: 'testData',
    };

    return request(app.getHttpServer())
      .put('/ns/createCustomSubnameData')
      .send(customData)
      .expect(500);
  });

  // it('/ns/createSubname (POST)', async () => {
  //   const subnameData = { label: '', address: '0x123' }; // Intentionally faulty data
  //   await request(app.getHttpServer())
  //     .post('/ns/createSubname')
  //     .send(subnameData)
  //     .expect(201);
  // });

  it('/ns/createTextRecord (PUT)', () => {
    const textRecordData = {
      label: 'testLabel',
      key: 'testKey',
      data: 'testData',
    };

    return request(app.getHttpServer())
      .put('/ns/createTextRecord')
      .send(textRecordData)
      .expect(200)
      .then((response) => {
        expect(response.body).toMatchObject({
          message: 'Text record created or updated successfully.',
        });
      });
  });

  it('/ns/getSubnameResolution (GET)', () => {
    return request(app.getHttpServer())
      .get('/ns/getSubnameResolution?address=0x123456789abcdef')
      .expect(200)
      .then((response) => {
        expect(response.body).toMatchObject({
          data: {
            source: expect.any(Object),
          },
        });
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
