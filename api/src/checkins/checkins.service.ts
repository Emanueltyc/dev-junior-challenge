import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Check, FindOptionsOrderValue, Repository } from 'typeorm';
import { Checkin } from './checkin.entity';
import { checkinResponseDto } from './dto/checkin-fetch.dto';

@Injectable()
export class CheckinsService {
    constructor(
        @InjectRepository(Checkin)
        private checkinsRepository: Repository<Checkin>,
    ) {}

    async create(cpf: string): Promise<Checkin> {
        const response = await fetch(
            `${process.env.CADASTRO_URL}/pacientes/${cpf}`,
        );

        if (response.status === 404)
            throw new NotFoundException(
                'Não foi encontrado um paciente com este cpf',
            );

        const { nome: name } = (await response.json()) as { nome: string };

        const checkin = this.checkinsRepository.create({
            cpf,
            name,
        });
        await this.checkinsRepository.save(checkin);

        return checkin;
    }

    async fetch(
        limit = 10,
        offset = 0,
        order: FindOptionsOrderValue = 'ASC',
    ): Promise<checkinResponseDto> {
        limit = Math.min(limit, 100);

        const [checkins, total] = await this.checkinsRepository.findAndCount({
            take: limit,
            skip: offset,
            order: { createdAt: order },
        });

        return new checkinResponseDto(checkins, total, limit, offset);
    }
}
