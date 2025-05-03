import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql';
import { DepartmentService } from './department.service';
import { Department } from './entities/department.entity/department.entity';
import { CreateDepartmentInput } from './dto/create-department.input/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input/update-department.input';

@Resolver(() => Department)
export class DepartmentResolver {
  constructor(private readonly deptService: DepartmentService) {}

  @Mutation(() => Department)
  createDepartment(@Args('input') input: CreateDepartmentInput) {
    return this.deptService.create(input);
  }

  @Query(() => [Department])
  getDepartments() {
    return this.deptService.findAll();
  }

  @Mutation(() => Department)
  updateDepartment(@Args('input') input: UpdateDepartmentInput) {
    return this.deptService.update(input);
  }

  @Mutation(() => Boolean)
  deleteDepartment(@Args('id', { type: () => Int }) id: number) {
    return this.deptService.delete(id);
  }

  @Mutation(() => Department)
  createSubDepartment(
    @Args('parentId', { type: () => Int }) parentId: number,
    @Args('name') name: string,
  ) {
    return this.deptService.createSubDepartment(parentId, name);
  }
}
