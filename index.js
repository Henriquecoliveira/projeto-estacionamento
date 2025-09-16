"use strict";
// importar as bibliotecas necessárias
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs"); // módulo para manipular arquivos
var path = require("path"); // módulo para lidar com caminhos de arquivos
var rs = require("readline-sync"); // módulo para receber entradas do usuário
// inicia o bloco de código para armazenagem e modificação de dados no arquivo dataLog
// define o caminho para onde as entradas serão armazenadas
var inputData = path.resolve(__dirname, "dataLog.csv");
// cabeçalho do CSV
var header = "nomeDono;cpfDono;placa;cor;modelo\n";
// função para ler os arquivos do dataLog "caso exista"
function readDataLog() {
    try {
        var dados = fs.readFileSync(inputData, "utf-8");
        // se o arquivo estiver vazio, retorna uma lista vazia
        if (!dados.trim())
            return [];
        // divide o conteúdo por linhas e transforma em objetos Dados
        return dados.split("\n").map(function (linha) {
            var _a = linha.split(";"), nomeDono = _a[0], cpfDono = _a[1], placa = _a[2], cor = _a[3], modelo = _a[4];
            return {
                nomeDono: nomeDono === null || nomeDono === void 0 ? void 0 : nomeDono.trim(),
                cpfDono: cpfDono === null || cpfDono === void 0 ? void 0 : cpfDono.trim(),
                placa: placa === null || placa === void 0 ? void 0 : placa.trim(),
                cor: cor === null || cor === void 0 ? void 0 : cor.trim(),
                modelo: modelo === null || modelo === void 0 ? void 0 : modelo.trim(),
            };
        });
    }
    catch (_a) {
        // se o arquivo não existir, também retorna uma lista vazia
        return [];
    }
}
// inicia o bloco de código para funções e criação de objetos
// função para salvar uma nova entrada no arquivo
// para a entrada de novos dados no arquivo dataLog.csv
function newInput(veiculo) {
    var linha = "".concat(veiculo.nomeDono, ";").concat(veiculo.cpfDono, ";").concat(veiculo.placa, ";").concat(veiculo.cor, ";").concat(veiculo.modelo, "\n");
    fs.appendFileSync(inputData, linha, "utf-8");
}
// Garante que o arquivo CSV tenha o cabeçalho se ele não existir ou estiver vazio
if (!fs.existsSync(inputData) || fs.readFileSync(inputData, 'utf-8').trim() === '') {
    fs.writeFileSync(inputData, header, "utf-8");
}
// Entrada de veículo
function requestNewInputOfVehicle() {
    console.log("\n--- Cadastro de Veículo ---");
    var correctInput = 0;
    while (correctInput === 0) {
        var nomeDono = rs.question("Digite o nome do dono do veículo: ").trim().toUpperCase();
        var cpfDono = rs.question("Digite o CPF do dono do veículo (apenas números): ").trim();
        var placa = rs.question("Digite a placa do veículo: ").trim().toUpperCase();
        var cor = rs.question("Digite a cor do veículo: ").trim().toUpperCase();
        var modelo = rs.question("Digite o modelo do veículo: \n").trim().toUpperCase();
        // Cria um novo objeto Veiculo com as entradas do usuário
        var newVehicle = {
            nomeDono: nomeDono,
            cpfDono: cpfDono,
            placa: placa,
            cor: cor,
            modelo: modelo
        };
        // Chama a função newInput para salvar o novo veículo no CSV
        newInput(newVehicle);
        console.log("Veículo cadastrado com sucesso!");
        break;
        var correctInput_1 = 1;
    }
}
// Encerrando o bloco de código para armazenagem e modificação de dados no arquivo dataLog
// Encerrando o bloco de código para funções e criação de objetos
// Exemplo de como chamar a função para solicitar entrada
// requestNewInputOfVehicle();
// Interface do usuário
var userChoice;
while (userChoice !== 9) {
    console.log("Sistema de gerenciamento de estacionamento\n");
    console.log("1 - Cadastrar entrada de veículo");
    console.log("2 - Registrar saída de veículo");
    console.log("3 - Relatório");
    console.log("9 - Desligar programa");
    userChoice = parseInt(rs.question("O que deseja fazer?")); // = Pede uma entrada ao usuário
    //userChoice === 1
    if (userChoice === 1) {
        requestNewInputOfVehicle();
        continue;
    }
}
// Você pode opcionalmente ler e imprimir os dados para verificar
console.log("\n--- Dados atuais no CSV ---");
console.log(readDataLog());
