import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { ETipoConta } from 'src/types/index.enum';

export class CriarContaDTO {
  @ApiProperty({ example: 'Conta Corrente' })
  @IsString({ message: 'O campo titulo deve ser uma string' })
  @IsNotEmpty({ message: 'O campo titulo é obrigatório' })
  @Length(3, 150, { message: 'O titulo deve ter entre 3 e 150 caracteres' })
  titulo: string;

  @ApiProperty({ enum: ETipoConta, description: 'C = Corrente, P = Poupança' })
  @IsEnum(ETipoConta, { message: 'Tipo deve ser C (Corrente) ou P (Poupança)' })
  tipo: ETipoConta;

}
