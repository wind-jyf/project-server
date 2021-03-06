import { Service } from 'typedi';
import { getRepository, FindManyOptions, FindConditions } from 'typeorm';
import { DiseaseEntity } from './entity';
import { DiseaseAnalysisEntity } from '../disease_analysis/entity';

import { objectUtils } from '@/utils';
const fs = require('fs');

@Service()
export class DiseaseService {
    private diseaseRepository = getRepository(DiseaseEntity);
    private diseaseAnalysisRepository = getRepository(DiseaseAnalysisEntity);

    async getArticleAndCount(conditions: FindManyOptions<DiseaseEntity>, pagination?: { skip?: number; take?: number }) {
        return this.diseaseRepository.findAndCount(objectUtils.clean({ ...conditions, ...pagination }))
    }

    async getDiseaseByDiseaseCode(conditions: FindConditions<DiseaseEntity>) {
        return this.diseaseRepository.find(objectUtils.clean({ ...conditions }))
    }

    async addArticle(conditions:any){
        try{
            let {name,date,language,file} = conditions;
            this.diseaseRepository.insert(conditions);
            return '添加成功'
        }catch(e){
            throw new Error("添加失败");
        }
    }

    async updateDisease(conditions:any){
        try{
            let { id } = conditions;
            delete conditions.id;
            this.diseaseRepository.update(id, conditions);
            return '更新成功'
        }catch(e){
            throw new Error("更新失败");
        }
    }

    async deleteArticle(conditions:any){
        try{
            this.diseaseRepository.remove(conditions);
            return "删除成功"
        } catch(e){
            throw new Error("删除失败")
        }
    }

    async addDiseaseAnalysis(conditions:any){
        try{
            this.diseaseAnalysisRepository.insert(conditions);
            return '添加成功'
        }catch(e){
            throw new Error("添加失败");
        }
    }
}