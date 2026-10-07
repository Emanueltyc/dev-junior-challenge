import { NotFoundException } from '@nestjs/common';
import { CheckinsService } from './checkins.service';
import { Checkin } from './checkin.entity';

describe('CheckinsService', () => {
    let service: CheckinsService;
    let repository: {
        create: jest.Mock;
        save: jest.Mock;
    };
    let fetchSpy: jest.SpyInstance;

    beforeEach(() => {
        process.env.CADASTRO_URL = 'http://cadastro-mock';

        repository = {
            create: jest.fn(),
            save: jest.fn(),
        };
        service = new CheckinsService(repository as never);

        fetchSpy = jest.spyOn(global, 'fetch');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('create', () => {
        it('deve criar um checkin quando o paciente é encontrado', async () => {
            const cpf = '12345678900';
            const savedCheckin = { id: 1, cpf, name: 'João' } as Checkin;

            fetchSpy.mockResolvedValue({
                status: 200,
                json: () => Promise.resolve({ nome: 'João' }),
            });
            repository.create.mockReturnValue(savedCheckin);
            repository.save.mockResolvedValue(savedCheckin);

            const result = await service.create(cpf);

            expect(fetchSpy).toHaveBeenCalledWith(
                'http://cadastro-mock/pacientes/12345678900',
            );
            expect(repository.create).toHaveBeenCalledWith({
                cpf,
                name: 'João',
            });
            expect(repository.save).toHaveBeenCalledWith(savedCheckin);
            expect(result).toBe(savedCheckin);
        });

        it('deve lançar NotFoundException quando o paciente não existe', async () => {
            fetchSpy.mockResolvedValue({
                status: 404,
                json: () => Promise.resolve({}),
            });

            await expect(service.create('00000000000')).rejects.toThrow(
                new NotFoundException(
                    'Não foi encontrado um paciente com este cpf',
                ),
            );
            expect(repository.create).not.toHaveBeenCalled();
            expect(repository.save).not.toHaveBeenCalled();
        });
    });
});
