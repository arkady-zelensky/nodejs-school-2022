import { Module } from "@nestjs/common";
import { configModule } from "./config/config.module";
import { databaseModule } from "./database/database.module";
import { AuthModule } from "./modules/auth/auth.module";
import { cacheModule } from "./shared/cache/cache.module";
import { MailingService } from "./shared/mailing/mailing.service";
import { OrganizationsModule } from "./modules/organizations/organizations.module";
import { DictionaryModule } from "./modules/dictionary/dictionary.module";
import { ContactsModule } from "./modules/contacts/contacts.module";

@Module({
  imports: [
    configModule,
    databaseModule,
    cacheModule,
    AuthModule,
    OrganizationsModule,
    DictionaryModule,
    ContactsModule,
  ],
  controllers: [],
  providers: [MailingService],
})
export class AppModule {}
