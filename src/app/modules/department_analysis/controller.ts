import {
    Get,
    QueryParam,
    Controller,
    Post,
    Delete,
    UploadedFile,
    BodyParam,
    UseBefore
  } from 'routing-controllers';
  import { FormatResponse } from '@/app/middlewares/formatResponse';

  import { paginationUtils } from '@/utils';

  import { DepartMentAnalysisService } from './service';

  const CONDITION_MAP = {
    'CH': [{language: 'CH'}, {language: 'EN'}],
    'EN': {language: 'EN'}
  } as any

  @Controller('/api/crophe')
  @UseBefore(FormatResponse)
  export class ArticleController {
      constructor(private departMentAnalysisService: DepartMentAnalysisService) {}

      @Get('/department_analysis')
      async getArticleList(
        @QueryParam('lan') lan: string,
        @QueryParam('page_size') pageSize?: number,
        @QueryParam('page') page?: number,
      ) {
          const [articleList, total] = await this.departMentAnalysisService.getArticleAndCount(
              {
                where: CONDITION_MAP[lan],
                order: { id: 'DESC' }
              }, 
              paginationUtils.getCondition(page, pageSize)
            );
          return {
            articleList,
            pagination: paginationUtils.getResponse(total, page, pageSize)
          };
      }

    @Post('/department_analysis')
    async addArticle(
      @BodyParam('name') name:string,
      @BodyParam('date') date:string,
      @BodyParam('lan') language:string,
      @UploadedFile('file') file:any
    ){
      const result = await this.departMentAnalysisService.addArticle({name,date,language,file})
      return result;
    }

    @Delete('/department_analysis')
    async deleteArticle(
      @BodyParam('id') id:number
    ){
      const result = await this.departMentAnalysisService.deleteArticle({id});
      return result
    }
  }