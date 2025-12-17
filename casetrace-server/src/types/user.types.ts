export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  role?: 'ADMIN' | 'STAFF' | 'CLIENT';
}

export interface LoginDTO {
  email: string;
  password: string;
}
