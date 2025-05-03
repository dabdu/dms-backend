import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(private usersService: UsersService) {}

  async onApplicationBootstrap() {
    const defaultUser = await this.usersService.findByUsername('admin');
    if (!defaultUser) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await this.usersService.create('admin', hashedPassword);
      console.log('✅ Seeded default user: admin/admin123');
    }
  }
}
