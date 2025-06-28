import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Length } from "class-validator";

export class CriarUsuarioDTO {
    @IsString({message: "O campo nome deve ser um string"})
    @IsNotEmpty({message: "O campo nome é obrigatorio"})
    @Length(3,150, {message: "O campo nome deve ter entre 3 e 150 caracteres"})
    @ApiProperty()
    nome:  string;

    @IsEmail({},{message: "O campo email deve ser um email valido"})
    @IsNotEmpty({message: "O campo email é obrigatorio"})
    @ApiProperty()
    email: string;

    @IsStrongPassword({
        minLength: 8,
        minNumbers: 1,
        minLowercase: 1
    }, { message: 'Senha fraca, verifique os requisitos'})
    @IsNotEmpty({message: "O campo senha é obrigatorio"})
    @ApiProperty()
    senha: string;
}