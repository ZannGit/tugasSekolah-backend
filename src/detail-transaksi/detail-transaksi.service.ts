import { Injectable } from '@nestjs/common';
import { CreateDetailTransaksiDto } from './dto/create-detail-transaksi.dto';
import { UpdateDetailTransaksiDto } from './dto/update-detail-transaksi.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class DetailTransaksiService {
  constructor(private prisma: PrismaService) {}

  async create(createDetailTransaksiDto: CreateDetailTransaksiDto) {
    const { quantity, unit_price, ...data } = createDetailTransaksiDto;
    const subtotal = quantity * unit_price;

    return this.prisma.detailTransaksi.create({
      data: {
        ...data,
        quantity,
        unit_price,
        subtotal,
      },
      include: {
        menu: true,
        transaction: true,
      },
    });
  }

  async findAll() {
    return this.prisma.detailTransaksi.findMany({
      include: {
        menu: true,
        transaction: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.detailTransaksi.findUnique({
      where: { id },
      include: {
        menu: true,
        transaction: true,
      },
    });
  }

  async findByTransaction(transactionId: number) {
    return this.prisma.detailTransaksi.findMany({
      where: { transactionId },
      include: {
        menu: true,
      },
    });
  }

  async update(id: number, updateDetailTransaksiDto: UpdateDetailTransaksiDto) {
    const { quantity, unit_price, ...data } = updateDetailTransaksiDto;
    const subtotal = quantity && unit_price ? quantity * unit_price : undefined;

    return this.prisma.detailTransaksi.update({
      where: { id },
      data: {
        ...data,
        ...(quantity && { quantity }),
        ...(unit_price && { unit_price }),
        ...(subtotal && { subtotal }),
      },
      include: {
        menu: true,
        transaction: true,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.detailTransaksi.delete({
      where: { id },
    });
  }
}
