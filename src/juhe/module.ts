import { Module, HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HISTORY_REPOSITORY } from './constants';
import { HistoryController } from './controllers';
import { HistoryRepository } from './repositories/database';
import { HistoryService } from './services/history.service';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [HistoryController],
  providers: [
    HistoryService,
    { provide: HISTORY_REPOSITORY, useClass: HistoryRepository },
  ],
})
export class JuheModule {}
