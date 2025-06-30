import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { CriarUsuarioDTO } from 'src/usuario/dtos/criar-usuario.dto';
import { LoginDto } from './dtos/login.dto';
import { Publico } from './auth.guard';

@Controller('auth')
@Publico()
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
  async login(@Body() data: LoginDto){
    const token = await this.authService.login(data);
    return {
      mensagem: 'Usuario logado com sucesso',
      token
    }
  }
}
