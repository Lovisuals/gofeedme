import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, Zap, Users, Wheat, Beef, Sprout, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-32 overflow-hidden bg-white">
        {/* Floating Bubbles (food/farm images) */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none opacity-80">
          <img
            src="https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=200"
            alt="Rice bag"
            className="absolute top-20 left-[15%] w-32 h-32 rounded-full object-cover shadow-float animate-bounce-slow"
            style={{ animationDuration: '4s' }}
          />
          <img
            src="https://images.unsplash.com/photo-1541447233767-f01878d6b7b2?auto=format&fit=crop&w=200"
            alt="Livestock"
            className="absolute bottom-16 right-[20%] w-28 h-28 rounded-full object-cover shadow-float animate-bounce-slow"
            style={{ animationDuration: '5s' }}
          />
          <img
            src="https://images.unsplash.com/photo-1610450918386-0925c4046462?auto=format&fit=crop&w=200"
            alt="Tubers"
            className="absolute top-40 right-[10%] w-24 h-24 rounded-full object-cover shadow-float animate-bounce-slow"
            style={{ animationDuration: '3.5s' }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Successful Food & Farm Pools
            <br />
            <span className="text-primary">Start Here</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Pool resources with others for bulk food, farming tools, or harvests. Escrow-protected, discounts unlocked, community-driven.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary-hover text-white px-10 py-6 text-lg font-bold rounded-lg shadow-lg">
            Start a Pool
          </Button>
          <p className="mt-6 text-sm text-gray-500 flex items-center justify-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Funds held safely until delivery
          </p>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 border-y border-gray-100 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <Zap className="h-10 w-10 mx-auto mb-4 text-primary" />
              <h3 className="font-bold text-lg mb-2">Fast & Easy</h3>
              <p className="text-gray-600">Create a pool in minutes</p>
            </div>
            <div>
              <ShieldCheck className="h-10 w-10 mx-auto mb-4 text-primary" />
              <h3 className="font-bold text-lg mb-2">100% Guaranteed</h3>
              <p className="text-gray-600">Escrow protection</p>
            </div>
            <div>
              <Users className="h-10 w-10 mx-auto mb-4 text-primary" />
              <h3 className="font-bold text-lg mb-2">Community Trust</h3>
              <p className="text-gray-600">Verified participants</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
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
              <Card key={i} className="text-center hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <cat.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold">{cat.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Active Pools Stub */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Active Pools</h2>
            <Button variant="outline">View All <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Mock cards - replace with real data later */}
            <Card>
              <CardHeader>
                <CardTitle>Bulk Rice for Lagos Coop</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">8/10 slots filled</p>
                {/* Add progress bar later */}
              </CardContent>
            </Card>
            {/* Add 2 more mock cards */}
          </div>
        </div>
      </section>
    </main>
  );
}
