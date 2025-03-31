"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerController = void 0;
const express_1 = require("express");
class PlayerController {
    constructor(playerService) {
        this.playerService = playerService;
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/players', this.addPlayer.bind(this));
        this.router.get('/players', this.getPlayers.bind(this));
        this.router.patch('/players/:name/status', this.updatePlayerStatus.bind(this));
        this.router.post('/players/:name/salary', this.earnSalary.bind(this));
        this.router.post('/players/:name/pay-debts', this.payDebits.bind(this));
        this.router.post('/players/:name/buy-house', this.buyHouse.bind(this));
        this.router.post('/players/:name/buy-car', this.buyCar.bind(this));
        this.router.post('/players/:name/marry', this.getMarried.bind(this));
        this.router.post('/players/:name/have-child', this.haveChild.bind(this));
        this.router.post('/players/:name/spin-wheel', this.spinWheel.bind(this));
    }
    getRouter() {
        return this.router;
    }
    addPlayer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const playerData = req.body;
                const result = this.playerService.addPlayer(playerData);
                res.status(201).json({
                    success: true,
                    message: result,
                    player: playerData
                });
            }
            catch (error) {
                res.status(400).json({
                    success: false,
                    message: error instanceof Error ? error.message : 'Failed to add player.'
                });
            }
        });
    }
    getPlayers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const players = this.playerService.getPlayers();
                res.status(200).json({
                    success: true,
                    players
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Failed to get players.'
                });
            }
        });
    }
    updatePlayerStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.params;
                const updateData = req.body;
                const player = this.playerService.getPlayerByName(name);
                if (!player) {
                    res.status(404).json({
                        success: false,
                        message: 'Player not found.'
                    });
                    return;
                }
                this.playerService.updatePlayerStatus(player, updateData);
                this.playerService.updatePlayerUniversity(player, updateData);
                res.status(200).json({
                    success: true,
                    message: 'Player updated successfully.',
                    player
                });
            }
            catch (error) {
                res.status(400).json({
                    success: false,
                    message: error instanceof Error ? error.message : 'Failed to update player.'
                });
            }
        });
    }
    earnSalary(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.params;
                const player = this.playerService.getPlayerByName(name);
                if (!player) {
                    res.status(404).json({
                        success: false,
                        message: 'Player not found.'
                    });
                    return;
                }
                this.playerService.earnSalary(player);
                res.status(200).json({
                    success: true,
                    message: 'Player salary was paid.',
                    newValueInPlayerWallet: player.playerFinance.wallet
                });
            }
            catch (error) {
                res.status(400).json({
                    success: false,
                    message: error instanceof Error ? error.message : 'Failed to pay player.'
                });
            }
        });
    }
    payDebits(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.params;
                const player = this.playerService.getPlayerByName(name);
                if (!player) {
                    res.status(404).json({
                        success: false,
                        message: 'Player not found.'
                    });
                    return;
                }
                this.playerService.payDebits(player);
                res.status(200).json({
                    success: true,
                    message: 'Player debits was paid.',
                    newValueInPlayerWallet: player.playerFinance.wallet
                });
            }
            catch (error) {
                res.status(400).json({
                    success: false,
                    message: error instanceof Error ? error.message : 'Failed to pay player.'
                });
            }
        });
    }
    buyHouse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.params;
                const buyHouseData = req.body;
                const player = this.playerService.getPlayerByName(name);
                if (!player) {
                    res.status(404).json({
                        success: false,
                        message: 'Player not found.'
                    });
                    return;
                }
                this.playerService.buyHouse(player, buyHouseData);
                res.status(200).json({
                    success: true,
                    message: 'Player have a new house.',
                    player
                });
            }
            catch (error) {
                res.status(400).json({
                    success: false,
                    message: error instanceof Error ? error.message : 'Failed to acquire the house.'
                });
            }
        });
    }
    buyCar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.params;
                const buyCarData = req.body;
                const player = this.playerService.getPlayerByName(name);
                if (!player) {
                    res.status(404).json({
                        success: false,
                        message: 'Player not found.'
                    });
                    return;
                }
                this.playerService.buyCar(player, buyCarData);
                res.status(200).json({
                    success: true,
                    message: 'Player have a new car.',
                    player
                });
            }
            catch (error) {
                res.status(400).json({
                    success: false,
                    message: error instanceof Error ? error.message : 'Failed to acquire the car.'
                });
            }
        });
    }
    getMarried(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.params;
                const player = this.playerService.getPlayerByName(name);
                if (!player) {
                    res.status(404).json({
                        success: false,
                        message: 'Player not found.'
                    });
                    return;
                }
                this.playerService.getMarried(player);
                res.status(200).json({
                    success: true,
                    message: 'Player is now married.',
                    player
                });
            }
            catch (error) {
                res.status(400).json({
                    success: false,
                    message: error instanceof Error ? error.message : 'Failed to marry player.'
                });
            }
        });
    }
    haveChild(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.params;
                const player = this.playerService.getPlayerByName(name);
                if (!player) {
                    res.status(404).json({
                        success: false,
                        message: 'Player not found.'
                    });
                    return;
                }
                this.playerService.haveChild(player);
                res.status(200).json({
                    success: true,
                    message: 'Player have a new child.',
                    player
                });
            }
            catch (error) {
                res.status(400).json({
                    success: false,
                    message: error instanceof Error ? error.message : 'Failed to have a child.'
                });
            }
        });
    }
    spinWheel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.params;
                const { diceValue } = req.body;
                const player = this.playerService.getPlayerByName(name);
                if (!player) {
                    res.status(404).json({
                        success: false,
                        message: 'Player not found.'
                    });
                    return;
                }
                const result = this.playerService.spinWheel(player, diceValue);
                const spacesMoved = diceValue || parseInt(result.match(/\d+/)[0]);
                res.status(200).json({
                    success: true,
                    message: result,
                    player: player,
                    spacesMoved,
                    newPosition: player.space
                });
            }
            catch (error) {
                res.status(400).json({
                    success: false,
                    message: error instanceof Error ? error.message : 'Failed to spin wheel.'
                });
            }
        });
    }
}
exports.PlayerController = PlayerController;
