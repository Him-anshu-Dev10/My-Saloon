import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// Note: We are already keeping in mind our api-errors.instructions.md
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Booking Service is running properly',
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`[booking-service] API is awake and listening on port ${PORT}`);
});
