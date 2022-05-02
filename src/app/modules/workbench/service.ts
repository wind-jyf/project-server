import { Service } from 'typedi';
import { getRepository, FindManyOptions, FindConditions } from 'typeorm';
import { WorkbenchEntity } from './entity';

import { objectUtils } from '@/utils';
const fs = require('fs');

@Service()
export class WorkbenchService {
    private workbenchRepository = getRepository(WorkbenchEntity);

    async getArticleAndCount(conditions: FindManyOptions<WorkbenchEntity>, pagination?: { skip?: number; take?: number }) {
        return this.workbenchRepository.findAndCount(objectUtils.clean({ ...conditions, ...pagination }))
    }

    async getWorkBenchById(conditions: FindConditions<WorkbenchEntity>) {
        return this.workbenchRepository.find(objectUtils.clean({ ...conditions }))
    }

    async addArticle(conditions:any){
        try{
            let {name,date,language,file} = conditions;
            this.workbenchRepository.insert(conditions);
            return '添加成功'
        }catch(e){
            throw new Error("添加失败");
        }
    }

    async deleteArticle(conditions:any){
        try{
            this.workbenchRepository.remove(conditions);
            return "删除成功"
        } catch(e){
            throw new Error("删除失败")
        }
    }
}