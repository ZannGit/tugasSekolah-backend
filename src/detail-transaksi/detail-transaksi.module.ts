import { Module } from '@nestjs/common';
import { DetailTransaksiService } from './detail-transaksi.service';
import { DetailTransaksiController } from './detail-transaksi.controller';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DetailTransaksiController],
  providers: [DetailTransaksiService],
})
export class DetailTransaksiModule {}
