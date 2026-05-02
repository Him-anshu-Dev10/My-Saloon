import { supabase } from '../config/supabase';
import { ApiError } from '../exceptions/ApiError';

export class SalonsService {
  /**
   * Retrieves a list of salons from Supabase
   */
  public async findAllSalons(limit: number = 20) {
    const { data: salons, error } = await supabase
      .from('salons')
      .select('*')
      .limit(limit);

    if (error) {
      // Throw formatted API error (will be caught by global errorHandler)
      throw ApiError.internal(`Failed to fetch salons: ${error.message}`, 'DB_FETCH_ERROR');
    }

    return salons;
  }

  /**
   * Retrieves a specific salon by ID
   */
  public async findSalonById(id: string) {
    const { data: salon, error } = await supabase
      .from('salons')
      .select('*, services(*), reviews(*)')
      .eq('id', id)
      .single();

    if (error) {
      // Supabase throws if record not found when using .single()
      if (error.code === 'PGRST116') {
        throw ApiError.notFound(`Salon with ID ${id} not found`, 'SALON_NOT_FOUND');
      }
      throw ApiError.internal(`Failed to fetch salon: ${error.message}`, 'DB_FETCH_ERROR');
    }

    return salon;
  }
}
