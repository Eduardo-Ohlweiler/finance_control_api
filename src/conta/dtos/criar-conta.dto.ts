import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { ETipoConta } from 'src/types/index.enum';

export class CriarContaDTO {  
  @IsEnum(ETipoConta, { message: 'Tipo deve ser C (Corrente) ou P (Poupança)' })
  @ApiProperty({ description: 'C = Corrente, P = Poupança', enum: ETipoConta})
  tipo: ETipoConta | null;

  
  @IsString({ message: 'O campo titulo deve ser uma string' })
  @Length(3, 150, { message: 'O titulo deve ter entre 3 e 150 caracteres' })
  @ApiProperty({description: "Titulo da conta"})
  titulo: string;

  @IsOptional()
  @IsBoolean({message: "O campo is_carteira deve ser verdadeiro ou falso"})
  is_carteira?: boolean;

  @IsNumber({}, {message: "O saldo inicial deve ser um numero"})
  @ApiProperty({description: "Saldo inicial"})
  saldo_inicial: number
}
