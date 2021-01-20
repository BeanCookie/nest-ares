import services from '@config/services';
import { InjectRepository, RepositoryContract } from '@libs/core';
import { HttpService, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import moment = require('moment');
import { HISTORY_REPOSITORY } from '../constants';
import { History } from '../models';
import { HistoryRepositoryContract } from '../repositories/contracts';

@Injectable()
export class HistoryService {
  constructor(
    @Inject(HISTORY_REPOSITORY)
    private historyRepository: HistoryRepositoryContract,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async getHistory(day: string): Promise<Record<string, any>[] | []> {
    const existed = await this.historyRepository.exists({
      day: day,
    });

    if (existed) {
      return this.historyRepository.getWhere({
        day: day,
      });
    }

    const juheKey: string = this.configService.get('JUHE_KEY');

    const res = await this.httpService
      .get(
        `http://v.juhe.cn/todayOnhistory/queryEvent.php?key=${juheKey}&date=${day}`,
      )
      .toPromise();

    if (res?.data?.result) {
      await res?.data?.result?.forEach((history) => {
        this.historyRepository.create({
          day: history.day,
          date: history.date,
          title: history.title,
          e_id: history.e_id,
        });
      });
    }

    return await this.historyRepository.getWhere({
      day: day,
    });
  }

  async getToday(): Promise<Record<string, any>[] | []> {
    const today = moment().format('M/D');
    return this.getHistory(today);
  }
}
