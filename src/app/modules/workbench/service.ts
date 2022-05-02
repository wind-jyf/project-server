import { Service } from 'typedi';
import { getRepository, FindManyOptions, FindConditions } from 'typeorm';
import { WorkbenchEntity } from './entity';
import { DepartMentAnalysisEntity } from '../department_analysis/entity';
import { MedicineAnalysisEntity } from '../medicine_analysis/entity';
import { DiseaseAnalysisEntity } from '../disease_analysis/entity';

import { objectUtils } from '@/utils';
const fs = require('fs');

@Service()
export class WorkbenchService {
    private workbenchRepository = getRepository(WorkbenchEntity);
    private departMentAnalysisRepository = getRepository(DepartMentAnalysisEntity);
    private medicineAnalysisRepository = getRepository(MedicineAnalysisEntity);
    private diseaseAnalysisRepository = getRepository(DiseaseAnalysisEntity);

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

    async getDepartMentAnalysisByDepartMentCode(conditions: FindConditions<DepartMentAnalysisEntity>) {
        return this.departMentAnalysisRepository.find(objectUtils.clean({ ...conditions }))
    }

    async getMedicineAnalysisByMedicineCode(conditions: FindConditions<MedicineAnalysisEntity>) {
        return this.medicineAnalysisRepository.find(objectUtils.clean({ ...conditions }))
    }

    async getDiseaseAnalysisByDiseaseCode(conditions: FindConditions<DiseaseAnalysisEntity>) {
        return this.diseaseAnalysisRepository.find(objectUtils.clean({ ...conditions }))
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

    async updateMedicineAnalysis(conditions:any){
        try{
            let { id } = conditions;
            delete conditions.id;
            this.medicineAnalysisRepository.update(id, conditions);
            return '更新成功'
        }catch(e){
            throw new Error("更新失败");
        }
    }

    async updateDiseaseAnalysis(conditions:any){
        try{
            let { id } = conditions;
            delete conditions.id;
            this.diseaseAnalysisRepository.update(id, conditions);
            return '更新成功'
        }catch(e){
            throw new Error("更新失败");
        }
    }
}