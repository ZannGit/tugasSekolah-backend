import { PartialType } from '@nestjs/mapped-types';
import { CreateDetailTransaksiDto } from './create-detail-transaksi.dto';

export class UpdateDetailTransaksiDto extends PartialType(CreateDetailTransaksiDto) {}
