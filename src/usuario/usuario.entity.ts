import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @CreateDateColumn({type: "timestamptz"})
    atualizado_em: Date
}