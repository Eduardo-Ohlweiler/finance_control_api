import { ETipoConta } from "src/types/index.enum";
import { Usuario } from "src/usuario/usuario.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Conta {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Usuario, usuario => usuario, { onDelete: "CASCADE" })
    @JoinColumn({ name: "usuario_id" })
    usuario: Usuario;

    @Column({type: "enum", enum: ETipoConta, nullable: true})
    tipo: ETipoConta | null;

    @Column({ length: 150 })
    titulo:  string

    @Column({default: false})
    is_carteira: boolean

    @Column({ type: "decimal", precision: 15, scale: 2 })
    saldo_inicial: number

    @Column({ type: "decimal", precision: 15, scale: 2 })
    saldo: number

    @CreateDateColumn({type: "timestamptz"})
        criado_em: Date;
    
    @UpdateDateColumn({type: "timestamptz"})
    atualizado_em: Date
}