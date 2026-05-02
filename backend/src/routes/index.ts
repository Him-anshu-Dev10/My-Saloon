import { Router } from 'express';
import salonsRoutes from './salons.routes';

const router = Router();

// Mount all modular routes
router.use('/salons', salonsRoutes);

export default router;
