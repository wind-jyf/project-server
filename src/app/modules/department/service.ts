import { Service } from 'typedi';
import { getRepository, FindManyOptions } from 'typeorm';
import { DepartMentEntity } from './entity';

import { objectUtils } from '@/utils';
const fs = require('fs');

@Service()
export class DepartMentService {
    private departMentRepository = getRepository(DepartMentEntity);

    async getArticleAndCount(conditions: FindManyOptions<DepartMentEntity>, pagination?: { skip?: number; take?: number }) {
        return this.departMentRepository.findAndCount(objectUtils.clean({ ...conditions, ...pagination }))
    }

    async addDepartMent(conditions:any){
        try{
            let { department_code, department_name, department_category} = conditions;
            if (department_code && department_name && department_category) {
                this.departMentRepository.insert(conditions);
            } else {
                throw new Error('参数不能为空');
            }
            return '添加成功'
        } catch(e){
            throw new Error("添加失败");
        }
    }

    async updateDepartMent(conditions:any){
        try{
            let { id, department_code, department_name, department_category} = conditions;
            delete conditions.id;
            if (id && department_code && department_name && department_category) {
                this.departMentRepository.update(id, conditions);
            } else {
                throw new Error('参数不能为空');
            }
            return '更新成功'
        } catch(e){
            throw new Error("更新失败");
        }
    }

    async deleteArticle(conditions:any){
        try{
            this.departMentRepository.remove(conditions);
            return "删除成功"
        } catch(e){
            throw new Error("删除失败")
        }
    }
}