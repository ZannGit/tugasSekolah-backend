import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) { }

  async create(createTransactionDto: CreateTransactionDto) {
    const { details, ...transactionData } = createTransactionDto;

    return this.prisma.transaction.create({
      data: {
        ...transactionData,
        
        pay_at: new Date(transactionData.pay_at),
        detailTransactions: {
          create: details.map(detail => ({
            menuId: detail.menuId,
            quantity: detail.quantity,
            unit_price: detail.unit_price,
            subtotal: detail.quantity * detail.unit_price,
          })),
        },
        total: details.reduce((acc, curr) => acc + curr.quantity * curr.unit_price, 0),
      },
      include: {
        detailTransactions: {
          include: {
            menu: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.transaction.findMany({
      include: {
        detailTransactions: {
          include: {
            menu: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.transaction.findUnique({
      where: { id },
      include: {
        detailTransactions: {
          include: {
            menu: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });
  }

  async findByUser(userId: number) {
    return this.prisma.transaction.findMany({
      where: { userId },
      include: {
        detailTransactions: {
          include: {
            menu: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const { details, ...transactionData } = updateTransactionDto;

    // Delete existing details if new details provided
    if (details) {
      await this.prisma.detailTransaksi.deleteMany({
        where: { transactionId: id },
      });
    }

    return this.prisma.transaction.update({
      where: { id },
      data: {
        ...transactionData,
        ...(transactionData.pay_at && { pay_at: new Date(transactionData.pay_at) }),
        ...(details && {
          detailTransactions: {
            create: details.map(detail => ({
              menuId: detail.menuId,
              quantity: detail.quantity,
              unit_price: detail.unit_price,
              subtotal: detail.quantity * detail.unit_price,
            })),
          },
        }),
      },
      include: {
        detailTransactions: {
          include: {
            menu: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });
  }

  async remove(id: number) {
    // Delete detail transactions first (cascade)
    await this.prisma.detailTransaksi.deleteMany({
      where: { transactionId: id },
    });

    return this.prisma.transaction.delete({
      where: { id },
    });
  }
}
