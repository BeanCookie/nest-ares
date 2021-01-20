import { ApiController, Request, Response, WithAlias } from '@libs/core';
import { Controller, Get, Req, Res } from '@nestjs/common';
import { HistoryService } from '../services/history.service';

@Controller('juhe/history')
export class HistoryController extends ApiController {
  constructor(private historyService: HistoryService) {
    super();
  }

  @Get('/today')
  @WithAlias('auth.profile')
  async getToday(@Req() req: Request, @Res() res: Response): Promise<Response> {
    const todayOnHistory = await this.historyService.getToday();

    return res.success(todayOnHistory);
  }

  @Get('/day')
  @WithAlias('auth.profile')
  async getDay(@Req() req: Request, @Res() res: Response): Promise<Response> {
    const todayOnHistory = await this.historyService.getHistory(req.all().day);

    return res.success(todayOnHistory);
  }
}
