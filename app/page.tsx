import Navbar from '@/components/Navbar';
import PoolCard from '@/components/PoolCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck, Zap, Users, ArrowRight } from 'lucide-react';

// Mock data for demo - replace with real Supabase fetch later
const MOCK_POOLS = [
  {
    id: '1',
    title: 'Bulk 50kg Rice for Lagos Coop',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80',
    total: 85000,
    raised: 51000,
    slotsTotal: 10,
    slotsFilled: 6,
    location: 'Ikeja, Lagos',
    timeLeft: '2 days left',
  },
  {
    id: '2',
    title: 'Shared Tractor Rental - Ogun Farmers',
    image: 'https://images.unsplash.com/photo-1601598851540-6e636c7a493e?auto=format&fit=crop&q=80',
    total: 250000,
    raised: 100000,
    slotsTotal: 5,
    slotsFilled: 2,
    location: 'Abeokuta',
    timeLeft: '1 week',
  },
  {
    id: '3',
    title: 'Community Yam Harvest Pool',
    image: 'https://images.unsplash.com/photo-1601039641847-9b9a45a2f6d4?auto=format&fit=crop&q=80',
    total: 120000,
    raised: 120000,
    slotsTotal: 12,
    slotsFilled: 12,
    location: 'Benin City',
    timeLeft: 'Completed',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero - Simplified for now, expand later */}
      <section className="relative pt-24 pb-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Pool Resources, Eat Better, Farm Smarter
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Join or start food & farming pools. Bulk discounts, escrow safety, community power.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary-hover text-white px-10 py-6 text-lg">
            Start a Pool
          </Button>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 border-y bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <Zap className="h-10 w-10 mx-auto mb-4 text-primary" />
              <h3 className="font-bold text-lg">Fast & Easy</h3>
              <p className="text-gray-600">Pool in minutes</p>
            </div>
            <div>
              <ShieldCheck className="h-10 w-10 mx-auto mb-4 text-primary" />
              <h3 className="font-bold text-lg">Guaranteed Safe</h3>
              <p className="text-gray-600">Escrow holds funds</p>
            </div>
            <div>
              <Users className="h-10 w-10 mx-auto mb-4 text-primary" />
              <h3 className="font-bold text-lg">Community Powered</h3>
              <p className="text-gray-600">Verified participants</p>
            </div>
          </div>
        </div>
      </section>

      {/* Active Pools Grid */}
      <section className="py-16 max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Active Pools</h2>
          <Button variant="outline" asChild>
            <a href="/create">
              Start New <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>

        {MOCK_POOLS.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_POOLS.map((pool) => (
              <PoolCard key={pool.id} pool={pool} />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <CardContent>
              <h3 className="text-xl font-semibold mb-4">No active pools yet</h3>
              <p className="text-gray-600 mb-6">Be the first to start one!</p>
              <Button asChild>
                <a href="/create">Create Pool</a>
              </Button>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}
