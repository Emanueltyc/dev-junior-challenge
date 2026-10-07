import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckinsModule } from './checkins/checkins.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.DATABASE_URL,
            port: 5432,
            autoLoadEntities: true,
            synchronize: true,
        }),
        CheckinsModule,
    ],
})
export class AppModule {}
