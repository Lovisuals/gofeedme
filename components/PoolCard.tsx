'use client';

import { Button } from '@/components/ui/button';
import JoinPoolModal from '@/components/JoinPoolModal';

interface PoolCardProps {
  pool: {
    id: string;
    title: string;
    image_url: string;
    total: number;
    raised: number;
    slotsTotal: number;
    slotsFilled: number;
    location: string;
    timeLeft: string;
  };
}

export default function PoolCard({ pool }: PoolCardProps) {
  const progress = (pool.slotsFilled / pool.slotsTotal) * 100;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={pool.image_url} alt={pool.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{pool.title}</h3>
        <p className="text-sm text-gray-600">{pool.location}</p>
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-primary h-2.5 rounded-full" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {pool.slotsFilled} / {pool.slotsTotal} joined • ₦{pool.raised.toLocaleString()} raised
          </p>
        </div>
        <p className="text-sm text-gray-500 mt-2">{pool.timeLeft}</p>

        {/* Join Button + Modal */}
        <div className="mt-4">
          <JoinPoolModal pool={pool} isLoggedIn={true} /> {/* Replace with real auth check later */}
        </div>
      </div>
    </div>
  );
}
