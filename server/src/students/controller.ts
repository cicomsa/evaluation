import { 
    JsonController, Get, Param, Put, Body, NotFoundError, 
    Post, HttpCode, Delete 
  } from 'routing-controllers'
import Student from './entity'

@JsonController()
export default class StudentController {

    // @Authorized()
    @Get('/batchstudents/:id')
    @HttpCode(201)
    getBatchStudents(
        @Param('id') batchId: number
    ) {
        let BatchStudents = Student.find( {batchId} ) 
        return BatchStudents 
    }

    // @Authorized()
    @Get('/students/:id')
    getStudent(
    @Param('id') id: number) {
        return Student.findOne(id)
    }

    // @Authorized()
    @Put('/students/:id')
    @HttpCode(200)
    async updateStudent(
    @Param('id') id: number,
    @Body() update: Partial<Student>) {
        const student = await Student.findOne(id)
        if (!student) throw new NotFoundError('Cannot find student')

        return Student.merge(student, update).save()
    }

    // @Authorized()
    @Post('/students')
    @HttpCode(201)
    async createStudent(
    
    @Body() student: Student) { 

        return await student.save()
    }

    // @Authorized()
    @Delete('/students/:id')
    async deleteStudent(
    @Param('id') id: number) {
        const student = await Student.findOne(id)
        if (!student) throw new NotFoundError('Cannot find student')
        
        return Student.remove(student)
    }
    
}