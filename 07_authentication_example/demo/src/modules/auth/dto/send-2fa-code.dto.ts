import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { TwoFaTypes } from "../types/two-fa-types.enum";

export class Send2faCodeDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsEnum(TwoFaTypes)
  type: TwoFaTypes;

  @ApiProperty()
  @IsString()
  @IsOptional()
  recaptchaResponse: string;
}
