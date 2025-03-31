"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const PlayerController_1 = require("./app/controllers/PlayerController");
const WorkService_1 = require("./app/services/WorkService");
const InsuranceService_1 = require("./app/services/InsuranceService");
const PlayerService_1 = require("./app/services/PlayerService");
const app = (0, express_1.default)();
const port = 3001;
// Enable CORS for all frontend requests
app.use((0, cors_1.default)({
    origin: '*', // Allow all origins in development
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express_1.default.json());
// Initialize services
const workService = new WorkService_1.WorkService();
const insuranceService = new InsuranceService_1.InsuranceService();
const playerService = new PlayerService_1.PlayerService(workService, insuranceService);
// Initialize controllers
const playerController = new PlayerController_1.PlayerController(playerService);
// Setup routes
app.use('/api', playerController.getRouter());
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/api`);
});
