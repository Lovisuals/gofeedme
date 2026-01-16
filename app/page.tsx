import Navbar from '@/components/Navbar';
import PoolCard from '@/components/PoolCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck, Zap, Users, ArrowRight, Wheat, Beef, Sprout } from 'lucide-react';
import { getActivePools } from '@/lib/actions';
import { Suspense } from 'react';

function PoolsFallback() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="overflow-hidden border border-gray-200 animate-pulse">
          <div className="h-48 bg-gray-200" />
          <CardContent className="pt-4">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
            <div className="h-2 bg-gray-200 rounded mb-4" />
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-1/4" />
              <div className="h-4 bg-gray-200 rounded w-1/4" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default async function Home() {
  const pools = await getActivePools();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero with Vision */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            One Plate, Many Hands.<br />
            <span className="text-primary">Affordable Food Through Community Power</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto">
            No one needs to know each other. Just pool funds, buy in bulk, save big — escrow-protected, transparent, and community-driven.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary-hover text-white px-10 py-6 text-lg">
              Start a Pool
            </Button>
            <Button size="lg" variant="outline" className="px-10 py-6 text-lg">
              Browse Pools
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 border-y bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <Zap className="h-10 w-10 mx-auto mb-4 text-primary" />
              <h3 className="font-bold text-lg text-gray-900">Instant & Easy</h3>
              <p className="text-gray-600">Pool in minutes, pay securely</p>
            </div>
            <div>
              <ShieldCheck className="h-10 w-10 mx-auto mb-4 text-primary" />
              <h3 className="font-bold text-lg text-gray-900">Escrow Protected</h3>
              <p className="text-gray-600">Funds held until delivery</p>
            </div>
            <div>
              <Users className="h-10 w-10 mx-auto mb-4 text-primary" />
              <h3 className="font-bold text-lg text-gray-900">Community Powered</h3>
              <p className="text-gray-600">Anyone can join, no barriers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Rings */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Shop by Category</h2>
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

        <Suspense fallback={<PoolsFallback />}>
          {pools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pools.map((pool) => (
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
        </Suspense>
      </section>
    </div>
  );
}
