"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// importar as bibliotecas necessárias
const fs = __importStar(require("fs")); // módulo para manipular arquivos
const path = __importStar(require("path")); // módulo para lidar com caminhos de arquivos
const rs = __importStar(require("readline-sync")); // módulo para receber entradas do usuário
//define o caminho para onde as entradas serão armazenadas
const inputData = path.resolve(__dirname, "dataLog.csv");
//cabeçalho do CSV
const header = "nomeDono;cpfDono;placa;cor;modelo\n";
//função para ler os arquivos do agendamento "caso exista"
function readDataLog() {
    try {
        const dados = fs.readFileSync(inputData, "utf-8");
        //se o arquivo estiver vazio, retorna uma lista vazia
        if (!dados.trim())
            return [];
        // divide o conteúdo por linhas e transforma em objetos Agendamento
        return dados.split("\n").map((linha) => {
            const [nomeDono, cpfDono, placa, cor, modelo] = linha.split(";");
            return {
                nomeDono: nomeDono?.trim(),
                cpfDono: cpfDono?.trim(),
                placa: placa?.trim(),
                cor: cor?.trim(),
                modelo: modelo?.trim(),
            };
        });
    }
    catch {
        // se o arquivo não existir, também retorna uma lista vazia
        return [];
    }
}
// função para salvar uma nova entrada no arquivo
function newInput(veiculo) {
    const linha = `${veiculo.nomeDono};${veiculo.cpfDono};${veiculo.placa};${veiculo.cor};${veiculo.modelo}\n`;
    fs.appendFileSync(inputData, linha, "utf-8");
}
// Garante que o arquivo CSV tenha o cabeçalho se ele não existir ou estiver vazio
if (!fs.existsSync(inputData) || fs.readFileSync(inputData, 'utf-8').trim() === '') {
    fs.writeFileSync(inputData, header, "utf-8");
}
// **NOVA PARTE DO CÓDIGO AQUI**
function solicitarEntradaVeiculo() {
    console.log("\n--- Cadastro de Veículo ---");
    // 1. Solicita o nome do dono
    const nomeDono = rs.question("Digite o nome do dono do veículo: ");
    // 2. Solicita o CPF do dono
    const cpfDono = rs.question("Digite o CPF do dono do veículo (apenas números): ");
    // 3. Solicita a placa do veículo
    const placa = rs.question("Digite a placa do veículo: ");
    // 4. Solicita a cor do veículo
    const cor = rs.question("Digite a cor do veículo: ");
    // 5. Solicita o modelo do veículo
    const modelo = rs.question("Digite o modelo do veículo: ");
    // 6. Cria um novo objeto Veiculo com as entradas do usuário
    const novoVeiculo = {
        nomeDono,
        cpfDono,
        placa,
        cor,
        modelo
    };
    // 7. Chama a função newInput para salvar o novo veículo no CSV
    newInput(novoVeiculo);
    console.log("Veículo cadastrado com sucesso!");
}
// Exemplo de como chamar a função para solicitar entrada
solicitarEntradaVeiculo();
// Você pode opcionalmente ler e imprimir os dados para verificar
console.log("\n--- Dados atuais no CSV ---");
console.log(readDataLog());
