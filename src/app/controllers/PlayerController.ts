import { Request, Response, Router } from 'express';
import { PlayerService } from "../services/PlayerService";
import { Player } from '../models/player/Player';
import { UpdatePlayerDto } from '../models/dtos/UpdatePlayerDTO';
import { BuyPropertyDto } from '../models/dtos/BuyPropertyDTO';

export class PlayerController {
    private readonly router: Router;
    private readonly playerService: PlayerService;

    constructor(playerService: PlayerService) {
        this.playerService = playerService;
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
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
        
        // Novo endpoint para receber pagamento (casa de pagamento)
        this.router.post('/players/:name/receive-payment', this.receivePayment.bind(this));
        
        // Rota para resetar todos os jogadores
        this.router.post('/players/reset', this.resetPlayers.bind(this));
    }

    public getRouter(): Router {
        return this.router;
    }

    private async addPlayer(req: Request, res: Response) {
        try {
            const playerData: Player = req.body;
            const result = this.playerService.addPlayer(playerData);
            res.status(201).json({
                success: true,
                message: result,
                player: playerData
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to add player.'
            });
        }
    }

    private async getPlayers(req: Request, res: Response) {
        try {
            const players = this.playerService.getPlayers();
            res.status(200).json({
                success: true,
                players
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to get players.'
            });
        }
    }

    private async updatePlayerStatus(req: Request, res: Response) {
        try {
            const { name } = req.params;
            const updateData: UpdatePlayerDto = req.body;
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
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to update player.'

            });
        }
    }

    private async earnSalary(req: Request, res: Response) {
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

            const resultMessage = this.playerService.earnSalary(player);

            res.status(200).json({
                success: true,
                message: resultMessage,
                newValueInPlayerWallet: player.playerFinance.wallet
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to pay player.'
            });
        }
    }

    private async payDebits(req: Request, res: Response) {
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
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to pay player.'
            });
        }
    }

    private async buyHouse(req: Request, res: Response) {
        try {
            const { name } = req.params;
            const buyHouseData: BuyPropertyDto = req.body;
            const player = this.playerService.getPlayerByName(name);

            if (!player) {
                res.status(404).json({
                    success: false,
                    message: 'Player not found.'
                });
                return;
            }

            this.playerService.buyHouse(player, buyHouseData)

            res.status(200).json({
                success: true,
                message: 'Player have a new house.',
                player
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to acquire the house.'
            });
        }
    }

    private async buyCar(req: Request, res: Response) {
        try {
            const { name } = req.params;
            const buyCarData: BuyPropertyDto = req.body;
            const player = this.playerService.getPlayerByName(name);

            if (!player) {
                res.status(404).json({
                    success: false,
                    message: 'Player not found.'
                });
                return;
            }

            this.playerService.buyCar(player, buyCarData)

            res.status(200).json({
                success: true,
                message: 'Player have a new car.',
                player
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to acquire the car.'
            });
        }

    }

    private async getMarried(req: Request, res: Response) {
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
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to marry player.'
            });
        }
    }

    private async haveChild(req: Request, res: Response) {
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
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to have a child.'
            });
        }
    }

    private async spinWheel(req: Request, res: Response) {
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
            
            // Guardar a posição antiga para verificar se passou por casas especiais
            const oldPosition = player.space;
            
            // Verifica se o jogador passou pela casa de pagamento
            const passedPayday = this.checkIfPassedPayday(oldPosition, oldPosition + diceValue);
            
            // Verifica se o jogador passou pela casa de casamento (casa 9)
            const passedMarriage = this.checkIfPassedMarriage(oldPosition, oldPosition + diceValue);
            
            // Atualiza a posição do jogador
            const moveResult = this.playerService.spinWheel(player, diceValue);
            
            // Obter todos os jogadores para verificações globais
            const allPlayers = this.playerService.getPlayers();
            
            // Determina o tipo de casa em que o jogador caiu
            const space = player.space;
            let spaceType: string = "empty";
            let additionalMessage: string = "";
            
            // Definir hasFinished como qualquer tipo para suprimir o erro
            (player as any).hasFinished = false;
            
            if (space === 0) {
                spaceType = "inicio";
            } else if (space === 1) {
                spaceType = "rodovia1";
                // Cobrar $2.000 pelo transporte público
                player.playerFinance.wallet -= 2000;
                additionalMessage = "Você pagou $2.000 de transporte público.";
            } else if (space === 2) {
                spaceType = "rodovia2";
                // Cobrar $5.000 pelo acidente de carro
                player.playerFinance.wallet -= 5000;
                additionalMessage = "Você bateu o carro e pagou $5.000 de conserto.";
            } else if (space === 3) {
                spaceType = "carreira1";
                // Definir salário de Escritório: $15.000
                if (player.work) {
                    // Verificar se o jogador já tem um trabalho com salário diferente de zero (já tem profissão)
                    if (player.work.wageValue === 0 || player.work.name === "Desempregado") {
                        player.work.wageValue = 15000;
                        player.work.name = "Auxiliar de Escritório";
                        additionalMessage = "Você foi contratado como Auxiliar de Escritório com salário de $ 15.000.";
                    } else {
                        additionalMessage = `Você já trabalha como ${player.work.name} e não pode mudar de profissão.`;
                    }
                }
            } else if (space === 4) {
                spaceType = "carreira2";
                // Definir salário de Universitário: $13.000
                if (player.work) {
                    // Verificar se o jogador já tem um trabalho com salário diferente de zero (já tem profissão)
                    if (player.work.wageValue === 0 || player.work.name === "Desempregado") {
                        player.work.wageValue = 13000;
                        player.work.name = "Universitário";
                        additionalMessage = "Você foi contratado como Universitário com salário de $ 13.000.";
                    } else {
                        additionalMessage = `Você já trabalha como ${player.work.name} e não pode mudar de profissão.`;
                    }
                }
            } else if (space === 5) {
                spaceType = "carreira3";
                // Definir salário de Médico: $50.000
                if (player.work) {
                    // Verificar se o jogador já tem um trabalho com salário diferente de zero (já tem profissão)
                    if (player.work.wageValue === 0 || player.work.name === "Desempregado") {
                        player.work.wageValue = 50000;
                        player.work.name = "Médico";
                        additionalMessage = "Você foi contratado como Médico com salário de $ 50.000.";
                    } else {
                        additionalMessage = `Você já trabalha como ${player.work.name} e não pode mudar de profissão.`;
                    }
                }
            } else if (space === 6) {
                spaceType = "carreira4";
                // Definir salário de Advogado: $35.000
                if (player.work) {
                    // Verificar se o jogador já tem um trabalho com salário diferente de zero (já tem profissão)
                    if (player.work.wageValue === 0 || player.work.name === "Desempregado") {
                        player.work.wageValue = 35000;
                        player.work.name = "Advogado";
                        additionalMessage = "Você foi contratado como Advogado com salário de $ 35.000.";
                    } else {
                        additionalMessage = `Você já trabalha como ${player.work.name} e não pode mudar de profissão.`;
                    }
                }
            } else if (space === 7) {
                spaceType = "carreira5";
                // Definir salário de Professor: $20.000
                if (player.work) {
                    // Verificar se o jogador já tem um trabalho com salário diferente de zero (já tem profissão)
                    if (player.work.wageValue === 0 || player.work.name === "Desempregado") {
                        player.work.wageValue = 20000;
                        player.work.name = "Professor";
                        additionalMessage = "Você foi contratado como Professor com salário de $ 20.000.";
                    } else {
                        additionalMessage = `Você já trabalha como ${player.work.name} e não pode mudar de profissão.`;
                    }
                }
            } else if (space === 99) {
                spaceType = "juizo";
                
                // Marcar o jogador como tendo finalizado o jogo
                (player as any).hasFinished = true;
                
                // Verificar se é o primeiro jogador a chegar no Juízo
                const anyoneAtJuizo = allPlayers.some(p => p.name !== player.name && p.space === 99);
                
                // Verificar se todos os jogadores terminaram
                const allFinished = allPlayers.every(p => (p as any).hasFinished || p.space === 99);
                
                if (!anyoneAtJuizo) {
                    // Primeiro jogador a chegar no juízo recebe bônus
                    player.playerFinance.wallet += 240000;
                    additionalMessage = "Você é o primeiro a chegar no Dia do Juízo! Recebeu um bônus de $240.000.";
                } else {
                    additionalMessage = "Você chegou no Dia do Juízo!";
                }
                
                // Calcular bônus para cada carro e filho
                const numCars = 1; // Simplificação: considera pelo menos 1 carro
                let bonusCars = numCars * 100000; // Alterado de 50000 para 100000
                player.playerFinance.wallet += bonusCars;
                additionalMessage += ` Recebeu $${bonusCars.toLocaleString()} pelo seu carro.`;
                
                let bonusChildren = 0;
                if (player.playerStatus && player.playerStatus.childrenCount) {
                    bonusChildren = player.playerStatus.childrenCount * 25000;
                    player.playerFinance.wallet += bonusChildren;
                    if (bonusChildren > 0) {
                        additionalMessage += ` Recebeu $${bonusChildren.toLocaleString()} pelos seus ${player.playerStatus.childrenCount} filhos.`;
                    }
                }
                
                // Bônus por casas
                let bonusHouses = 0;
                if (player.properties && player.properties.houses) {
                    bonusHouses = player.properties.houses.length * 200000; // 200.000 por casa
                    player.playerFinance.wallet += bonusHouses;
                    if (bonusHouses > 0) {
                        additionalMessage += ` Recebeu $${bonusHouses.toLocaleString()} pelas suas ${player.properties.houses.length} casas.`;
                    }
                }
                
                // Calcular o vencedor
                const playerScores = allPlayers.map(p => ({
                    name: p.name,
                    wallet: p.playerFinance.wallet,
                    space: p.space
                })).sort((a, b) => b.wallet - a.wallet);
                
                // Adicionar o ranking atual
                additionalMessage += "\n\nClassificação atual:";
                playerScores.forEach((p, index) => {
                    additionalMessage += `\n${index+1}º lugar: ${p.name} - $${p.wallet.toLocaleString()}`;
                });
                
                // Se todos os jogadores terminaram, declarar o vencedor final
                if (allFinished) {
                    const winner = playerScores[0];
                    additionalMessage += `\n\nO JOGO TERMINOU! ${winner.name} é o vencedor oficial com $${winner.wallet.toLocaleString()}!`;
                } else {
                    additionalMessage += "\n\nAguardando os outros jogadores chegarem ao Dia do Juízo...";
                }
            } else if (space % 8 === 0) {
                spaceType = "payday";
            } else if (space === 10) {
                spaceType = "evento1"; // Curso EAD
                player.playerFinance.wallet -= 5000;
                additionalMessage = "Curso EAD. Pague $5.000.";
            } else if (space === 12) {
                spaceType = "evento2"; // Achou urânio
                player.playerFinance.wallet += 24000;
                additionalMessage = "Achou urânio. Receba $24.000.";
            } else if (space === 15) {
                spaceType = "evento3"; // Abrir negócio
                player.playerFinance.wallet -= 30000;
                additionalMessage = "Você vai abrir um negócio. Pague $30.000.";
            } else if (space === 29) {
                spaceType = "evento100"; // Processo judicial
                player.playerFinance.wallet += 120000;
                additionalMessage = "Ganhou um processo judicial. Receba $120.000 em indenização.";
            } else if (space === 18) {
                spaceType = "evento4"; // Herança
                player.playerFinance.wallet += 200000;
                additionalMessage = "HERANÇA! Receba $200.000.";
            } else if (space === 21) {
                spaceType = "evento5"; // Premiação
                player.playerFinance.wallet += 25000;
                additionalMessage = "Ganhou prêmio em concurso. Receba $25.000.";
            } else if (space === 25) {
                spaceType = "evento6"; // Bateu o carro
                player.playerFinance.wallet -= 12000;
                additionalMessage = "Bateu o carro. Pague $12.000.";
            } else if (space === 30) {
                spaceType = "evento7"; // Alugou apartamento
                player.playerFinance.wallet -= 5000;
                additionalMessage = "Alugou um apartamento. Pague $5.000.";
            } else if (space === 34) {
                spaceType = "evento101"; // Golpe online
                player.playerFinance.wallet -= 30000;
                additionalMessage = "Perdeu dinheiro em um golpe online. Pague $30.000";
            } else if (space === 39) {
                spaceType = "evento102"; // Artigo científico
                player.playerFinance.wallet += 130000;
                additionalMessage = "Escreveu um artigo científico inovador. Receba $130.000 de prêmios acadêmicos.";   
            } else if (space === 41) {
                spaceType = "evento103"; // Brinde
                player.playerFinance.wallet += 70000;
                additionalMessage = "Ganhou um brinde valioso em um sorteio. Receba $70.000.";   
            } else if (space === 51) {
                spaceType = "evento104"; // Investimentos
                player.playerFinance.wallet -= 80000;
                additionalMessage = "Seus investimentos falharam. Pague $80.000 em prejuízos.";   
            } else if (space === 59) {
                spaceType = "evento105"; // Celular
                player.playerFinance.wallet -= 5000;
                additionalMessage = "Perdeu seu celular e teve que comprar outro. Pague $5.000."; 
            } else if (space === 61) {
                spaceType = "evento106"; // Planta Rara
                player.playerFinance.wallet += 120000;
                additionalMessage = "Descobriu uma nova espécie de planta rara. Receba $120.000";
            } else if (space === 69) {
                spaceType = "evento107"; // Passagem avião
                player.playerFinance.wallet -= 3000;
                additionalMessage = "Comprou uma passagem de avião errada e teve que trocar. Pague $3.000";   
            } else if (space === 71) {
                spaceType = "evento108"; // Campanha publicitária   
                player.playerFinance.wallet += 75000;
                additionalMessage = "Foi contratado para uma campanha publicitária. Receba $75.000";        
            } else if (space === 77) {
                spaceType = "evento109"; // Drone
                player.playerFinance.wallet -= 10000;
                additionalMessage = "Seu drone caiu na casa do vizinho e você teve que pagar pelos danos. Pague $10.000"; 
            } else if (space === 78) {
                spaceType = "evento110"; // Ouro
                player.playerFinance.wallet += 500000;
                additionalMessage = "Descobriu ouro no quintal da sua casa. Receba $500.000";  
            } else if (space === 83) {
                spaceType = "evento111"; // Reformas
                player.playerFinance.wallet -= 40000;
                additionalMessage = "Gastou dinheiro em reformas desnecessárias. Pague $40.000";  
            } else if (space === 86) {
                spaceType = "evento112"; // Incêndio
                player.playerFinance.wallet -= 25000;
                additionalMessage = "Teve um incêndio na cozinha. Pague $25.000 para consertar os danos.";  
            } else if (space === 89) {
                spaceType = "evento113"; // Investimento
                player.playerFinance.wallet += 300000;
                additionalMessage = "Investiu em um mercado emergente e obteve sucesso. Receba $300.000";
            } else if (space === 95) {
                spaceType = "evento114"; // Viagem Internacional
                player.playerFinance.wallet -= 20000;
                additionalMessage = "Fez uma viagem internacional e teve custos inesperados. Pague $20.000";    
            } else if (space === 97) {
                spaceType = "evento115"; // Documentário
                player.playerFinance.wallet += 50000;
                additionalMessage = "Apareceu em um documentário famoso. Receba $50.000 pelos direitos de imagem.";    
            } else if (space === 98) {
                spaceType = "evento116"; // Recuperação de dados
                player.playerFinance.wallet -= 15000;
                additionalMessage = "Teve um problema com seu computador e perdeu arquivos importantes. Pague $15.000 para recuperação de dados";                
            } else if (space === 40) {
                spaceType = "evento9"; // Ganhou na loteria
                player.playerFinance.wallet += 96000;
                additionalMessage = "Ganhou na loteria. Receba $96.000.";
            } else if (space === 45) {
                spaceType = "evento10"; // Ajuda do Tio Paulo
                player.playerFinance.wallet += 20000;
                additionalMessage = "Ajuda do Tio Paulo. Receba $20.000.";
            } else if (space === 50) {
                spaceType = "evento11"; // Titia deixou 50 gatos
                player.playerFinance.wallet -= 20000;
                additionalMessage = "Titia deixou 50 gatos. Pague $20.000 pelos cuidados.";
            } else if (space === 55) {
                spaceType = "evento12"; // Perdeu aposta
                player.playerFinance.wallet -= 50000;
                additionalMessage = "Perdeu aposta. Pague $50.000.";
            } else if (space === 60) {
                spaceType = "evento13"; // Expedição ao Polo Norte
                player.playerFinance.wallet -= 100000;
                additionalMessage = "Expedição ao Polo Norte. Pague $100.000.";
            } else if (space === 62) {
                spaceType = "evento14"; // Assaltado
                player.playerFinance.wallet -= 10000;
                additionalMessage = "Você foi assaltado. Pague $10.000.";
            } else if (space === 65) {
                spaceType = "evento15"; // Cruzeiro pelo mundo
                player.playerFinance.wallet -= 20000;
                additionalMessage = "Fez um cruzeiro pelo mundo. Pague $20.000.";
            } else if (space === 68) {
                spaceType = "evento16"; // Casa nova
                player.playerFinance.wallet -= 140000;
                additionalMessage = "Comprou uma casa nova. Pague $140.000.";
            } else if (space === 70) {
                spaceType = "evento17"; // Lago poluído
                player.playerFinance.wallet -= 240000;
                additionalMessage = "Recupere um lago poluído. Pague $240.000.";
            } else if (space === 73) {
                spaceType = "evento18"; // Monte Everest
                player.playerFinance.wallet += 120000;
                additionalMessage = "Escalou o Monte Everest! Receba $120.000.";
            } else if (space === 76) {
                spaceType = "evento19"; // Iate
                player.playerFinance.wallet -= 80000;
                additionalMessage = "Comprou um iate. Pague $80.000.";
            } else if (space === 80) {
                spaceType = "evento20"; // Doação ONG
                player.playerFinance.wallet -= 10000;
                additionalMessage = "Doe $10.000 para uma ONG.";
            } else if (space === 84) {
                spaceType = "evento21"; // Dentadura
                player.playerFinance.wallet -= 2000;
                additionalMessage = "Você precisa de dentadura. Pague $2.000.";
            } else if (space === 88) {
                spaceType = "evento22"; // Pinturas famosas
                player.playerFinance.wallet += 480000;
                additionalMessage = "Achou pinturas famosas. Receba $480.000.";
            } else if (space === 92) {
                spaceType = "evento23"; // Invenção
                player.playerFinance.wallet += 50000;
                additionalMessage = "Invenção funcionou! Receba $50.000.";
            } else if (space === 13) {
                spaceType = "evento24"; // Comprou edifícios de escritórios
                player.playerFinance.wallet -= 120000;
                additionalMessage = "Comprou edificios de escritorios. Pague $120.000.";
            } else if (space === 23) {
                spaceType = "evento25"; // Ampliou os negócios
                player.playerFinance.wallet -= 120000;
                additionalMessage = "Ampliou os negócios. Pague $120.000.";
            } else if (space === 33) {
                spaceType = "evento26"; // Seu tio foi preso
                player.playerFinance.wallet -= 5000;
                additionalMessage = "Seu tio foi preso. Pague $5.000 de fiança.";
            } else if (space === 43) {
                spaceType = "evento27"; // Encanamento estourou
                player.playerFinance.wallet -= 20000;
                additionalMessage = "Encanamento estourou. Pague $20.000 pelo conserto.";
            } else if (space === 53) {
                spaceType = "evento28"; // Os negócios estão ótimos
                player.playerFinance.wallet += 100000;
                additionalMessage = "Os negócios estão ótimos. Receba $100.000.";
            } else if (space === 63) {
                spaceType = "evento29"; // Bateu o carro sem seguro
                player.playerFinance.wallet -= 16000;
                additionalMessage = "Bateu o carro! Pague $16.000 se não tiver seguro.";
            } else if (space === 72) {
                spaceType = "evento30"; // Ganhou enduro nas montanhas
                player.playerFinance.wallet += 280000;
                additionalMessage = "Ganhou enduro nas montanhas. Receba $280.000.";
            } else if (space === 82) {
                spaceType = "evento31"; // Descobriu a Atlântida
                player.playerFinance.wallet += 12000;
                additionalMessage = "Descobriu a Atlântida enquanto fazia pesca submarina. Receba $12.000.";
            } else if (space === 93) {
                spaceType = "evento32"; // Sua casa pegou fogo
                player.playerFinance.wallet -= 60000;
                additionalMessage = "Sua casa pegou fogo! Pague $60.000.";
            } else if (space === 14) {
                spaceType = "evento33"; // Viagem de negócios
                player.playerFinance.wallet -= 3000;
                additionalMessage = "Viagem de negócios. Pague $3.000.";
            } else if (space === 17) {
                spaceType = "evento34"; // Diamante falso
                player.playerFinance.wallet -= 20000;
                additionalMessage = "Comprou um diamante falso. Pague $20.000.";
            } else if (space === 22) {
                spaceType = "evento35"; // Cruzeiro pelo mundo
                player.playerFinance.wallet -= 70000;
                additionalMessage = "Cruzeiro pelo mundo. Pague $70.000.";
            } else if (space === 26) {
                spaceType = "evento36"; // Moedas raras
                player.playerFinance.wallet -= 40000;
                additionalMessage = "Comprou moedas raras. Pague $40.000.";
            } else if (space === 31) {
                spaceType = "evento37"; // Excursão à Europa
                player.playerFinance.wallet -= 20000;
                additionalMessage = "Excursão à Europa. Pague $20.000.";
            } else if (space === 38) {
                spaceType = "evento38"; // Achou petróleo
                player.playerFinance.wallet += 480000;
                additionalMessage = "Achou petróleo! Receba $480.000 se tiver ações.";
            } else if (space === 44) {
                spaceType = "evento39"; // Assaltado
                player.playerFinance.wallet -= 70000;
                additionalMessage = "Assaltado. Pague $70.000.";
            } else if (space === 49) {
                spaceType = "evento40"; // Receba dívidas antigas
                player.playerFinance.wallet += 3000;
                additionalMessage = "Receba $3.000 de dívidas antigas.";
            } else if (space === 57) {
                spaceType = "evento41"; // Guarda roupa
                player.playerFinance.wallet -= 10000;
                additionalMessage = "Renovou todo o guarda roupa. Pague $10.000.";
            } else if (space === 66) {
                spaceType = "evento42"; // Enchente na casa
                player.playerFinance.wallet -= 100000;
                additionalMessage = "Enchente na sua casa. Pague $100.000.";
            } else if (space === 74) {
                spaceType = "evento43"; // Vendeu fazenda
                player.playerFinance.wallet += 200000;
                additionalMessage = "Vendeu a fazenda de gado. Receba $200.000.";
            } else if (space === 85) {
                spaceType = "evento44"; // Deve impostos
                player.playerFinance.wallet -= 50000;
                additionalMessage = "Você deve impostos. Pague $50.000.";
            } else if (space === 9) { // Primeira casa verde - especial de casamento
                spaceType = "casamento";
                // Sempre define o jogador como casado
                player.playerStatus.isMarried = true;
                additionalMessage = "Dia do Casamento! Você agora está casado.";
            } else if (space % 9 === 0) { // Outras casas verdes a cada 9 casas
                spaceType = "life";
                // Verificar quantos filhos o jogador já tem
                const filhosAtuais = player.playerStatus.childrenCount || 0;
                
                // Assumimos que o jogador está casado (isMarried = true)
                player.playerStatus.isMarried = true;
                
                // Sempre adiciona apenas um filho (sem duplicação)
                player.playerStatus.childrenCount = filhosAtuais + 1;
                additionalMessage = "Seu filho nasceu!";
            } else if (space === 11) {
                spaceType = "evento45"; // Prêmio Nobel
                player.playerFinance.wallet += 120000;
                additionalMessage = "Ganhou Prêmio Nobel! Receba $ 120.000";
            } else if (space === 19) {
                spaceType = "evento46"; // Aumento de Impostos
                player.playerFinance.wallet -= 30000;
                additionalMessage = "O governo aumentou os impostos sobre imóveis! Pague $30.000";
            } else if (space === 20) {
                spaceType = "evento47"; // Descoberta Espacial
                player.playerFinance.wallet += 150000;
                additionalMessage = "Encontrou um meteorito raro! Receba $150.000";
            } else if (space === 28) {
                spaceType = "evento48"; // Doença Rara
                player.playerFinance.wallet -= 30000;
                additionalMessage = "Pegou uma doença rara em uma viagem exótica. Pague $30.000 em despesas médicas.";
            } else if (space === 37) {
                spaceType = "evento49"; // Desastre Natural
                player.playerFinance.wallet -= 15000;
                additionalMessage = "Ficou preso em uma tempestade no deserto. Pague $15.000 por resgate e suprimentos.";
            } else if (space === 42) {
                spaceType = "evento50"; // Reforma Residencial
                player.playerFinance.wallet -= 35000;
                additionalMessage = "Teve que reformar o telhado da sua casa. Pague $35.000";
            } else if (space === 46) {
                spaceType = "evento51"; // Azar no Cassino
                player.playerFinance.wallet -= 50000;
                additionalMessage = "Apostou no cassino e perdeu! Pague $50.000";
            } else if (space === 47) {
                spaceType = "evento52"; // Infração de Trânsito
                player.playerFinance.wallet -= 8000;
                additionalMessage = "Foi multado por excesso de velocidade. Pague $8.000";
            } else if (space === 52) {
                spaceType = "evento53"; // Animal Exótico
                player.playerFinance.wallet -= 20000;
                additionalMessage = "Adotou um animal exótico! Pague $20.000 de cuidados.";
            } else if (space === 58 || space === 67 || space === 75 || space === 16 || space === 24 || space === 36) {
                // Oportunidades de casas
                if (space === 58) spaceType = "evento54"; // Casa na praia
                else if (space === 67) spaceType = "evento55"; // Apartamento
                else if (space === 75) spaceType = "evento56"; // Casa para reformar
                else if (space === 16) spaceType = "evento16"; // Casa nova
                else if (space === 24) spaceType = "evento24"; // Edifícios
                else if (space === 36) spaceType = "evento36"; // Moedas raras (não é imóvel)
                
                // Perguntar se quer comprar a casa
                additionalMessage = this.handlePropertyOpportunity(player, "house", space);
            } else if (space === 79 || space === 87 || space === 91) {
                // Oportunidades de carros
                if (space === 79) spaceType = "evento57"; // Carro elétrico
                else if (space === 87) spaceType = "evento58"; // Carro usado
                else if (space === 91) spaceType = "evento59"; // Carro de luxo
                
                // Perguntar se quer comprar o carro
                additionalMessage = this.handlePropertyOpportunity(player, "car", space);
            } else {
                spaceType = "empty";
            }
            
            // Se passou pela casa de casamento durante o movimento, atualiza o status
            if (passedMarriage && !player.playerStatus.isMarried) {
                player.playerStatus.isMarried = true;
                additionalMessage += " Você passou pela casa de Casamento e agora está casado!";
            } else if (passedMarriage) {
                // Se já estiver casado, apenas inclui uma mensagem simples
                additionalMessage += " Você passou pela casa de Casamento.";
            }
            
            // Retorna o resultado do movimento
            res.status(200).json({
                success: true,
                message: `${moveResult} ${additionalMessage}`,
                player,
                space: {
                    id: space,
                    type: spaceType
                },
                passedPayday,
                passedMarriage,
                gameState: {
                    playerFinished: (player as any).hasFinished || player.space === 99,
                    allPlayersFinished: allPlayers.every(p => (p as any).hasFinished || p.space === 99)
                }
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to spin wheel.'
            });
        }
    }

    // Método para verificar se o jogador passou pela casa de pagamento
    private checkIfPassedPayday(oldPosition: number, newPosition: number): boolean {
        // Se o jogador passou por uma posição divisível por 8, é uma casa de pagamento
        for (let pos = oldPosition + 1; pos <= newPosition; pos++) {
            if (pos % 8 === 0) {
                return true;
            }
        }
        return false;
    }

    // Método para verificar se o jogador passou pela casa de casamento
    private checkIfPassedMarriage(oldPosition: number, newPosition: number): boolean {
        // Se o jogador começou antes da casa 9 e terminou depois da casa 9, então passou por ela
        return (oldPosition < 9 && newPosition > 9) || (oldPosition === 9);
    }

    // Novo método para receber pagamento
    private async receivePayment(req: Request, res: Response) {
        try {
            const { name } = req.params;
            const { amount } = req.body;
            const player = this.playerService.getPlayerByName(name);

            if (!player) {
                res.status(404).json({
                    success: false,
                    message: 'Jogador não encontrado.'
                });
                return;
            }
            
            // Adicionar o valor à carteira do jogador
            player.playerFinance.wallet += amount;

            res.status(200).json({
                success: true,
                message: `O jogador ${player.name} recebeu $ ${amount.toLocaleString()}.`,
                player: player,
                newWalletValue: player.playerFinance.wallet
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Falha ao receber pagamento.'
            });
        }
    }

    private async resetPlayers(req: Request, res: Response) {
        try {
            // Chamando o método resetPlayers do serviço
            this.playerService.resetPlayers();
            
            res.status(200).json({
                success: true,
                message: 'All players have been reset.',
                players: []
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to reset players.'
            });
        }
    }

    // Método para lidar com oportunidades de compra
    private handlePropertyOpportunity(player: Player, type: 'house' | 'car', space: number): string {
        // Valores das propriedades baseados no espaço
        let price = 0;
        let propertyName = "";
        
        // Definir preço e nome com base no espaço
        if (type === 'house') {
            switch(space) {
                case 58: 
                    price = 250000; 
                    propertyName = "Casa na praia";
                    break;
                case 67: 
                    price = 180000; 
                    propertyName = "Apartamento no centro";
                    break;
                case 75: 
                    price = 120000; 
                    propertyName = "Casa para reformar";
                    break;
                case 16: 
                    price = 140000; 
                    propertyName = "Casa nova";
                    break;
                case 24: 
                    price = 120000; 
                    propertyName = "Edifícios de escritório";
                    break;
                case 36: 
                    price = 40000; 
                    propertyName = "Moedas raras";
                    break;
            }
        } else { // type === 'car'
            switch(space) {
                case 79: 
                    price = 60000; 
                    propertyName = "Carro elétrico";
                    break;
                case 87: 
                    price = 20000; 
                    propertyName = "Carro usado";
                    break;
                case 91: 
                    price = 150000; 
                    propertyName = "Carro de luxo blindado";
                    break;
            }
        }
        
        // Verificar se o jogador tem dinheiro suficiente
        if (player.playerFinance.wallet >= price) {
            // Deduzir o valor do dinheiro do jogador
            player.playerFinance.wallet -= price;
            
            // Inicializar arrays de propriedades se não existirem
            if (!player.properties) {
                player.properties = { houses: [], cars: [] };
            }
            
            // Adicionar a propriedade ao jogador
            if (type === 'house') {
                if (!player.properties.houses) {
                    player.properties.houses = [];
                }
                player.properties.houses.push(propertyName);
                return `Você comprou ${propertyName} por $ ${price.toLocaleString()}. Total de imóveis: ${player.properties.houses.length}`;
            } else {
                if (!player.properties.cars) {
                    player.properties.cars = [];
                }
                player.properties.cars.push(propertyName);
                return `Você comprou ${propertyName} por $ ${price.toLocaleString()}. Total de carros: ${player.properties.cars.length}`;
            }
        } else {
            // Se não tiver dinheiro suficiente
            return `Oportunidade: ${propertyName} está disponível por $ ${price.toLocaleString()}, mas você não tem dinheiro suficiente.`;
        }
    }

}