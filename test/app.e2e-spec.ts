import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';

describe('App 2e2', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const modelRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = modelRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });
  afterAll(() => {
    app.close();
  });
  it.todo('should pass');
});
