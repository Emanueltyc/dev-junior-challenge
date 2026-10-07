import CheckinList from '@/components/CheckinList';
import CreateCheckin from '@/components/CreateCheckin';
import type { CheckinListResponse } from '@/types/checkin';
import { useEffect, useState } from 'react';

export default function Home() {
    const [checkinListResponse, setCheckinListResponse] =
        useState<CheckinListResponse>();

    async function loadCheckins() {
        fetchCheckinList().then(setCheckinListResponse);
    }

    useEffect(() => {
        loadCheckins();
    }, []);

    return (
        <main className="flex flex-col px-20 py-10 text-center gap-20 items-center">
            <h1 className="text-5xl text-red">Check-in</h1>

            <CreateCheckin onCreate={loadCheckins} />

            <div className="w-m space-y-5">
                <h3 className="text-xl">Fila de Check-in</h3>

                <div className="bg-blue-300">
                    {checkinListResponse?.checkins.length && (
                        <CheckinList checkinsList={checkinListResponse} />
                    )}
                </div>
            </div>
        </main>
    );
}

async function fetchCheckinList(): Promise<CheckinListResponse> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/checkins`);

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    return response.json();
}
