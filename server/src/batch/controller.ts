import { 
    JsonController, Get, Param, Put, Body, NotFoundError, 
    Post, HttpCode, Delete
  } from 'routing-controllers'
import Batch from './entity'

@JsonController()
export default class BatchController {

    // @Authorized()
    @Get('/batches')
    @HttpCode(200)
    async allBatches() {
        const batches = await Batch.find()
        return { batches }
    }
    
    // @Authorized()
    @Get('/batches/:id')
    @HttpCode(200)
    getBatch(
    @Param('id') id: number) {
        return Batch.findOne(id)
    }

    // @Authorized()
    @Put('/batches/:id')
    async updateBatch(
    @Param('id') id: number,
    @Body() update: Partial<Batch>) {
        const batch = await Batch.findOne(id)
        if (!batch) throw new NotFoundError('Cannot find batch')

        return Batch.merge(batch, update).save()
    }

    // @Authorized()
    @Post('/batches')
    @HttpCode(201)
    async createBatch(
    @Body() batch: Batch) {
        
        return batch.save()
    }

    // @Authorized()
    @Delete('/batches/:id')
    async deleteBatch(
    @Param('id') id: number) {
        const batch = await Batch.findOne(id)
        if (!batch) throw new NotFoundError('Cannot find batch')
        return Batch.remove(batch)
    }
    
}