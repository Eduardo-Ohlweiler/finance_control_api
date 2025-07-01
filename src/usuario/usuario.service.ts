import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from "bcrypt";
import { CriarUsuarioDTO } from './dtos/criar-usuario.dto';
import { ContaService } from 'src/conta/conta.service';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private readonly repository:   Repository<Usuario>,
        private readonly datasource:   DataSource,
        private readonly contaService: ContaService
    ){}

    private async hash(data: string){

        const salt  = await bcrypt.genSalt(13);
        return await bcrypt.hash(data, salt);
    }

    async criar(dto: CriarUsuarioDTO){
        const queryRunner = this.datasource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const qtd = await queryRunner.manager.count(Usuario,{ where: { email: dto.email }})

            if(qtd > 0) 
                throw new ConflictException("Ja existe usuario cadastrado com esse email")

            const hash = await this.hash(dto.senha)
            const usuario = queryRunner.manager.create(Usuario, {
                ...dto,
                senha:hash
            })

            const { nome } = await queryRunner.manager.save(usuario);
            await this.contaService.criar({
                is_carteira: true,
                saldo_inicial: 0,
                titulo: "Carteira",
                tipo:   null
            }, true, usuario, queryRunner)

            await queryRunner.commitTransaction();
            return nome;
        } catch (error) {
            await queryRunner.rollbackTransaction()
            throw error
        } finally {
            await queryRunner.release()
        }
    }

    async buscarPorEmail(email: string){
        const usuario = await this.repository.findOne({
            where:  {email},
            select: {id: true, senha: true} 
        })

        if(!usuario)
            throw new NotFoundException('Usuario não encontrado');
        return usuario
    }

    async buscarPorId(id: string){
        const usuario = await this.repository.findOne({
            where:  {id}
        })

        if(!usuario)
            throw new NotFoundException('Usuario não encontrado');
        return usuario
    }
}
