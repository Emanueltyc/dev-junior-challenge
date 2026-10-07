export type Checkin = {
    id: number;
    cpf: string;
    name: string;
    createdAt: string;
};

export type CheckinListResponse = {
    checkins: Checkin[];
    total: number;
    limit: number;
    offset: number;
};
