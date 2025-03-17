import axios from 'axios';
import { LoginDto } from './Models/LoginDto';
import { RegisterDto } from './Models/RegisterDto';
import { AuthResponse } from './Models/AuthResponse';

export class AuthClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    const response = await axios.post<AuthResponse>(
      `${this.baseUrl}/register`,
      registerDto
    );
    return response.data;
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const response = await axios.post<AuthResponse>(
      `${this.baseUrl}/login`,
      loginDto
    );
    return response.data;
  }
}
