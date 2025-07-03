import { Injectable } from "@nestjs/common";
import { ContaService } from "src/conta/conta.service";
import { Repository } from "typeorm";
import { FormaPagamento } from "./forma_pagamento.entity";
import { Usuario } from "src/usuario/usuario.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export  class FormaPagamentoService {
    constructor(
        private readonly contaService: ContaService,

        @InjectRepository(FormaPagamento)
        private readonly repository: Repository<FormaPagamento>
    ){}

    async criar(auth: Partial<Usuario>){}
    async buscar(id: string, auth: Partial<Usuario>){}
    async buscarTodos(auth: Partial<Usuario>){}
    async atualizar(id: string, auth: Partial<Usuario>){}
    async deletar(id: string, auth: Partial<Usuario>){}
}