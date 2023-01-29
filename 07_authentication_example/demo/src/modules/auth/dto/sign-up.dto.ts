import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class SignUpDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  nickname?: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  recaptchaResponse: string;
}
