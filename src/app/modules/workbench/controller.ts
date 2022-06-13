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
          console.log('server');
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
      const [ department_analysis ] = await this.workbenchService.getDepartMentAnalysisByDepartMentCode({ department_code: patient_ref_department });
      const { 
        department_ref_youth_total, department_ref_middle_total, department_ref_old_total,
        department_ref_female_total, department_ref_male_total
      } = department_analysis;
      const newDepartMentAnalysis = {
        ...department_analysis,
        department_ref_youth_total: patient_age < 30 ? department_ref_youth_total + 1 : department_ref_youth_total,
        department_ref_middle_total: patient_age >= 30 && patient_age < 50 ? department_ref_middle_total + 1 : department_ref_middle_total,
        department_ref_old_total: patient_age >=50 ? department_ref_old_total + 1 : department_ref_old_total,
        department_ref_female_total: patient_gender === 'femal' ? department_ref_female_total + 1 : department_ref_female_total,
        department_ref_male_total: patient_gender === 'man' ? department_ref_male_total + 1 : department_ref_male_total,
      }
      await this.workbenchService.updateDepartMentAnalysis(newDepartMentAnalysis);
      const [ medicine_analysis ] = await this.workbenchService.getMedicineAnalysisByMedicineCode({ medicine_code: patient_ref_medicine });
      const { medicine_used_total } = medicine_analysis;
      const newMedicineAnalysis = {
        ...medicine_analysis,
        medicine_used_total: medicine_used_total + 1
      }
      await this.workbenchService.updateMedicineAnalysis(newMedicineAnalysis);
      const [ disease_analysis ] = await this.workbenchService.getDiseaseAnalysisByDiseaseCode({ disease_code: patient_ref_disease });
      const { 
        disease_ref_youth_total, disease_ref_middle_total, disease_ref_old_total,
        disease_ref_female_total, disease_ref_male_total
      } = disease_analysis;
      const newDiseaseAnalysis = {
        ...disease_analysis,
        disease_ref_youth_total: patient_age < 30 ? disease_ref_youth_total + 1 : disease_ref_youth_total,
        disease_ref_middle_total: patient_age >= 30 && patient_age < 50 ? disease_ref_middle_total + 1 : disease_ref_middle_total,
        disease_ref_old_total: patient_age >=50 ? disease_ref_old_total + 1 : disease_ref_old_total,
        disease_ref_female_total: patient_gender === 'femal' ? disease_ref_female_total + 1 : disease_ref_female_total,
        disease_ref_male_total: patient_gender === 'man' ? disease_ref_male_total + 1 : disease_ref_male_total,
      }
      await this.workbenchService.updateDiseaseAnalysis(newDiseaseAnalysis);
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