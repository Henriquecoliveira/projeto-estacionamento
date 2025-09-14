"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// importar as bibliotecas necessárias
var fs = require("fs"); // módulo para manipular arquivos
var path = require("path"); // módulo para lidar com caminhos de arquivos
var rs = require("readline-sync"); // módulo para receber entradas do usuário
//define o caminho para onde as entradas serão armazenadas
var inputData = path.resolve(__dirname, "dataLog.csv");
//cabeçalho do CSV
var header = "nomeDono;cpfDono;placa;cor;modelo\n";
//função para ler os arquivos do agendamento "caso exista"
function readDataLog() {
    try {
        var dados = fs.readFileSync(inputData, "utf-8");
        //se o arquivo estiver vazio, retorna uma lista vazia
        if (!dados.trim())
            return [];
        // divide o conteúdo por linhas e transforma em objetos Agendamento
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
// função para salvar uma nova entrada no arquivo
function newInput(veiculo) {
    var linha = "".concat(veiculo.nomeDono, ";").concat(veiculo.cpfDono, ";").concat(veiculo.placa, ";").concat(veiculo.cor, ";").concat(veiculo.modelo, "\n");
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
    var nomeDono = rs.question("Digite o nome do dono do veículo: ");
    // 2. Solicita o CPF do dono
    var cpfDono = rs.question("Digite o CPF do dono do veículo (apenas números): ");
    // 3. Solicita a placa do veículo
    var placa = rs.question("Digite a placa do veículo: ");
    // 4. Solicita a cor do veículo
    var cor = rs.question("Digite a cor do veículo: ");
    // 5. Solicita o modelo do veículo
    var modelo = rs.question("Digite o modelo do veículo: ");
    // 6. Cria um novo objeto Veiculo com as entradas do usuário
    var novoVeiculo = {
        nomeDono: nomeDono,
        cpfDono: cpfDono,
        placa: placa,
        cor: cor,
        modelo: modelo
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
