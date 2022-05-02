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

  import { MedicineAnalysisService } from './service';

  const CONDITION_MAP = {
    'CH': [{language: 'CH'}, {language: 'EN'}],
    'EN': {language: 'EN'}
  } as any

  @Controller('/api/crophe')
  @UseBefore(FormatResponse)
  export class ArticleController {
      constructor(private medicineAnalysisService: MedicineAnalysisService) {}

      @Get('/medicine_analysis')
      async getArticleList(
        @QueryParam('page_size') pageSize?: number,
        @QueryParam('page') page?: number,
      ) {
          const [articleList, total] = await this.medicineAnalysisService.getArticleAndCount(
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

    @Post('/medicine_analysis')
    async addArticle(
      @BodyParam('name') name:string,
      @BodyParam('date') date:string,
      @BodyParam('lan') language:string,
      @UploadedFile('file') file:any
    ){
      const result = await this.medicineAnalysisService.addArticle({name,date,language,file})
      return result;
    }

    @Delete('/medicine_analysis')
    async deleteArticle(
      @BodyParam('id') id:number
    ){
      const result = await this.medicineAnalysisService.deleteArticle({id});
      return result
    }
  }