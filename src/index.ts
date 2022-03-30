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
      controllers: [__dirname + '/app/modules/article/controller.ts', __dirname + '/app/modules/**/controller.js'],
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
    app.listen(config.port, config.hostname);
  
    console.log(`starting listening: ${config.hostname}:${config.port}`);
  }
  
  (async () => {
    await beforeStart();
  
    startKoaServer();
  })();