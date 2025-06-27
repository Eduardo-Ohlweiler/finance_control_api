import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn("uuid")
    id:   string;

    @Column()
    nome: string;

    @Column({select:false})
    senha:string;

    @Column({unique:true})
    email:string

    @CreateDateColumn({type: "timestamptz"})
    criado_em: Date;

    @UpdateDateColumn({type: "timestamptz"})
    atualizado_em: Date
}