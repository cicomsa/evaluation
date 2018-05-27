import {
    JsonController,  Post, Param,  HttpCode, NotFoundError, Get,
    Body, Put, Delete, 
  } from 'routing-controllers'
import  Evaluation  from './entity';
  
@JsonController() export default class EvaluationController {

   // @Authorized()
   @Get('/evaluations/:id')
   @HttpCode(200)
   getEvaluation(
   @Param('id') id: number) {

       return Evaluation.findOne(id)
   }
    
  
    //@Authorized()
    @Get('/batchevaluations/:id([0-9]+)')
    @HttpCode(200)
    getBatchEvaluations(
        @Param('id') batchNo: number
    ) {
        const batchEvaluations = Evaluation.find( {batchNo} ) 
        return batchEvaluations 
    }

    //@Authorized()
    @Get('/studentevaluations/:id([0-9]+)')
    @HttpCode(200)
    getStudentEvaluations(
        @Param('id') studentNo: number
    ) {
        
        const studentEvaluations = Evaluation.find( {studentNo} ) 
        return studentEvaluations 
    }

    //@Authorized()
    @Post('/evaluations')
    @HttpCode(201)
    async createEvaluation(
    
    @Body() evaluation: Evaluation) { 

        return await evaluation.save()
    }

    //@Authorized()
    @Put('/evaluations/:id')
    async updateEvaluation(
    @Param('id') id: number,
    @Body() update: Partial<Evaluation>) {
        const evaluation = await Evaluation.findOne(id)
        if (!evaluation) throw new NotFoundError('Cannot find evaluation')

        return Evaluation.merge(evaluation, update).save()
    }

    //@Authorized()
    @Delete('/evaluations/:id')
    async deleteEvaluation(
    @Param('id') id: number) {
        const evaluation = await Evaluation.findOne(id)
        if (!evaluation) throw new NotFoundError('Cannot find batch')

        return Evaluation.remove(evaluation)
    }
  }