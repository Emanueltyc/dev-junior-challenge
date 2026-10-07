import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Checkin } from './checkin.entity';
import { CheckinsController } from './checkins.controller';
import { CheckinsService } from './checkins.service';

@Module({
    imports: [TypeOrmModule.forFeature([Checkin])],
    controllers: [CheckinsController],
    providers: [CheckinsService],
})
export class CheckinsModule {}
