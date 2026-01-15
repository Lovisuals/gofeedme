import Navbar from '@/components/Navbar';
import PoolCard from '@/components/PoolCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck, Zap, Users, Wheat, Beef, Sprout, ArrowRight } from 'lucide-react';

// Mock data - replace with Supabase fetch later
const MOCK_POOLS = [
  {
    id: '1',
    title: '50kg Mama Gold Rice – Ikeja Market Group',
    image_url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80',
    total: 85000,
    raised: 51000,
    slotsTotal: 10,
    slotsFilled: 6,
    location: 'Ikeja, Lagos',
    timeLeft: '2 days left',
  },
  {
    id: '2',
    title: 'Bulk Frozen Chicken – Family Pot for Weekend',
    image_url: 'https://images.unsplash.com/photo-1541447233767-f01878d6b7b2?auto=format&fit=crop&q=80',
    total: 45000,
    raised: 22500,
    slotsTotal: 5,
    slotsFilled: 3,
    location: 'Lekki Phase 1',
    timeLeft: '1 week',
  },
  {
    id: '3',
    title: 'Yam & Garri Bundle – Ogun Farmers Coop',
    image_url: 'https://images.unsplash.com/photo-1601039641847-9b9a45a2f6d4?auto=format&fit=crop&q=80',
    total: 120000,
    raised: 120000,
    slotsTotal: 8,
    slotsFilled: 8,
    location: 'Abeokuta',
    timeLeft: 'Completed',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero with subtle background bubbles */}
      <section className="relative pt-24 pb-16 bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="w-96 h-96 rounded-full bg-primary blur-3xl absolute -top-48 -left-48"></div>
          <div className="w-64 h-64 rounded-full bg-accent-light blur-2xl absolute -bottom-32 -right-32"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Successful Food & Farm Pools<br />
            <span className="text-primary">Start Here</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Pool resources for bulk discounts on staples, proteins, produce, and harvests. Escrow-protected, community-driven.
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

      {/* Category Round Circles (GFM adaptation) */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Discover by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Wheat, title: 'Staples' },
              { icon: Beef, title: 'Proteins' },
              { icon: Sprout, title: 'Fresh Produce' },
              { icon: Users, title: 'Community Harvest' },
            ].map((cat, i) => (
              <Card key={i} className="text-center hover:shadow-md transition-shadow cursor-pointer border border-transparent hover:border-primary/20">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4 hover:scale-110 transition-transform">
                    <cat.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{cat.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Active Pools */}
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
