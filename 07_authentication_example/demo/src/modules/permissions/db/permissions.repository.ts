import { EntityRepository, Repository } from 'typeorm';
import { PermissionEntity } from './permission.entity';

@EntityRepository(PermissionEntity)
export class PermissionsRepository extends Repository<PermissionEntity> {}
