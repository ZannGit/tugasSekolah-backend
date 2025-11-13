import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuModule } from './menu/menu.module';
import { PrismaModule } from 'prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TransactionModule } from './transaction/transaction.module';
import { DetailTransaksiModule } from './detail-transaksi/detail-transaksi.module';


@Module({
  imports: [MenuModule, PrismaModule, UserModule, AuthModule, TransactionModule, DetailTransaksiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
