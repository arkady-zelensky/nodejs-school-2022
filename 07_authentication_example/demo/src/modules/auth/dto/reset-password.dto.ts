import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  newPassword: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  recaptchaResponse: string;
}
