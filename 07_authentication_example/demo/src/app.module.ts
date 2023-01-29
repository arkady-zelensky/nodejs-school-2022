import { Module } from '@nestjs/common';
import { configModule } from './config/config.module';
import { databaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { cacheModule } from './shared/cache/cache.module';
import { MailingService } from './shared/mailing/mailing.service';
import { InvolvementsModule } from './modules/involvements/involvements.module';
import { RidesModule } from './modules/rides/rides.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { SettlementsModule } from './modules/settlements/settlements.module';
import { CountriesModule } from './modules/countries/countries.module';
import { ProductsModule } from './modules/products/products.module';
import { DictionaryModule } from './modules/dictionary/dictionary.module';
import { ContactsModule } from './modules/contacts/contacts.module';
import { DonationsModule } from './modules/donations/donations.module';
import { DeliveryModule } from './modules/delivery/delivery.module';
import { HubWarehousesModule } from './modules/hub-warehouses/hub-warehouses.module';
import { NeedsModule } from './modules/needs/needs.module';
import { UserSettingsModule } from './modules/user-settings/user-settings.module';
import { HumDeliveriesModule } from './modules/hum-delivery/hum-delivery.module';

// TODO: 1. add functionality for ride curve settling +
// TODO: 2. add functionality for rides nearby search +
// TODO: 3. add functionality for searching hubs nearby rides +
// TODO: 4. add possibility to filter p. 3 by products (later on)
// TODO: 5. add possibility to add new humanitarian task
// TODO: 6. tell in ride info, that user already assigned to particular transportation tasks
// TODO: 7. maybe to add notification hub or smth like this
// TODO: 8. add verification that volunteer received goods, receiver received goods

@Module({
  imports: [
    configModule,
    databaseModule,
    cacheModule,
    AuthModule,
    InvolvementsModule,
    RidesModule,
    OrganizationsModule,
    CountriesModule,
    SettlementsModule,
    ProductsModule,
    DictionaryModule,
    ContactsModule,
    DonationsModule,
    DeliveryModule,
    HubWarehousesModule,
    NeedsModule,
    UserSettingsModule,
    HumDeliveriesModule,
  ],
  controllers: [],
  providers: [MailingService],
})
export class AppModule {}
