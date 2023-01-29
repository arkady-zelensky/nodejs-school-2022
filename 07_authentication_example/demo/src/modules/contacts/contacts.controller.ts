import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LanguageHeader } from 'src/shared/decorators/language-header.decorator';
import { Language } from 'src/shared/decorators/language.decorator';
import { ResponseInterceptor } from 'src/shared/interceptors/response.interceptor';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ContactsService } from './contacts.service';
import { ContactTypesListSerializer } from './serializers/contact-types-list.serializer';

@Controller('v1/contacts')
@UseGuards(JwtGuard)
@ApiTags('Contacts Controller')
@ApiBearerAuth()
export class ContactsController {
  constructor(private service: ContactsService) {}

  @Get('types')
  @UseInterceptors(new ResponseInterceptor(ContactTypesListSerializer))
  @ApiOperation({ summary: 'Get list of available contact types' })
  @LanguageHeader()
  @ApiUnauthorizedResponse({ description: 'User is not authorized' })
  @ApiOkResponse({
    description: 'Organization types returned',
    type: ContactTypesListSerializer,
  })
  async getContactTypes(@Language() language: string) {
    const types = await this.service.getContactTypes(language);
    return { types };
  }
}
