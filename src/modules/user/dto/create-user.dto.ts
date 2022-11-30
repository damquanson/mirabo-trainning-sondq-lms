import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    
    @IsString()
   @IsNotEmpty()
   @MinLength(5)
   
    username:string;
    @IsEmail()
    @IsNotEmpty()
    email:string;
    @IsNotEmpty()
    password:string;
    @IsNumber()
    role:number;
}
function ApiProperty() {
    throw new Error("Function not implemented.");
}

