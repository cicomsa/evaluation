import {BaseEntity, PrimaryGeneratedColumn, Column, Entity, ManyToOne} from 'typeorm'
import Student from '../students/entity';

export type Color = 'red' | 'yellow' | 'green' | null

@Entity()
export default class Evaluation extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    @Column('text', {nullable:true})
    color: Color

    @Column('text', {nullable:true})
    remark: string
    
    @Column('text', {nullable:true, default: new Date().toJSON().slice(0,10)})
    date: string

    @Column('int', {nullable:true})
    studentNo: number

    @Column('int', {nullable:true})
    batchNo: number

    // @ManyToOne(_ => Student, student => student.evaluations)
    // student: Student[];
}
