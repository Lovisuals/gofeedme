'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { useState } from 'react';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  total_amount: z.number().min(1000, 'Minimum ₦1000'),
  slots_total: z.number().min(2, 'Minimum 2 slots'),
  location: z.string().min(1, 'Location required'),
  deadline: z.string().min(1, 'Deadline required'),
  image: z.instanceof(File).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreatePool() {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    let image_url = '';

    if (data.image) {
      const { data: uploadData, error } = await supabase.storage
        .from('pools-images')
        .upload(`public/${data.image.name}`, data.image);

      if (error) {
        alert('Error uploading image: ' + error.message);
        return;
      }

      image_url = supabase.storage.from('pools-images').getPublicUrl(uploadData.path).data.publicUrl;
    }

    const poolData = {
      title: data.title,
      image_url,
      total_amount: data.total_amount,
      slots_total: data.slots_total,
      location: data.location,
      deadline: data.deadline,
      status: 'active',
    };

    const { error } = await supabase.from('pools').insert([poolData]);

    if (error) {
      alert('Error creating pool: ' + error.message);
    } else {
      router.push('/');
    }
  };

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Create New Pool</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" {...register('title')} />
              {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}
            </div>
            <div>
              <Label htmlFor="image">Image (Gallery or Camera)</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                capture="environment"
                {...register('image', {
                  onChange: onImageChange
                })}
              />
              {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 h-48 w-full object-cover rounded" />}
              {errors.image && <p className="text-red-600 text-sm">{errors.image.message}</p>}
            </div>
            <div>
              <Label htmlFor="total_amount">Total Amount (₦)</Label>
              <Input id="total_amount" type="number" {...register('total_amount', { valueAsNumber: true })} />
              {errors.total_amount && <p className="text-red-600 text-sm">{errors.total_amount.message}</p>}
            </div>
            <div>
              <Label htmlFor="slots_total">Total Slots</Label>
              <Input id="slots_total" type="number" {...register('slots_total', { valueAsNumber: true })} />
              {errors.slots_total && <p className="text-red-600 text-sm">{errors.slots_total.message}</p>}
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" {...register('location')} />
              {errors.location && <p className="text-red-600 text-sm">{errors.location.message}</p>}
            </div>
            <div>
              <Label htmlFor="deadline">Deadline</Label>
              <Input id="deadline" type="date" {...register('deadline')} />
              {errors.deadline && <p className="text-red-600 text-sm">{errors.deadline.message as string}</p>}
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary-hover"
            >
              {isSubmitting ? 'Creating...' : 'Create Pool'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
