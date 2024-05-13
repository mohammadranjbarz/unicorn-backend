import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { NsModule } from './ns.module';

describe('NsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [NsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ns/isAvailable (GET)', () => {
    return request(app.getHttpServer())
      .get('/ns/isAvailable?label=example')
      .expect(200)
      .expect({
        isAvailable: true,
      });
  });

  it('/ns/getCustomSubnameData (GET)', () => {
    const label = 'exampleLabel';
    const key = 'exampleKey';

    return request(app.getHttpServer())
      .get(`/ns/getCustomSubnameData?label=${label}&key=${key}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toMatchObject({
          data: 'Sample data content', // Expected data content
        });
      });
  });

  it('/ns/createCustomSubnameData (PUT)', () => {
    const customData = {
      label: 'testLabel',
      key: 'testKey',
      data: 'testData',
    };

    return request(app.getHttpServer())
      .put('/ns/createCustomSubnameData')
      .send(customData)
      .expect(201)
      .then((response) => {
        expect(response.body).toMatchObject({
          message: 'Custom subname data created successfully.',
        });
      });
  });

  it('/ns/createSubname (POST)', () => {
    const subnameData = {
      label: 'newSubname',
      address: '0x123456789abcdef',
    };

    return request(app.getHttpServer())
      .post('/ns/createSubname')
      .send(subnameData)
      .expect(201)
      .then((response) => {
        expect(response.body).toMatchObject({
          message: 'Subname created successfully.',
        });
      });
  });

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
