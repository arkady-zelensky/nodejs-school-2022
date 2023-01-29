import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ResponseInterceptor } from 'src/shared/interceptors/response.interceptor';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { DictionaryService } from './dictionary.service';
import { LanguagesListSerializer } from './serializers/languages-list.serializer';

@Controller('v1/dictionary')
@UseGuards(JwtGuard)
@ApiTags('Dictionary Controller')
@ApiBearerAuth()
export class DictionaryController {
  constructor(private service: DictionaryService) {}

  @Get('languages')
  @UseInterceptors(new ResponseInterceptor(LanguagesListSerializer))
  @ApiOperation({ summary: 'Get languages list' })
  @ApiUnauthorizedResponse({ description: 'User is not authorized' })
  @ApiOkResponse({
    description: 'Languages list returned',
    type: LanguagesListSerializer,
  })
  async getLanguagesList() {
    const languages = await this.service.getLanguagesList();
    return { languages };
  }
}
