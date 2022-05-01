import { Service } from 'typedi';
import { getRepository, FindManyOptions } from 'typeorm';
import { WorkbenchEntity } from './entity';

import { objectUtils } from '@/utils';
const fs = require('fs');

@Service()
export class WorkbenchService {
    private workbenchRepository = getRepository(WorkbenchEntity);

    async getArticleAndCount(conditions: FindManyOptions<WorkbenchEntity>, pagination?: { skip?: number; take?: number }) {
        return this.workbenchRepository.findAndCount(objectUtils.clean({ ...conditions, ...pagination }))
    }

    async addArticle(conditions:any){
        try{
            let {name,date,language,file} = conditions;
            if(file){
                let time = (new Date()).valueOf();
                let suffix = file.originalname.split('.').pop();
                fs.writeFile(`../Crophe/article/${time}.${suffix}`,file.buffer,(err:any)=>{
                    if(err){
                        throw new Error("写入失败" +err)
                    }else{
                        console.log("保存成功")
                    }
                })
                let path = `article/${time}.${suffix}`;
                this.workbenchRepository.insert({});
            }else{
                this.workbenchRepository.insert({});
            }
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