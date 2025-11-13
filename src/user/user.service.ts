import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import * as bcryptjs from 'bcryptjs';
import * as bcrypt from 'bcrypt';



@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService,) { }


  async create(data: CreateUserDto) {
    const hash = await bcryptjs.hash(data.password, 10);
    return this.prisma.user.create({
      data: { ...data, password: hash },
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id }
    });
  }

  async update(id: number, data: UpdateUserDto) {
    const hash = await bcryptjs.hash(String(data.password), 10);
    return this.prisma.user.update({
      where: { id },
      data: { ...data, password: hash },
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: { id }
    });
  }



  findName(name: string) {
    return this.prisma.user.findFirst({
      where: { name }
    });
  }



}
