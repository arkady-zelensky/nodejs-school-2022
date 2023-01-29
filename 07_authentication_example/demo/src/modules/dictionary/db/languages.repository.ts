import { EntityRepository, Repository } from 'typeorm';
import { LanguageEntity } from './language.entity';

@EntityRepository(LanguageEntity)
export class LanguagesRepository extends Repository<LanguageEntity> {}
