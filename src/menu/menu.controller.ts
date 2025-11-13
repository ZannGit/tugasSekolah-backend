import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

import { RolesGuard } from 'src/guard/roles.guard';
import { Roles } from 'src/decorator/role.decorator';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/guard/auths.guard';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) { }



  @Get()
  findAll() {
    return this.menuService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin'])
  @Post()
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(+id);
  }


  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin'])
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(id, updateMenuDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin'])
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.remove(id);
  }
}
