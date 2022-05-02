import {
    Get,
    Post,
    BodyParam,
    Controller,
    Ctx,
    UseBefore,
    QueryParam
  } from 'routing-controllers';
  import { IContext } from '@/interface';
  import { FormatResponse } from '@/app/middlewares/formatResponse';
  import { generateToken, verifyToken, tokenExp } from '@/utils/token';

  import { userService } from './service';


  @Controller('/api/crophe')
  @UseBefore(FormatResponse)
  export class UserController {
      constructor(private userService: userService) {}

      @Post('/login')
      async login(
        @Ctx() ctx: IContext,
        @BodyParam('username') username: string,
        @BodyParam('password') password: string
      ) {

          const result = await this.userService.getUser({ username, password });
 
          if (result.length === 0) {
            throw '账号或密码错误';
          }

          const { username: userName, id } = result[0]
          
          return {
            username: userName,
            token: generateToken(id)
          }
      }

      @Get('/check_login')
      async checkLogin(
        @Ctx() ctx: IContext,
        @QueryParam('jwt') jwt: string,
      ) {
        try {
          return {
            login: verifyToken(jwt) && tokenExp(jwt) > 0,
          }
        } catch (e) {
          return {
            login: false
          }
        }
        
      }

      @Get('/logout')
      async logOut(
        @Ctx() ctx: IContext,
      ) {
        
        let ctxCop = ctx as any;
        ctxCop.session = null;

        return {
          message: 'logout'
        }
      }
  }