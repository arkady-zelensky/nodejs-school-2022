import { IsString, IsNotEmpty } from "class-validator";

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;
}
