import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CriarUsuarioDTO } from 'src/usuario/dtos/criar-usuario.dto';
import { UsuarioService } from 'src/usuario/usuario.service';
import { LoginDto } from './dtos/login.dto';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly usuarioService: UsuarioService,
        private readonly jwtService: JwtService
    ){}

    async criar(dto: CriarUsuarioDTO){
        return await this.usuarioService.criar(dto)
    }

    async login(dto:LoginDto){
        try {
            const usuario = await this.usuarioService.buscarPorEmail(dto.email);

            const match = await bcrypt.compare(dto.senha, usuario.senha);
            if(!match)
                throw new UnauthorizedException()

            const payload = {
                id:usuario.id
            }
            const token = this.jwtService.sign(payload)
            return token
        } catch (error) {
            if(error instanceof NotFoundException || error instanceof UnauthorizedException)
                throw new UnauthorizedException("Usuarios ou senha invalidos")

            throw error;
        }
        
    }
}
