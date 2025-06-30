import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { ETipoConta } from 'src/types/index.enum';

export class AtualizarContaDTO {
  @ApiPropertyOptional({ example: 'Conta Corrente' })
  @IsOptional()
  @IsString({ message: 'O campo titulo deve ser uma string' })
  @Length(3, 150, { message: 'O titulo deve ter entre 3 e 150 caracteres' })
  titulo?: string;

  @ApiPropertyOptional({ enum: ETipoConta, description: 'C = Corrente, P = Poupança' })
  @IsOptional()
  @IsEnum(ETipoConta, { message: 'Tipo deve ser C (Corrente) ou P (Poupança)' })
  tipo?: ETipoConta;

}
