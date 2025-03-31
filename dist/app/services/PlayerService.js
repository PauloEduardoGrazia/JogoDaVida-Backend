"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerService = void 0;
class PlayerService {
    constructor(workService, insuranceService) {
        this._players = [];
        this.workService = workService;
        this.insuranceService = insuranceService;
    }
    addPlayer(player) {
        try {
            this._players.push(player);
            return `The player: ${player.name} has been added;`;
        }
        catch (error) {
            throw new Error(`Inner error. ${error}`);
        }
    }
    getPlayers() {
        return this._players;
    }
    getPlayerByName(name) {
        return this._players.find(p => p.name === name);
    }
    updatePlayerStatus(player, playerDto) {
        const updates = [
            { value: playerDto.workId, update: (value) => player.work = this.workService.findWorkById(value) },
            { value: playerDto.insuranceId, update: (value) => player.playerStatus.insurances.push(this.insuranceService.findInsuranceById(value)) }
        ];
        updates.forEach(({ value, update }) => { if (value != null)
            update(value); });
    }
    updatePlayerUniversity(player, playerDto) {
        if (playerDto.chooseUniversity != null) {
            player.playerStatus.chooseUniversity = playerDto.chooseUniversity;
        }
    }
    earnSalary(player) {
        if (player.work != null) {
            player.playerFinance.wallet += player.work.wageValue;
        }
    }
    payDebits(player) {
        if (player.playerFinance.wallet > player.playerFinance.debts) {
            player.playerFinance.wallet -= player.playerFinance.debts;
            player.playerFinance.debts = 0;
        }
        return `${player.name} debts now is $${player.playerFinance.debts}`;
    }
    buyHouse(player, propertyDto) {
        var _a;
        if (propertyDto.house != null) {
            if (player.playerFinance.wallet > ((_a = propertyDto.house) === null || _a === void 0 ? void 0 : _a.price)) {
                player.playerFinance.playerHouse = propertyDto.house;
            }
        }
    }
    buyCar(player, propertyDto) {
        var _a;
        if (propertyDto.car != null) {
            if (player.playerFinance.wallet > ((_a = propertyDto.car) === null || _a === void 0 ? void 0 : _a.price)) {
                player.playerFinance.playerCar = propertyDto.car;
            }
        }
    }
    getMarried(player) {
        if (!player.playerStatus.isMarried) {
            player.playerStatus.isMarried = true;
        }
        return `Player ${player.name} is now married.`;
    }
    haveChild(player) {
        player.playerStatus.childrenCount += 1;
        return `Player ${player.name} now has ${player.playerStatus.childrenCount} children.`;
    }
    spinWheel(player, diceValue) {
        // Se não for fornecido um valor, gera um número aleatório entre 1 e 6
        const num = diceValue || Math.floor(Math.random() * 6) + 1;
        // Atualiza a posição do jogador
        player.space += num;
        // Limita a posição máxima a 35 (última casa do tabuleiro)
        if (player.space > 35) {
            player.space = 35;
        }
        return `Player ${player.name} rolled a ${num} and moved to space ${player.space}.`;
    }
}
exports.PlayerService = PlayerService;
