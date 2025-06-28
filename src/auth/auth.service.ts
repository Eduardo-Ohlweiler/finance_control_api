import { Injectable } from '@nestjs/common';
import { CriarUsuarioDTO } from 'src/usuario/dtos/criar-usuario.dto';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly usuarioService: UsuarioService
){}

    async criar(dto: CriarUsuarioDTO){
        return await this.usuarioService.criar(dto)
    }
}
