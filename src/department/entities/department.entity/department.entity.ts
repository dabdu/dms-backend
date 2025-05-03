import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';

@Entity()
@ObjectType()
@Unique(['name'])
export class Department {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @ManyToOne(() => Department, (dept) => dept.subDepartments, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @Field(() => Department, { nullable: true })
  parent: Department;

  @OneToMany(() => Department, (dept) => dept.parent, { cascade: true })
  @Field(() => [Department], { nullable: true })
  subDepartments: Department[];
}
