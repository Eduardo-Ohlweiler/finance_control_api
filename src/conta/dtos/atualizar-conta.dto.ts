import { OmitType, PartialType } from '@nestjs/swagger';
import { CriarContaDTO } from './criar-conta.dto';

export class AtualizarContaDTO extends PartialType(OmitType(CriarContaDTO,["is_carteira", "saldo_inicial"])) {  }
