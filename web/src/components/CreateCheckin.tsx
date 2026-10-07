import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface CreateCheckinProps {
    onCreate: () => Promise<void>;
}

export default function CreateCheckin({ onCreate }: CreateCheckinProps) {
    const [cpf, setCpf] = useState<string>('');

    return (
        <div className="flex gap-2 items-baseline">
            <span className="whitespace-nowrap">Realizar check-in:</span>
            <Input
                placeholder="Digite o cpf"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
            />
            <Button onClick={() => createCheckin(cpf).then(onCreate)}>
                <ArrowRight />
            </Button>
        </div>
    );
}

async function createCheckin(cpf: string) {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/checkins/${cpf}`,
        {
            method: 'POST',
        },
    );

    if (!response.ok) {
        if (response.status === 404) {
            const { message } = (await response.json()) as { message: string };

            return toast.error(message);
        }

        toast.error(`HTTP ${response.status}`);
    }
}
