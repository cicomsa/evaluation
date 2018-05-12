import {
    JsonController,  Post, Param,  HttpCode, NotFoundError, Get,
    Body, Put, Delete, 
  } from 'routing-controllers'
import  Evaluation  from './entity';
  
@JsonController() export default class EvaluationController {

   // @Authorized()
   @Get('/evaluations/:id')
   getEvaluation(
   @Param('id') id: number) {
       return Evaluation.findOne(id)
   }
    
  
    //@Authorized()
    @Get('/evaluations')
    getEvaluations() {
        
        return Evaluation.find()
    }
  
    //@Authorized()
    @Post('/evaluations')
    @HttpCode(201)
    async createEvaluation(
        @Body() evaluation: Evaluation) { 

        return evaluation.save()
        
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