import { Controller, Get, Param, Post, Query, Request } from '@nestjs/common';
import { CheckinsService } from './checkins.service';
import { Checkin } from './checkin.entity';
import { checkinResponseDto } from './dto/checkin-fetch.dto';

@Controller('checkins')
export class CheckinsController {
    constructor(private checkinsService: CheckinsService) {}

    @Post(':cpf')
    async search(@Param('cpf') cpf: string): Promise<Checkin> {
        return this.checkinsService.create(cpf);
    }

    @Get()
    async fetch(
        @Query() { limit, offset, order },
    ): Promise<checkinResponseDto> {
        return this.checkinsService.fetch(limit, offset, order);
    }
}
