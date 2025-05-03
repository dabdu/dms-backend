import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateDepartmentInput {
  @Field()
  @IsString()
  @MinLength(2)
  name: string;

  @Field(() => [CreateDepartmentInput], { nullable: true })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  subDepartments?: CreateDepartmentInput[];
}
