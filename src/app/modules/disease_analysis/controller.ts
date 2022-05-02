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

  import { DiseaseAnalysisService } from './service';

  const CONDITION_MAP = {
    'CH': [{language: 'CH'}, {language: 'EN'}],
    'EN': {language: 'EN'}
  } as any

  @Controller('/api/crophe')
  @UseBefore(FormatResponse)
  export class ArticleController {
      constructor(private diseaseAnalysisService: DiseaseAnalysisService) {}

      @Get('/disease_analysis')
      async getArticleList(
        @QueryParam('page_size') pageSize?: number,
        @QueryParam('page') page?: number,
      ) {
          const [articleList, total] = await this.diseaseAnalysisService.getArticleAndCount(
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

    @Post('/disease_analysis/predict')
    async predictDisease(
      @BodyParam('patient_gender') patient_gender:string,
      @BodyParam('patient_age') patient_age:number,
      @BodyParam('patient_job') patient_job:string,
      @BodyParam('main_suit') main_suit:string,
    ){
      await this.diseaseAnalysisService.training();
      const result = await this.diseaseAnalysisService.predict({ 
        patient_gender, patient_age, patient_job, main_suit
      })
      return result;
    }

    @Delete('/disease_analysis')
    async deleteArticle(
      @BodyParam('id') id:number
    ){
      const result = await this.diseaseAnalysisService.deleteArticle({id});
      return result
    }
  }