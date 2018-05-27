import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString } from 'class-validator'

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
    batchId: number

    // @ManyToOne(_ => Batch, batch => batch.students)
    // batch: Batch;

    // @OneToMany(_ => Evaluation, evaluation => evaluation.student, {eager:true})
    // evaluations: Evaluation

}