"use strict";
// Sistemas de pizzaria completo
// importar as bibliotecas necessárias
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs"); // módulo para manipular arquivos
var path = require("path"); // módulo para lidar com caminhos de arquivos
var rs = require("readline-sync"); // módulo para receber entradas do usuário
// inicia o bloco de código para armazenagem e modificação de dados no arquivo dataLog
// define o caminho para onde as entradas serão armazenadas
var inputData = path.resolve(__dirname, "dataLog.csv");
// cabeçalho do CSV
var header = "nomeCliente; cpfCliente; pizzas; bebida; sobremesa; acompanhamento; endereco; data_hora; mes; formaDePagamento\n";
// função para ler os arquivos do dataLog "caso exista"
function readDataLog() {
    try {
        var dados = fs.readFileSync(inputData, "utf-8");
        // se o arquivo estiver vazio, retorna uma lista vazia
        if (!dados.trim())
            return [];
        // divide o conteúdo por linhas e transforma em objetos Dados
        return dados.split("\n").map(function (linha) {
            var _a = linha.split(";"), nomeCliente = _a[0], cpfCliente = _a[1], pizzas = _a[2], bebida = _a[3], sobremesa = _a[4], acompanhamento = _a[5], endereco = _a[6], data_hora = _a[7], mes = _a[8], formaDePagamento = _a[9];
            return {
                nomeCliente: nomeCliente === null || nomeCliente === void 0 ? void 0 : nomeCliente.trim(),
                cpfCliente: cpfCliente === null || cpfCliente === void 0 ? void 0 : cpfCliente.trim(),
                pizzas: pizzas === null || pizzas === void 0 ? void 0 : pizzas.trim(),
                bebida: bebida === null || bebida === void 0 ? void 0 : bebida.trim(),
                sobremesa: sobremesa === null || sobremesa === void 0 ? void 0 : sobremesa.trim(),
                acompanhamento: acompanhamento === null || acompanhamento === void 0 ? void 0 : acompanhamento.trim(),
                endereco: endereco === null || endereco === void 0 ? void 0 : endereco.trim(),
                data_hora: data_hora === null || data_hora === void 0 ? void 0 : data_hora.trim(),
                mes: mes === null || mes === void 0 ? void 0 : mes.trim(),
                formaDePagamento: formaDePagamento === null || formaDePagamento === void 0 ? void 0 : formaDePagamento.trim(),
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
function newInput(Pedido) {
    var linha = "".concat(Pedido.nomeCliente, ";").concat(Pedido.cpfCliente, ";").concat(Pedido.pizzas, ";").concat(Pedido.bebida, ";").concat(Pedido.sobremesa, ";").concat(Pedido.acompanhamento, ";").concat(Pedido.endereco, ";").concat(Pedido.data_hora, ";").concat(Pedido.mes, ";").concat(Pedido.formaDePagamento, "\n");
    fs.appendFileSync(inputData, linha, "utf-8");
}
// Garante que o arquivo CSV tenha o cabeçalho se ele não existir ou estiver vazio
if (!fs.existsSync(inputData) || fs.readFileSync(inputData, 'utf-8').trim() === '') {
    fs.writeFileSync(inputData, header, "utf-8");
}
// Entrada de pedidos
function requestNewInputOfPizza() {
    console.log("\n--- Cadastro de Pedidos ---");
    var correctInput = 0;
    while (correctInput === 0) {
        var nomeCliente = rs.question("Digite o nome do cliente: ").trim().toUpperCase();
        var cpfCliente = rs.question("Digite o CPF do cliente: ").trim();
        var pizzas = rs.question("Digite os sabores da pizza: ").trim().toUpperCase();
        var bebida = rs.question("Digite as bebidas: ").trim().toUpperCase();
        var sobremesa = rs.question("Digite a sobremesa: ").trim().toUpperCase();
        var acompanhamento = rs.question("Digite o acompanhamento: ").trim().toUpperCase();
        var endereco = rs.question("Digite o endereço do cliente: ").trim().toUpperCase();
        var data_hora = rs.question("Digite a data e hgora do pedido"); //inserir função para puxar data e hora do sistema
        var mes = rs.question("Digite o mês do pedido"); //inserir função para puxar o mes do sistema
        var formaDePagamento = rs.question("Digite a forma de pagamento: ").trim().toUpperCase();
        // Cria um novo objeto Pedido com as entradas do usuário
        var newRequest = {
            nomeCliente: nomeCliente,
            cpfCliente: cpfCliente,
            pizzas: pizzas,
            bebida: bebida,
            sobremesa: sobremesa,
            acompanhamento: acompanhamento,
            endereco: endereco,
            data_hora: data_hora,
            mes: mes,
            formaDePagamento: formaDePagamento,
        };
        // Chama a função newInput para salvar o novo veículo no CSV
        newInput(newRequest);
        console.log("Veículo cadastrado com sucesso!");
        break;
        var correctInput_1 = 1;
    }
}
// inicia o bloco de código para armazenagem e modificação de dados no arquivo dataLog
// define o caminho para onde as entradas serão armazenadas
var inputCliente = path.resolve(__dirname, "bancoDeDadosCliente.csv");
// cabeçalho do CSV
var headerCliente = "nomeCliente; cpfCliente; phoneNumber; email\n";
// função para ler os arquivos do banco de dados cliente "caso exista"
function readBancoDeDadosCliente() {
    try {
        var dadosCliente = fs.readFileSync(inputData, "utf-8");
        // se o arquivo estiver vazio, retorna uma lista vazia
        if (!dadosCliente.trim())
            return [];
        // divide o conteúdo por linhas e transforma em objetos Dados
        return dadosCliente.split("\n").map(function (linha) {
            var _a = linha.split(";"), nomeCliente = _a[0], cpfCliente = _a[1], phoneNumber = _a[2], email = _a[3];
            return {
                nomeCliente: nomeCliente === null || nomeCliente === void 0 ? void 0 : nomeCliente.trim(),
                cpfCliente: cpfCliente === null || cpfCliente === void 0 ? void 0 : cpfCliente.trim(),
                phoneNumber: phoneNumber === null || phoneNumber === void 0 ? void 0 : phoneNumber.trim(),
                email: email === null || email === void 0 ? void 0 : email.trim(),
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
// para a entrada de novos dados no arquivo bancoDeDadosCliente.csv
function newInputCliente(Cliente) {
    var linha = "".concat(Cliente.nomeCliente, ";").concat(Cliente.cpfCliente, ";").concat(Cliente.phoneNumber, ";").concat(Cliente.email, "\n");
    fs.appendFileSync(inputCliente, linha, "utf-8");
}
// Garante que o arquivo CSV tenha o cabeçalho se ele não existir ou estiver vazio
if (!fs.existsSync(inputCliente) || fs.readFileSync(inputCliente, 'utf-8').trim() === '') {
    fs.writeFileSync(inputCliente, headerCliente, "utf-8");
}
// Entrada de Clientes
function requestNewInputOfCliente() {
    console.log("\n--- Cadastro de Cliente ---");
    var correctInputCliente = 0;
    while (correctInputCliente === 0) {
        var nomeCliente = rs.question("Digite o nome do cliente: ").trim().toUpperCase();
        var cpfCliente = rs.question("Digite o CPF do cliente: ").trim();
        var phoneNumber = rs.question("Digite o telefone do cliente").trim();
        var email = rs.question("Digite o email do cliente").trim();
        // Cria um novo objeto Cliente com as entradas do usuário
        var newRequestCliente = {
            nomeCliente: nomeCliente,
            cpfCliente: cpfCliente,
            phoneNumber: phoneNumber,
            email: email,
        };
        // Chama a função newInput para salvar o novo cliente no CSV
        newInputCliente(newRequestCliente);
        console.log("Cliente cadastrado com sucesso!");
        break;
        var correctInput = 1;
    }
}
// Interface de cadastro de cliente
var customer_registration;
while (customer_registration !== 9) {
    console.log("\nSistema de cadastro de cliente\n");
    console.log("1 - Cadastrar cliente");
    console.log("2 - O cliente é cadastrado");
    console.log("9 - Desligar programa");
    customer_registration = parseInt(rs.question("Qual opção você deseja? "));
    //customer_registration === 1
    if (customer_registration === 1) {
        requestNewInputOfCliente();
        continue;
    }
    //customer_registration === 2
    if (customer_registration === 1) { }
}
////////////////////////////////////////////////////////////////////////
// Interface de pedidos
var userChoice;
while (userChoice !== 9) {
    console.log("\nSistema de gerenciamento de pizzaria\n");
    console.log("1 - Cadastrar pedido");
    console.log("3 - Relatório");
    console.log("9 - Desligar programa");
    userChoice = parseInt(rs.question("O que deseja fazer?")); // = Pede uma entrada ao usuário
    //userChoice === 1
    if (userChoice === 1) {
        requestNewInputOfPizza();
        continue;
    }
}
/*
// Você pode opcionalmente ler e imprimir os dados para verificar
console.log("\n--- Dados atuais no CSV ---");
console.log(readDataLog());
*/ 
