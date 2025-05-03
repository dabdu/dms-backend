import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './entities/department.entity/department.entity';
import { IsNull, Repository } from 'typeorm';
import { CreateDepartmentInput } from './dto/create-department.input/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input/update-department.input';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private deptRepo: Repository<Department>,
  ) {}

  async create(input: CreateDepartmentInput): Promise<any> {
    // Check if department name already exists
    const existing = await this.deptRepo.findOneBy({ name: input.name });
    if (existing) {
      throw new BadRequestException(
        `Department "${input.name}" already exists.`,
      );
    }

    // First, create and save the parent department
    const department = await this.deptRepo.save(
      this.deptRepo.create({ name: input.name }),
    );

    // Then create and save sub-departments
    if (input.subDepartments) {
      for (const sd of input.subDepartments) {
        const exists = await this.deptRepo.findOneBy({ name: sd.name });
        if (exists) {
          throw new BadRequestException(
            `Sub-department "${sd.name}" already exists.`,
          );
        }
        const sub = this.deptRepo.create({ name: sd.name, parent: department });
        await this.deptRepo.save(sub);
      }
    }

    // Return the parent with subDepartments loaded
    return this.deptRepo.findOne({
      where: { id: department.id },
      relations: ['subDepartments'],
    });
  }

  async findAll(): Promise<Department[]> {
    return this.deptRepo.find({
      where: { parent: IsNull() },
      relations: ['subDepartments'],
    });
  }

  async update(input: UpdateDepartmentInput): Promise<Department> {
    const dept = await this.deptRepo.findOneBy({ id: input.id });
    if (!dept) throw new NotFoundException('Department not found');

    if (input.name && input.name !== dept.name) {
      const duplicate = await this.deptRepo.findOneBy({ name: input.name });
      if (duplicate) {
        throw new BadRequestException(
          `Department name "${input.name}" is already taken.`,
        );
      }
      dept.name = input.name;
    }

    return this.deptRepo.save(dept);
  }

  async delete(id: number): Promise<boolean> {
    const dept = await this.deptRepo.findOne({
      where: { id },
      relations: ['subDepartments'],
    });
    if (!dept) throw new NotFoundException('Department not found');

    await this.deptRepo.remove(dept);
    return true;
  }

  async createSubDepartment(
    parentId: number,
    name: string,
  ): Promise<Department> {
    const parent = await this.deptRepo.findOneBy({ id: parentId });
    if (!parent) throw new NotFoundException('Parent department not found');

    const exists = await this.deptRepo.findOneBy({ name });
    if (exists) {
      throw new BadRequestException(`Sub-department "${name}" already exists.`);
    }

    const subDept = this.deptRepo.create({ name, parent });
    return this.deptRepo.save(subDept);
  }
}
