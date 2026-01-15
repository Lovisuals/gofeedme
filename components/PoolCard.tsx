import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
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
    <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer border border-gray-200">
      <div className="relative h-48">
        <Image
          src={pool.image_url || 'https://via.placeholder.com/400x300?text=No+Image'}
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
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">{pool.slotsFilled}/{pool.slotsTotal} slots</span>
              <span className="font-medium text-primary">{percent}%</span>
            </div>
            <Progress value={percent} className="h-2 [&>div]:bg-primary" />
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Per slot</span>
            <span className="font-bold text-primary">₦{pricePerSlot.toLocaleString()}</span>
          </div>

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
