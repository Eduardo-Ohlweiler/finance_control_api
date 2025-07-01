import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conta } from './conta.entity';
import { ContaService } from './conta.service';

@Module({
  imports:     [
    TypeOrmModule.forFeature([Conta])
  ],
  providers: [ContaService],
  exports  : [ContaService]
})
export class ContaModule {}
