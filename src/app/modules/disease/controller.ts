import {
    Get,
    QueryParam,
    Controller,
    Post,
    Delete,
    BodyParam,
    UseBefore
  } from 'routing-controllers';
  import { FormatResponse } from '@/app/middlewares/formatResponse';

  import { paginationUtils } from '@/utils';

  import { DiseaseService } from './service';

  const CONDITION_MAP = {
    'CH': [{language: 'CH'}, {language: 'EN'}],
    'EN': {language: 'EN'}
  } as any

  @Controller('/api/crophe')
  @UseBefore(FormatResponse)
  export class ArticleController {
      constructor(private diseaseService: DiseaseService) {}

      @Get('/disease')
      async getArticleList(
        @QueryParam('pageSize') pageSize?: number,
        @QueryParam('current') page?: number,
      ) {
          const [articleList, total] = await this.diseaseService.getArticleAndCount(
              paginationUtils.getCondition(page, pageSize)
            );
          return {
            data: articleList,
            ...paginationUtils.getResponse(total, page, pageSize)
          };
      }

    @Post('/disease')
    async addArticle(
      @BodyParam('disease_code') disease_code:string,
      @BodyParam('disease_ref_department') disease_ref_department:string,
      @BodyParam('disease_description') disease_description?:string,
    ){
      const result = await this.diseaseService.addArticle({disease_code,disease_ref_department,disease_description})
      return result;
    }

    @Post('/disease')
    async updateDisease(
      @BodyParam('id') id:number,
      @BodyParam('disease_code') disease_code:string,
      @BodyParam('disease_ref_department') disease_ref_department:string,
      @BodyParam('disease_description') disease_description?:string,
    ){
      const result = await this.diseaseService.addArticle({id, disease_code, disease_ref_department, disease_description})
      return result;
    }

    @Delete('/disease')
    async deleteArticle(
      @BodyParam('id') id:number
    ){
      const result = await this.diseaseService.deleteArticle({id});
      return result
    }
  }