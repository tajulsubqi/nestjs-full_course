import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['INTERN', 'ADMIN', 'ENGINEER'], {
    message: 'Role must be one of: INTERN, ADMIN, ENGINEER',
  })
  role: 'INTERN' | 'ADMIN' | 'ENGINEER';
}
