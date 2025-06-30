import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto{
    @IsEmail({},{message: "O campo email deve ser uma string"})
    @IsNotEmpty({message: "O campo email é obrigatório"})
    @ApiProperty({description: "E-mail do usuario"})
    email: string;

    @IsString({message: "O campo senha deve ser uma string"})
    @IsNotEmpty({message: "O campo senha é obrigatório"})
    @ApiProperty({description: "Senha de acesso do usuario"})
    senha: string;
}