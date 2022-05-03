import { Service } from 'typedi';
import { getRepository, FindManyOptions } from 'typeorm';
const NaiveBayes = require('@/utils/naive_bayes');


import { DiseaseAnalysisEntity } from './entity';
import { WorkbenchEntity } from '../workbench/entity';

import { objectUtils } from '@/utils';
import { shuffleSelf } from '@/utils/shuffle';
const fs = require('fs');
const naiveBayes = new NaiveBayes();

@Service()
export class DiseaseAnalysisService {
    private diseaseAnalysisRepository = getRepository(DiseaseAnalysisEntity);
    private workBenchRepository = getRepository(WorkbenchEntity);

    async getArticleAndCount(conditions: FindManyOptions<DiseaseAnalysisEntity>, pagination?: { skip?: number; take?: number }) {
        return this.diseaseAnalysisRepository.findAndCount(objectUtils.clean({ ...conditions, ...pagination }))
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
                this.diseaseAnalysisRepository.insert({});
            }else{
                this.diseaseAnalysisRepository.insert({});
            }
            return '添加成功'
        }catch(e){
            throw new Error("添加失败");
        }
    }

    async training () {
        try{
            const [ workbenchList ] = await this.workBenchRepository.findAndCount();
            workbenchList.forEach(workBenchItem => {
                naiveBayes.trainInline(
                    `${workBenchItem.patient_gender}
                    ${workBenchItem.patient_age}岁 
                    ${workBenchItem.patient_job}
                    ${workBenchItem.main_suit}
                    ${workBenchItem.main_symptom}
                    ${workBenchItem.medical_advice}`
                    , workBenchItem.patient_ref_disease
                );
            })
            return '训练完成'
        } catch(e){
            throw new Error("训练完成");
        }
    }

    async predict (conditions: any) {
        try{
            return naiveBayes.classify(
                `${conditions.patient_gender}
                ${conditions.patient_age}岁
                ${conditions.patient_job}
                ${conditions.main_suit}`
            )
        } catch(e){
            throw new Error("预测失败");
        }
    }

    async deleteArticle(conditions:any){
        try{
            this.diseaseAnalysisRepository.remove(conditions);
            return "删除成功"
        } catch(e){
            throw new Error("删除失败")
        }
    }

    async trainningCompute(trainingList: any[], naiveBayes: any) {
        trainingList.forEach(item => {
            naiveBayes.trainInline(
                `${item.patient_gender}
                ${item.patient_age}岁 
                ${item.patient_job}
                ${item.main_suit}
                ${item.main_symptom}
                ${item.medical_advice}`
                , item.patient_ref_disease
            );
        })
    }

    async predictCompute(testList: any[], naiveBayes: any) {
        const resultList = testList.map(item => {
            return naiveBayes.classify(
                `${item.patient_gender}
                ${item.patient_age}岁
                ${item.patient_job}
                ${item.main_suit}`
            )
        })
        const correctTotal = testList.reduce((pre, current, index) => {
            if (current.patient_ref_disease === resultList[index]) {
                return pre + 1;
            } else {
                return pre;
            }
        }, 0);
        console.log(correctTotal);
        return (correctTotal / testList.length) * 100;
    }

    async computePercent(percent: number) {
        try {
            const naiveBayes = new NaiveBayes();
            const [ workbenchList ] = await this.workBenchRepository.findAndCount();
            const shuffleWorkBenchList = shuffleSelf(workbenchList);
            const trainingLength = Math.round(workbenchList.length * percent);
            const trainingList = shuffleWorkBenchList.slice(0, trainingLength);
            const testList = shuffleWorkBenchList.slice(trainingLength);
            if (testList.length <= 0) {
                testList.push(...trainingList);
            }
            await this.trainningCompute(trainingList, naiveBayes);
            return await this.predictCompute(testList, naiveBayes);
        } catch (e) {
            throw new Error('计算失败');
        }
    }
}