import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FormaPagamento } from "./forma_pagamento.entity";
import { ContaModule } from "src/conta/conta.module";
import { FormaPagamentoService } from "./forma_pagamento.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([FormaPagamento]),
        ContaModule
    ],
    providers: [FormaPagamentoService],
    exports:   [FormaPagamentoService]
})

export class FormaPagamentoModule {}