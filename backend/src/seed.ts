import { pool } from './config/db';

async function seed() {
  const client = await pool.connect();
  try {
    console.log('Seeding database...');

    // Drop existing mock tables to ensure clean schema
    await client.query('DROP TABLE IF EXISTS public.services CASCADE');
    await client.query('DROP TABLE IF EXISTS public.salons CASCADE');

    // 1. Create salons table
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.salons (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        image TEXT NOT NULL,
        rating NUMERIC,
        city TEXT,
        starting_price NUMERIC,
        latitude NUMERIC,
        longitude NUMERIC
      );
    `);

    // 2. Create services table
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.services (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        salon_id UUID REFERENCES public.salons(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        price NUMERIC NOT NULL,
        duration TEXT NOT NULL
      );
    `);

    // Check if we already have salons
    const countRes = await client.query('SELECT count(*) FROM public.salons');
    const count = parseInt(countRes.rows[0].count, 10);
    
    if (count === 0) {
      console.log('No salons found. Inserting mock salons...');
      
      const salons = [
        {
          name: 'The Aura Collective',
          image: 'https://images.unsplash.com/photo-1595476108010-b4d1f10d5e43?q=80&w=800&auto=format&fit=crop',
          rating: 4.9,
          city: 'New York',
          starting_price: 85,
          latitude: 40.7128,
          longitude: -74.0060
        },
        {
          name: 'Noir Facials & Spa',
          image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=800&auto=format&fit=crop',
          rating: 4.8,
          city: 'New York',
          starting_price: 120,
          latitude: 40.7282,
          longitude: -73.9942
        },
        {
          name: 'Luxe Grooming',
          image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop',
          rating: 4.7,
          city: 'New York',
          starting_price: 55,
          latitude: 40.7484,
          longitude: -73.9857
        },
        {
          name: 'Glowup Signature Salon',
          image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop',
          rating: 5.0,
          city: 'Los Angeles',
          starting_price: 150,
          latitude: 34.0522,
          longitude: -118.2437
        }
      ];

      for (const salon of salons) {
        const res = await client.query(
          `INSERT INTO public.salons (name, image, rating, city, starting_price, latitude, longitude) 
           VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
          [salon.name, salon.image, salon.rating, salon.city, salon.starting_price, salon.latitude, salon.longitude]
        );
        const salonId = res.rows[0].id;

        // Insert services
        const services = [
          { name: 'Signature Haircut', price: salon.starting_price, duration: '45 min' },
          { name: 'Premium Balayage', price: salon.starting_price + 100, duration: '120 min' },
          { name: 'Keratin Treatment', price: salon.starting_price + 150, duration: '90 min' },
          { name: 'Deep Tissue Massage', price: salon.starting_price + 50, duration: '60 min' }
        ];

        for (const service of services) {
          await client.query(
            `INSERT INTO public.services (salon_id, name, price, duration) VALUES ($1, $2, $3, $4)`,
            [salonId, service.name, service.price, service.duration]
          );
        }
      }
      console.log('Successfully inserted mock salons and services!');
    } else {
      console.log('Database already has salons, skipping insertion.');
    }
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    client.release();
    pool.end();
  }
}

seed();
