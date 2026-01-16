'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';

interface JoinPoolModalProps {
  pool: any;
}

export default function JoinPoolModal({ pool }: JoinPoolModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="bg-primary text-white hover:bg-primary-hover">
          Join Pool
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join {pool.title}</DialogTitle>
        </DialogHeader>
        <Card className="mt-4">
          <CardContent className="p-6 space-y-4">
            <p><strong>Location:</strong> {pool.location}</p>
            <p><strong>Deadline:</strong> {pool.timeLeft}</p>
            <p><strong>Price per slot:</strong> ₦{Math.round(pool.total / pool.slotsTotal).toLocaleString()}</p>
            <p><strong>Participants:</strong> {pool.slotsFilled} / {pool.slotsTotal}</p>
            <p><strong>Payment:</strong> Funds held in escrow until delivery</p>
            <Button className="w-full bg-primary hover:bg-primary-hover" disabled={pool.slotsFilled >= pool.slotsTotal}>
              Confirm & Pay Now
            </Button>
            <p className="text-sm text-gray-500 text-center">
              Payment commits you to the pool goal. No spam — commitment required.
            </p>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
