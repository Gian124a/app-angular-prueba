export interface RegisterResponse {
  message: string;
}

export interface LoginResponse {
  valid: boolean;
  token: string;
  user: UserResponse;
}

export interface UserResponse {
  _id: string;
  nombre: string;
  apellido: string;
  usuario: string;
  __v: number;
}

export interface UserRegister {
  nombre: string;
  apellido: string;
  usuario: string;
  password: string;
}

// Interfaz necesaria para el payload del login
export interface LoginPayload {
  usuario: string; // La clave que espera el bac
  password: string;
}

export interface ProfileResponse {
  message: string;
  user: {
    id: string;
    usuario: string;
    iat: number;
    exp: number;
  };
}
