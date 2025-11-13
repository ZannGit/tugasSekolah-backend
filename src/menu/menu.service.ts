import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { PrismaService } from 'prisma/prisma.service';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) { }


 
  create(createMenuDto: CreateMenuDto) {
    return this.prisma.menu.create({
      data: createMenuDto
    });
  }

  findAll() {
    return this.prisma.menu.findMany();
  }

  findOne(id: number) {
    return this.prisma.menu.findUnique({
      where: { id }
    });
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return this.prisma.menu.update({
      where: { id },
      data: updateMenuDto
    });
  }

  remove(id: number) {
    return this.prisma.menu.delete({
      where: { id }
    });
  }


}
