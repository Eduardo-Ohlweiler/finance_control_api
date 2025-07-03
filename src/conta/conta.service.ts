import { DataSource, QueryRunner, Repository } from "typeorm";
import { Conta } from "./conta.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CriarContaDTO } from "./dtos/criar-conta.dto";
import { Usuario } from "src/usuario/usuario.entity";
import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { AtualizarContaDTO } from "./dtos/atualizar-conta.dto";

export class ContaService {
    constructor(
        @InjectRepository(Conta)
        private readonly repository: Repository<Conta>,
        private readonly dataSource: DataSource
    ){}

    async criar(dto: CriarContaDTO, internal: boolean = false, auth: Partial<Usuario>, queryRunner?: QueryRunner){
        const qrunner = queryRunner || this.dataSource.createQueryRunner();

        if(!queryRunner){
            await qrunner.connect();
            await qrunner.startTransaction()
        }

        try {
            const conta = qrunner.manager.create(Conta, {
                ...dto,
                usuario: {id: auth.id},
                saldo:    dto.saldo_inicial,
                is_carteira: internal ? dto.is_carteira:false
            })

            const conta_db = await qrunner.manager.save(conta);

            if(!queryRunner) 
                await qrunner.commitTransaction();
            return conta_db
        } catch (error) {
            if(!queryRunner) 
                await qrunner.rollbackTransaction();
            throw error;
        } finally{
            if(!queryRunner) 
                await qrunner.release();
        }
    }

    async buscarTodas(auth: Partial<Usuario>){
        const contas = await this.repository.find({ where: { usuario:{ id: auth.id }}});
        if(contas.length === 0) 
            throw new NotFoundException("Nenhuma conta encontrada");

        return contas;
    }

    async buscarUm(id: string, auth: Partial<Usuario>){
        const conta = await this.repository.findOne({ where: { id, usuario: {id:auth.id}}});
        if(!conta) 
            throw new NotFoundException("Conta não encontrada");

        return conta;
    }

    async atualizar(id: string, data: AtualizarContaDTO, auth: Partial<Usuario>){
        const conta = await this.buscarUm(id, auth);

        await this.repository.update(conta.id, {
            ...data
        })
    }

    async deletar(id: string, auth: Partial<Usuario>){
        try 
        {
            const conta = await this.buscarUm(id, auth);
            if(conta.is_carteira)
                throw new ForbiddenException("");

            await this.repository.delete(conta.id);

            return conta.titulo    
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}