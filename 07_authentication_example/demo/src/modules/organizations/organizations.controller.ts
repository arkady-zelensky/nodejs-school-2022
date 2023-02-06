import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LanguageHeader } from 'src/shared/decorators/language-header.decorator';
import { Language } from 'src/shared/decorators/language.decorator';
import { RequiredPermissions } from 'src/shared/decorators/required-permissions.decorator';
import { UserId } from 'src/shared/decorators/user-id.decorators';
import { ResponseInterceptor } from 'src/shared/interceptors/response.interceptor';
import { Permissions } from 'src/shared/permissions/permissions';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { OrganizationDto } from './dto/organization.dto';
import { OrganizationsService } from './organizations.service';
import { OrganizationTypesSerializer as TypesSerializer } from './serializers/organization-types.serializer';
import { OrganizationSerializer } from './serializers/organization.serializer';
import { OrganizationsListSerializer } from './serializers/organizations-list.serializer';

@Controller('v1/organizations')
@UseGuards(JwtGuard)
@ApiTags('Organizations Controller')
@ApiBearerAuth()
export class OrganizationsController {
  constructor(private service: OrganizationsService) {}

  @Post()
  @RequiredPermissions(Permissions.ORGANIZATIONS_CREATE)
  @UseInterceptors(new ResponseInterceptor(OrganizationSerializer))
  @ApiOperation({ summary: 'Create organization' })
  @LanguageHeader()
  @ApiUnauthorizedResponse({ description: 'User is not authorized' })
  @ApiConflictResponse({ description: 'User already owns an organization' })
  @ApiCreatedResponse({
    description: 'Organization created',
    type: OrganizationSerializer,
  })
  async createOrganization(
    @UserId() userId: string,
    @Body() dto: OrganizationDto,
    @Language() language: string,
  ) {
    return this.service.createOrganization(userId, dto, language);
  }

  @Get('my')
  @RequiredPermissions(Permissions.ORGANIZATIONS_READ)
  @UseInterceptors(new ResponseInterceptor(OrganizationsListSerializer))
  @ApiOperation({ summary: 'Get list of currently logged user organizations' })
  @LanguageHeader()
  @ApiUnauthorizedResponse({ description: 'User is not authorized' })
  @ApiOkResponse({
    description: 'Organizations list returned',
    type: OrganizationsListSerializer,
  })
  async getMyOrganizationsList(
    @UserId() userId: string,
    @Language() language: string,
  ) {
    const organizations = await this.service.getMyOrganizationsList(
      userId,
      language,
    );

    return { organizations };
  }

  @Get('types')
  @ApiOperation({ summary: 'Get list of available organization types' })
  @ApiUnauthorizedResponse({ description: 'User is not authorized' })
  @ApiOkResponse({
    description: 'Organization types returned',
    type: TypesSerializer,
  })
  async getOrganizationTypes() {
    const types = await this.service.getOrganizationTypes();
    return { types };
  }

  @Put(':id')
  @RequiredPermissions(Permissions.ORGANIZATIONS_UPDATE)
  @UseInterceptors(new ResponseInterceptor(OrganizationSerializer))
  @ApiOperation({ summary: 'Update organization' })
  @LanguageHeader()
  @ApiUnauthorizedResponse({ description: 'User is not authorized' })
  @ApiForbiddenResponse({ description: 'Action is not allowed' })
  @ApiNotFoundResponse({ description: 'Organization not found' })
  @ApiOkResponse({
    description: 'Organization updated',
    type: OrganizationSerializer,
  })
  async updateOrganization(
    @Param('id', ParseUUIDPipe) id: string,
    @UserId() userId: string,
    @Body() dto: OrganizationDto,
    @Language() language: string,
  ) {
    return this.service.updateOrganization(id, userId, dto, language);
  }
}
