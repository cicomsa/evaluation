import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from 'typeorm'
import {BaseEntity} from 'typeorm/repository/BaseEntity'
import {IsString} from 'class-validator'
import Evaluation  from '../evaluation/entity';
import Batch from '../batch/entity';

@Entity()
export default class Student extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    @IsString()
    @Column('text', {nullable: true})
    fullName: string

    @Column('text', {nullable: true})
    photo: string

    @Column('int', {nullable: true})
    batchNo: number



    // @ManyToOne(_ => Batch, batch => batch.students)
    // batch: Batch;

    // @OneToMany(_ => Evaluation, evaluation => evaluation.student, {eager:true})
    // evaluations: Evaluation

}