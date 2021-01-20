import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventModule } from '@squareboat/nest-events';
import { JuheModule } from './juhe';
import { DbModule } from './_db';
import config from '@config/index';
import { CoreModule } from '@libs/core';

@Module({
  imports: [
    DbModule,
    CoreModule,
    EventModule,
    JuheModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: config,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
