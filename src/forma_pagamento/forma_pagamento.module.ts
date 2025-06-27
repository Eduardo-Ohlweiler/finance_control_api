import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FormaPagamento } from "./forma_pagamento.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([FormaPagamento])
    ]
})

export class FormaPagamentoModule {}