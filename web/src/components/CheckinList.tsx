import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import type { CheckinListResponse } from '@/types/checkin';

interface CheckinListProps {
    checkinsList: CheckinListResponse;
}

export default function CheckinList({ checkinsList }: CheckinListProps) {
    const { checkins } = checkinsList;

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>cpf</TableHead>
                    <TableHead>nome</TableHead>
                    <TableHead>data de check-in</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {checkins.map((c) => {
                    const formatted = new Intl.DateTimeFormat('pt-BR', {
                        dateStyle: 'short',
                        timeStyle: 'short',
                    })
                        .format(new Date(c.createdAt))
                        .replace(',', '');

                    return (
                        <TableRow key={c.id}>
                            <TableCell>{c.cpf}</TableCell>
                            <TableCell>{c.name}</TableCell>
                            <TableCell>{formatted}</TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
