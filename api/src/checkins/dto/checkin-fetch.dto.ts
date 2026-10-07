import { Checkin } from '../checkin.entity';

export class checkinResponseDto {
    checkins: Checkin[];
    total: number;
    limit: number;
    offset: number;

    constructor(
        checkins: Checkin[],
        total: number,
        limit: number,
        offset: number,
    ) {
        this.checkins = checkins;
        this.total = total;
        this.limit = limit;
        this.offset = offset;
    }
}
