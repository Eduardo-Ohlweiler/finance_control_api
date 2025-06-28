import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { CriarUsuarioDTO } from 'src/usuario/dtos/criar-usuario.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/criar')
  @ApiOperation({ summary: "Cria um novo usuario" })
  async criar(@Body()data:CriarUsuarioDTO){
    const usuario = await this.authService.criar(data);
    return {
      mensagem: `${usuario} criado com sucesso!`
    }
  }

  @Post('/login')
  @ApiOperation({ summary: "Realiza a autenticação" })
  async login(){}
}
