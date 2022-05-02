import { Service } from 'typedi';
import { getRepository, FindManyOptions, FindConditions } from 'typeorm';
import { DepartMentAnalysisEntity } from './entity';

import { objectUtils } from '@/utils';
const fs = require('fs');

@Service()
export class DepartMentAnalysisService {
    private departMentAnalysisRepository = getRepository(DepartMentAnalysisEntity);

    async getArticleAndCount(conditions: FindManyOptions<DepartMentAnalysisEntity>, pagination?: { skip?: number; take?: number }) {
        return this.departMentAnalysisRepository.findAndCount(objectUtils.clean({ ...conditions, ...pagination }))
    }

    async getDepartMentAnalysisById(conditions: FindConditions<DepartMentAnalysisEntity>) {
        return this.departMentAnalysisRepository.find(objectUtils.clean({ ...conditions }))
    }

    async addDepartMentAnalysis(conditions:any){
        try {
            let { name, date, language, file } = conditions;
            this.departMentAnalysisRepository.insert(conditions);
            return '添加成功'
        } catch (e) {
            throw new Error("添加失败");
        }
    }

    async updateDepartMentAnalysis(conditions:any){
        try{
            let { id } = conditions;
            delete conditions.id;
            this.departMentAnalysisRepository.update(id, conditions);
            return '更新成功'
        }catch(e){
            throw new Error("更新失败");
        }
    }

    async deleteArticle(conditions:any){
        try{
            this.departMentAnalysisRepository.remove(conditions);
            return "删除成功"
        } catch(e){
            throw new Error("删除失败")
        }
    }
}