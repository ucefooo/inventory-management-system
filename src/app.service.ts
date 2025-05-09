import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      message: 'Welcome to the Inventory Management System API',
      version: '1.0.0',
      documentation: '/api-docs',
    };
  }
}