import express from 'express';
import cors from 'cors';
import { PlayerController } from './app/controllers/PlayerController';
import { WorkService } from './app/services/WorkService';
import { InsuranceService } from './app/services/InsuranceService';
import { PlayerService } from './app/services/PlayerService';

const app = express();
const port = 3001;

// Enable CORS for all frontend requests
app.use(cors({
  origin: '*', // Allow all origins in development
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Initialize services
const workService = new WorkService();
const insuranceService = new InsuranceService();
const playerService = new PlayerService(workService, insuranceService);

// Initialize controllers
const playerController = new PlayerController(playerService);

// Setup routes
app.use('/api', playerController.getRouter());

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/api`);
});