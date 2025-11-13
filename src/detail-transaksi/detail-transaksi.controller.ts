import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { DetailTransaksiService } from './detail-transaksi.service';
import { CreateDetailTransaksiDto } from './dto/create-detail-transaksi.dto';
import { UpdateDetailTransaksiDto } from './dto/update-detail-transaksi.dto';
import { JwtAuthGuard } from 'src/guard/auths.guard';
import { RolesGuard } from 'src/guard/roles.guard';
import { Roles } from 'src/decorator/role.decorator';

@Controller('detail-transaksi')
export class DetailTransaksiController {
  constructor(private readonly detailTransaksiService: DetailTransaksiService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin'])
  @Post()
  create(@Body() createDetailTransaksiDto: CreateDetailTransaksiDto) {
    return this.detailTransaksiService.create(createDetailTransaksiDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin', 'user', 'cashier'])
  @Get()
  findAll() {
    return this.detailTransaksiService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin', 'user', 'cashier'])
  @Get('transaction/:transactionId')
  findByTransaction(@Param('transactionId', ParseIntPipe) transactionId: number) {
    return this.detailTransaksiService.findByTransaction(transactionId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin', 'user', 'cashier'])
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.detailTransaksiService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin'])
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDetailTransaksiDto: UpdateDetailTransaksiDto) {
    return this.detailTransaksiService.update(id, updateDetailTransaksiDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin'])
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.detailTransaksiService.remove(id);
  }
}
