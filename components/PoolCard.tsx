import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Clock } from 'lucide-react';
import Image from 'next/image';

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
  const percent = Math.min(Math.round((pool.slotsFilled / pool.slotsTotal) * 100), 100);
  const pricePerSlot = Math.round(pool.total / pool.slotsTotal);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border border-gray-200">
      <div className="relative h-48">
        <Image
          src={pool.image_url || 'https://via.placeholder.com/400x300?text=Pool'}
          alt={pool.title}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg line-clamp-2">{pool.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Circular Progress Ring */}
          <div className="flex items-center justify-between">
            <div className="relative w-16 h-16">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  className="text-gray-200"
                  strokeWidth="8"
                  fill="transparent"
                  r="46"
                  cx="50"
                  cy="50"
                />
                <circle
                  className="text-primary"
                  strokeWidth="8"
                  fill="transparent"
                  r="46"
                  cx="50"
                  cy="50"
                  strokeDasharray={`${percent * 2.89} 289`}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-primary">
                {percent}%
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Slots</div>
              <div className="font-bold text-primary">{pool.slotsFilled}/{pool.slotsTotal}</div>
            </div>
          </div>

          {/* Price */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Per slot</span>
            <span className="font-bold text-primary">₦{pricePerSlot.toLocaleString()}</span>
          </div>

          {/* Location & Time */}
          <div className="flex justify-between text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {pool.location}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {pool.timeLeft}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
