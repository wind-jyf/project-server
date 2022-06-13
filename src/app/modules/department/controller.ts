import {
    Get,
    Put,
    QueryParam,
    Controller,
    Post,
    BodyParam,
    UseBefore
  } from 'routing-controllers';
import { FormatResponse } from '@/app/middlewares/formatResponse';

import { paginationUtils } from '@/utils';

import { DepartMentService } from './service';

@Controller('/api/crophe')
@UseBefore(FormatResponse)
export class DepartMentController {
    constructor(private departmentService: DepartMentService) {}

    @Get('/departMentList')
    async getArticleList(
      @QueryParam('pageSize') pageSize?: number,
      @QueryParam('current') page?: number,
    ){
        const [departMentList, total] = await this.departmentService.getArticleAndCount(
            {
              order: { id: 'DESC' }
            }, 
            paginationUtils.getCondition(page, pageSize)
          );
        return {
          data: departMentList,
          ...paginationUtils.getResponse(total, page, pageSize)
        };
    }

    @Post('/departMent/update')
    async upDepartMent(
      @BodyParam('id') id:number,
      @BodyParam('department_code') department_code:string,
      @BodyParam('department_name') department_name:string,
      @BodyParam('department_category') department_category:string,
    ){
      const result = await this.departmentService.updateDepartMent({id, department_code,department_name,department_category})
      return result;
    }

    @Post('/departMent/add')
    async addDepartMent(
      @BodyParam('department_code') department_code:string,
      @BodyParam('department_name') department_name:string,
      @BodyParam('department_category') department_category:string,
    ){
      console.log('server');
      const result = await this.departmentService.addDepartMent({department_code,department_name,department_category})
      await this.departmentService.addDepartMentAnalysis({
        department_code, department_name, department_category,
        department_ref_youth_total: 0,
        department_ref_middle_total: 0,
        department_ref_old_total: 0,
        department_ref_female_total: 0,
        department_ref_male_total: 0,
      })
      return result;
    }
}