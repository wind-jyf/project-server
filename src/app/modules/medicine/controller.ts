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

  import { MedicineService } from './service';

  @Controller('/api/crophe')
  @UseBefore(FormatResponse)
  export class ArticleController {
      constructor(private medicineService: MedicineService) {}

      @Get('/medicine')
      async getArticleList(
        @QueryParam('pageSize') pageSize?: number,
        @QueryParam('current') page?: number,
      ) {
          const [articleList, total] = await this.medicineService.getArticleAndCount(
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
      @Get('/medicineById')
      async getMedicineById(
        @QueryParam('id') id: number,
      ) {
          const [ medicine ] = await this.medicineService.getMedicinetById({ id });
          return {
            ...medicine
          };
      }

    @Post('/medicine/add')
    async addMedicine(
      @BodyParam('medicine_code') medicine_code: string,
      @BodyParam('medicine_name') medicine_name:string,
      @BodyParam('medicine_manufacturer') medicine_manufacturer: string,
      @BodyParam('medicine_category') medicine_category: number,
      @BodyParam('medicine_specifications') medicine_specifications: string,
      @BodyParam('medicine_price') medicine_price: number,
      @BodyParam('medicine_form') medicine_form: number,
      @BodyParam('medicine_rest_total') medicine_rest_total: number,

    ){
      const result = await this.medicineService.addMedicine({
        medicine_code, medicine_name, medicine_manufacturer, medicine_category,
        medicine_specifications, medicine_price, medicine_form, medicine_rest_total 
      })
      await this.medicineService.addMedicineAnalysis({
        medicine_code, medicine_name, medicine_category,
        medicine_used_total: 0
      })
      return result;
    }

    @Post('/medicine/update')
    async updateMedicine(
      @BodyParam('id') id: number,
      @BodyParam('medicine_code') medicine_code: string,
      @BodyParam('medicine_name') medicine_name: string,
      @BodyParam('medicine_manufacturer') medicine_manufacturer: string,
      @BodyParam('medicine_category') medicine_category: number,
      @BodyParam('medicine_specifications') medicine_specifications: string,
      @BodyParam('medicine_price') medicine_price: number,
      @BodyParam('medicine_form') medicine_form: number,
      @BodyParam('medicine_rest_total') medicine_rest_total: number,

    ){
      const result = await this.medicineService.updateMedicine({
        id,
        medicine_code,medicine_name,medicine_manufacturer,medicine_category,
        medicine_specifications, medicine_price, medicine_form, medicine_rest_total 
      })
      return result;
    }

    @Delete('/medicine')
    async deleteArticle(
      @BodyParam('id') id:number
    ){
      const result = await this.medicineService.deleteArticle({id});
      return result
    }
  }