import { Service } from 'typedi';
import { getRepository, FindManyOptions, FindConditions } from 'typeorm';
import { MedicineEntity } from './entity';
import { MedicineAnalysisEntity } from '../medicine_analysis/entity';

import { objectUtils } from '@/utils';
const fs = require('fs');

@Service()
export class MedicineService {
    private medicineRepository = getRepository(MedicineEntity);
    private medicineAnalysisRepository = getRepository(MedicineAnalysisEntity);

    async getArticleAndCount(conditions: FindManyOptions<MedicineEntity>, pagination?: { skip?: number; take?: number }) {
        return this.medicineRepository.findAndCount(objectUtils.clean({ ...conditions, ...pagination }))
    }

    async getMedicinetById(conditions: FindConditions<MedicineEntity>) {
        return this.medicineRepository.find(objectUtils.clean({ ...conditions }))
    }

    async addMedicine(conditions:any){
        try{
            this.medicineRepository.insert(conditions);
            return '添加成功'
        }catch(e){
            throw new Error("添加失败");
        }
    }

    async updateMedicine(conditions:any){
        try{
            let { id } = conditions;
            delete conditions.id;
            this.medicineRepository.update(id, conditions);
            return '更新成功'
        }catch(e){
            throw new Error("更新失败");
        }
    }

    async deleteArticle(conditions:any){
        try{
            this.medicineRepository.remove(conditions);
            return "删除成功"
        } catch(e){
            throw new Error("删除失败")
        }
    }

    async addMedicineAnalysis(conditions:any){
        try{
            this.medicineAnalysisRepository.insert(conditions);
            return '添加成功'
        }catch(e){
            throw new Error("添加失败");
        }
    }
}