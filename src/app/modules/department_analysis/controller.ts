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
        @QueryParam('page_size') pageSize?: number,
        @QueryParam('page') page?: number,
      ) {
          const [articleList, total] = await this.departMentAnalysisService.getArticleAndCount(
              {
                order: { id: 'DESC' }
              }, 
              paginationUtils.getCondition(page, pageSize)
            );
          return {
            data: articleList,
            ...paginationUtils.getResponse(total, page, pageSize)
          };
      }

    @Delete('/department_analysis')
    async deleteArticle(
      @BodyParam('id') id:number
    ){
      const result = await this.departMentAnalysisService.deleteArticle({id});
      return result
    }
  }