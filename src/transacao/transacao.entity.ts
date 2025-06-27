import { Categoria } from "src/categoria/categoria.entity";
import { FormaPagamento } from "src/forma_pagamento/forma_pagamento.entity";
import { ETipoTransacao } from "src/types/index.enum";
import { Usuario } from "src/usuario/usuario.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Transacao {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Usuario, usuario => usuario, { onDelete: "CASCADE" })
    @JoinColumn({ name: "usuario_id" })
    usuario: Usuario;

    @Column({ type: "enum", enum: ETipoTransacao })
    tipo: ETipoTransacao;

    @ManyToOne(() => FormaPagamento, forma_pagamento => forma_pagamento.id, {onDelete: "RESTRICT"})
    @JoinColumn({name: 'forma_pagamento_id'})
    forma_pagamento: FormaPagamento;

    @ManyToOne(() => Categoria, categoria => categoria.id, {onDelete: "RESTRICT"})
    @JoinColumn({name: 'categoria_id'})
    categoria: Categoria;

    @Column({ length: 150 })
    titulo: string;

    @Column({ length: 150 })
    descricao?: string;

    @Column({ type: 'int' })
    parcela: number;

    @Column({ type: 'int' })
    num_parcelas: number;

    @Column({ type: 'date' })
    data_emissao: Date;

    @Column({ type: 'date', nullable: true })
    data_vencimento?: Date;

    @Column({ type: 'date', nullable: true })
    data_quitacao?: Date;

    @Column({ default: false })
    is_quitado: boolean;

    @CreateDateColumn({type: "timestamptz"})
    criado_em: Date;
    
    @UpdateDateColumn({type: "timestamptz"})
    atualizado_em: Date
}