import "reflect-metadata";
import './alias';

import Koa from 'koa';
import { Container } from 'typedi';
import { useKoaServer, useContainer } from "routing-controllers";

import { config } from '@/config';
import { beforeStart } from '@/beforeStart';
import { sessionMiddleware } from '@/app/middlewares/session';
import { staticMiddleware } from '@/app/middlewares/static';
import { templateMiddleware } from '@/app/middlewares/template';
const bodyParser = require('koa-bodyparser');
async function startKoaServer() {
    useContainer(Container);
  
    const app = new Koa();
    useKoaServer(app, {
      controllers: [__dirname + '/app/modules/**/controller.ts', __dirname + '/app/modules/**/controller.js'],
    });
    
        //../../Crophe/WebRoot
    staticMiddleware(app,'../Crophe');
    templateMiddleware(app);
    app.use(sessionMiddleware(app));
    app.use(bodyParser({
      formLimit:"10mb",
      jsonLimit:"10mb",
      textLimit:"10mb"
    }))
    // app.use(async (ctx, next)=> {
    //   ctx.set('Access-Control-Allow-Origin', '*');
    //   ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    //   ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    //   if (ctx.method == 'OPTIONS') {
    //     ctx.body = 200; 
    //   } else {
    //     await next();
    //   }
    // });
    app.use(require('koa2-cors')())  //解决跨域的问题
    app.listen(config.port, config.hostname);
  
    console.log(`starting listening: ${config.hostname}:${config.port}`);
  }
  
  (async () => {
    await beforeStart();
  
    startKoaServer();
  })();