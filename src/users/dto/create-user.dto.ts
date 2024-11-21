import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Matches } from "class-validator"

export class CreateUserDto {

    @IsString({message: "O conteudo do campo 'nome' deve ser composto apenas por letras."})
    @IsNotEmpty({message: "O campo 'nome' é de preenchimento obrigatório."})
    @Matches(/^[A-Za-zÀ-ÿ]+(?: [A-Za-zÀ-ÿ]+)+$/, {
    message: 'O nome deve ser composto por pelo menos um nome e um sobrenome.',
  })
    name: string

    @IsString()
    @IsEmail()
    @IsNotEmpty({message: "O campo 'email' é de preenchimento obrigatório."})
    email: string

    @IsString()
    @IsStrongPassword()
    @IsNotEmpty()
    password: string
}
