import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsString({
    message: "O conteudo do campo 'nome' deve ser composto apenas por letras.",
  })
  @IsNotEmpty({ message: "O campo 'nome' é de preenchimento obrigatório." })
  @Matches(/^[A-Za-zÀ-ÿ]+(?: [A-Za-zÀ-ÿ]+)+$/, {
    message: 'O nome deve ser composto por pelo menos um nome e um sobrenome.',
  })
  name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty({ message: "O campo 'email' é de preenchimento obrigatório." })
  email: string;

<<<<<<< HEAD
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,20}$/, {message: "A senha deve conter no minimo 8 caracteres, pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial."})
=======
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,20}$/, {message: "A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial."})
>>>>>>> b9b5eb547266dcb67d96a4e9b98454d4a841c56e
  @IsNotEmpty()
  password: string;


  @IsNotEmpty()
  confirm?: string

}
