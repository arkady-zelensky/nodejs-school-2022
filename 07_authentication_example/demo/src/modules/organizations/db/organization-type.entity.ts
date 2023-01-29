import { Column, Entity } from 'typeorm';
import { OrganizationTypes } from '../types/organization-types.enum';

@Entity('organization_types')
export class OrganizationTypeEntity {
  @Column({ primary: true })
  type: OrganizationTypes;
}
