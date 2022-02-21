import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CUserDTO } from 'src/auth/dto/CUserDTO';

export const GetUser = createParamDecorator((data, host:ExecutionContext) => {
  const ctx = host.switchToHttp()
  const req = ctx.getRequest<Request&{user:CUserDTO}>()
  return req.user;
});