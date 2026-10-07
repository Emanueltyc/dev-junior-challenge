import CheckinList from '@/components/CheckinList';
import type { CheckinListResponse } from '@/types/checkin';
import { useEffect, useState } from 'react';

export default function Home() {
    const [checkinListResponse, setCheckinListResponse] =
        useState<CheckinListResponse>();

    useEffect(() => {
        fetchCheckinList().then(setCheckinListResponse);
    }, []);

    return (
        <main className="px-20 py-10 text-center space-y-20">
            <h1 className="text-5xl text-red">Check-in</h1>
            {checkinListResponse?.checkins.length && (
                <CheckinList checkinsList={checkinListResponse} />
            )}
        </main>
    );
}

async function fetchCheckinList(): Promise<CheckinListResponse> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/checkins`);

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    return response.json();
}
