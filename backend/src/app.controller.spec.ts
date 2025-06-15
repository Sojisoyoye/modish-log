import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('getHello', () => {
    it('should return welcome message from service', () => {
      const result = 'Welcome to the Modish Log API!';
      jest.spyOn(appService, 'getHello').mockImplementation(() => result);
      expect(appController.getHello()).toBe(result);
    });
  });

  describe('getHealth', () => {
    it('should return health check message', () => {
      expect(appController.getHealth()).toBe('API is healthy!');
    });
  });

  describe('getApiHealth', () => {
    it('should return detailed health object', () => {
      const result = appController.getApiHealth();
      expect(result).toHaveProperty('status', 'healthy');
      expect(result).toHaveProperty('timestamp');
      expect(result).toHaveProperty('version');
    });
  });

  describe('getVersion', () => {
    it('should return version', () => {
      expect(appController.getVersion()).toBe('v1.0.0');
    });
  });
});
