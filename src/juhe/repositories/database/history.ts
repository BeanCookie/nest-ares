import { History } from '../../models';
import { Injectable } from '@nestjs/common';
import { DatabaseRepository as DB, InjectModel } from '@libs/core';
import { HistoryRepositoryContract } from '../contracts';

@Injectable()
export class HistoryRepository extends DB implements HistoryRepositoryContract {
  @InjectModel(History)
  model: History;
}
