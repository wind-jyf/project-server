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

  import { WorkbenchService } from './service';

  const CONDITION_MAP = {
    'CH': [{language: 'CH'}, {language: 'EN'}],
    'EN': {language: 'EN'}
  } as any

  @Controller('/api/crophe')
  @UseBefore(FormatResponse)
  export class ArticleController {
      constructor(private workbenchService: WorkbenchService) {}

      @Get('/workbench')
      async getArticleList(
        @QueryParam('pageSize') pageSize?: number,
        @QueryParam('current') page?: number,
      ) {
          const [articleList, total] = await this.workbenchService.getArticleAndCount(
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

      @Get('/workbenchById')
      async getMedicineById(
        @QueryParam('id') id: number,
      ) {
          const [ workbench ] = await this.workbenchService.getWorkBenchById({ id });
          return {
            ...workbench
          };
      }

    @Post('/workbench')
    async addArticle(
      @BodyParam('patient_name') patient_name:string,
      @BodyParam('patient_gender') patient_gender:string,
      @BodyParam('patient_age') patient_age:number,
      @BodyParam('patient_job') patient_job:string,
      @BodyParam('main_suit') main_suit:string,
      @BodyParam('main_symptom') main_symptom:string,
      @BodyParam('patient_ref_department') patient_ref_department:string,
      @BodyParam('patient_ref_medicine') patient_ref_medicine:string,
      @BodyParam('patient_ref_disease') patient_ref_disease:string,
      @BodyParam('medical_advice') medical_advice:string,
    ){
      const result = await this.workbenchService.addArticle({
        patient_name, patient_gender, patient_age, patient_job,
        main_suit, main_symptom, patient_ref_department, patient_ref_medicine,
        patient_ref_disease, medical_advice
      })
      return result;
    }

    @Delete('/workbench')
    async deleteArticle(
      @BodyParam('id') id:number
    ){
      const result = await this.workbenchService.deleteArticle({id});
      return result
    }
  }