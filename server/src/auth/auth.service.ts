import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService, 
    ){}
    
    getToken(user: { id: number; email: string }) {
        const payload = { userId: user.id, email: user.email };        
        const token = this.jwtService.sign(payload);        
        return { token, payload };
    }

}
