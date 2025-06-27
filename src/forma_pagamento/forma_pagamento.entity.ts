import { Conta } from "src/conta/conta.entity";
import { ETipoCartao, ETipoFormaPagamento } from "src/types/index.enum";
import { Usuario } from "src/usuario/usuario.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class FormaPagamento {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Usuario, usuario => usuario, { onDelete: "CASCADE" })
    @JoinColumn({ name: "usuario_id" })
    usuario: Usuario;

    @Column({ type: "enum", enum: ETipoFormaPagamento })
    tipo: ETipoFormaPagamento;

    @Column({ type: "enum", enum: ETipoCartao, nullable: true })
    tipo_cartao?: ETipoCartao;

    @Column({ type: "int", nullable: true })
    cartao_fechamento?: number;

    @Column({ type: "int", nullable: true })
    cartao_vencimento?: number;

    @ManyToOne(() => Conta, conta => conta.id, {onDelete: "RESTRICT"})
    @JoinColumn({name: 'conta_id'})
    conta?: Conta;

    @Column({ length: 150 })
    titulo:  string

    @CreateDateColumn({type: "timestamptz"})
    criado_em: Date;
    
    @UpdateDateColumn({type: "timestamptz"})
    atualizado_em: Date
}