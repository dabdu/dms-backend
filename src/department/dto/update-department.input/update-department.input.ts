import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class UpdateDepartmentInput {
  @Field(() => Int)
  @IsNotEmpty()
  id: number;

  @Field()
  @MinLength(2)
  name: string;
}
