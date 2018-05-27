import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString } from 'class-validator'

@Entity()
export default class Batch extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    @Column('int', {nullable: true})
    batchNumber: number

    @IsString()
    @Column('text', {nullable: true})
    startDate: string

    @IsString()
    @Column('text', {nullable: true})
    endDate: string

    // @OneToMany(_ => Student, student => student.batch, {eager:true})
    // students: Student[];

}