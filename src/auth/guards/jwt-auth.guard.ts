// src/auth/guards/jwt.guard.ts
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
  import { JwtService } from '@nestjs/jwt';
  
  @Injectable()
  export class JwtAuthGuard implements CanActivate {
    constructor(private reflector: Reflector, private jwtService: JwtService) {}
  
    canActivate(context: ExecutionContext): boolean {
      // Check if the route is public
      const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
  
      if (isPublic) {
        return true;
      }
  
      // If not public, validate JWT
      const request = context.switchToHttp().getRequest();
      const authorization = request.headers['authorization'];
  
      if (!authorization) {
        throw new UnauthorizedException('Missing Authorization Header');
      }
  
      const token = authorization.split(' ')[1];
      if (!token) {
        throw new UnauthorizedException('Invalid Token Format');
      }
  
      try {
        const payload = this.jwtService.verify(token);
        request.user = payload; // Attach user data to request
        return true;
      } catch (err) {
        throw new UnauthorizedException('Invalid Token');
      }
    }
  }
  