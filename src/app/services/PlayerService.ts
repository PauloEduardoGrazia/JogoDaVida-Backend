import { BuyPropertyDto } from "../models/dtos/BuyPropertyDTO";
import { UpdatePlayerDto } from "../models/dtos/UpdatePlayerDTO";
import { Player } from "../models/player/Player";
import { InsuranceService } from "./InsuranceService";
import { WorkService } from "./WorkService";

export class PlayerService {
    private readonly _players: Player[] = [];
    private readonly workService: WorkService;
    private readonly insuranceService: InsuranceService

    constructor(workService: WorkService, insuranceService: InsuranceService) {
        this.workService = workService;
        this.insuranceService = insuranceService;
    }

    addPlayer(player: Player): string {
        try {
            this._players.push(player);
            return `The player: ${player.name} has been added;`;
        } catch (error) {
            throw new Error(`Inner error. ${error}`);
        }
    }

    getPlayers() {
        return this._players;
    }

    getPlayerByName(name: string) {
        return this._players.find(p => p.name === name);
    }

    updatePlayerStatus(player: Player, playerDto: UpdatePlayerDto): void {
        const updates = [
            { value: playerDto.workId, update: (value: string) => player.work = this.workService.findWorkById(value) },
            { value: playerDto.insuranceId, update: (value: string) => player.playerStatus.insurances.push(this.insuranceService.findInsuranceById(value)) }
        ];

        updates.forEach(({ value, update }) => { if (value != null) update(value) });
        
        // Atualiza estado civil se fornecido
        if (playerDto.isMarried !== undefined) {
            player.playerStatus.isMarried = playerDto.isMarried;
        }
        
        // Atualiza número de filhos se fornecido
        if (playerDto.childrenCount !== undefined) {
            player.playerStatus.childrenCount = playerDto.childrenCount;
        }
    }

    updatePlayerUniversity(player: Player, playerDto: UpdatePlayerDto): void {
        if (playerDto.chooseUniversity != null) {
            player.playerStatus.chooseUniversity = playerDto.chooseUniversity;
        }
    }

    earnSalary(player: Player): string {
        if (player.work != null) {
            player.playerFinance.wallet += player.work.wageValue;
            return `O jogador ${player.name} recebeu seu salário de $ ${player.work.wageValue.toLocaleString()}.`;
        }
        // Se o jogador não tiver trabalho, recebe um auxílio desemprego de $ 3.500
        player.playerFinance.wallet += 3500;
        return `O jogador ${player.name} está desempregado, mas recebeu auxílio de $ 3.500.`;
    }

    payDebits(player: Player): string {
        if (player.playerFinance.wallet > player.playerFinance.debts) {
            player.playerFinance.wallet -= player.playerFinance.debts;
            player.playerFinance.debts = 0;
        }
        return `${player.name} debts now is $${player.playerFinance.debts}`;
    }

    buyHouse(player: Player, propertyDto: BuyPropertyDto) {
        if (propertyDto.house != null) {
            if (player.playerFinance.wallet > propertyDto.house?.price) {
                player.playerFinance.playerHouse = propertyDto.house;
            }
        }
    }

    buyCar(player: Player, propertyDto: BuyPropertyDto): void {
        if (propertyDto.car != null) {
            if (player.playerFinance.wallet > propertyDto.car?.price) {
                player.playerFinance.playerCar = propertyDto.car;
            }
        }
    }

    getMarried(player: Player): string {
        if (!player.playerStatus.isMarried) {
            player.playerStatus.isMarried = true;
        }
        return `Player ${player.name} is now married.`;
    }

    haveChild(player: Player): string {
        player.playerStatus.childrenCount += 1;
        return `Player ${player.name} now has ${player.playerStatus.childrenCount} children.`
    }

    spinWheel(player: Player, diceValue?: number): string {
        // Se não for fornecido um valor, gera um número aleatório entre 1 e 6
        const num = diceValue || Math.floor(Math.random() * 6) + 1;
        
        // Atualiza a posição do jogador normalmente
        player.space += num;
        
        // Limita a posição máxima a 99 (última casa do tabuleiro com 100 casas)
        if (player.space > 99) {
            player.space = 99;
        }
        
        return `Player ${player.name} rolled a ${num} and moved to space ${player.space}.`;
    }

    resetPlayers(): void {
        // Limpa o array de jogadores
        this._players.length = 0;
    }

}