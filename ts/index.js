"use strict";
// Sistemas de pizzaria completo
// importar as bibliotecas necessárias
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs"); // módulo para manipular arquivos
var path = require("path"); // módulo para lidar com caminhos de arquivos
var rs = require("readline-sync"); // módulo para receber entradas do usuário
// inicia o bloco de código para armazenagem e modificação de dados no arquivo dataLog
// define o caminho para onde as entradas serão armazenadas
var inputCliente = path.resolve(__dirname, "bancoDeDadosCliente.csv");
// cabeçalho do CSV
var headerCliente = "nomeCliente; cpfCliente; phoneNumber; email\n";
// função para ler os arquivos do banco de dados cliente "caso exista"
function readBancoDeDadosCliente() {
    try {
        var dadosCliente = fs.readFileSync(inputCliente, "utf-8");
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
//função utilizada na customer_registration ===2
function verificarClientesCadastrados() {
    var cpf = rs.question("Digite o cpf do cliente cadastrado: ").trim();
    //Lê todos os clientes cadastrados
    var clientes = readBancoDeDadosCliente();
    //Verifica se algum cpf bate com a lista cadastrada
    return clientes.find(function (c) { return c.cpfCliente === cpf; });
}
function requestNewInputOfCliente() {
    console.log("\n--- Cadastro de Cliente ---");
    var correctInputCliente = 0;
    while (correctInputCliente === 0) {
        var nomeCliente = rs.question("Digite o nome do cliente: ").trim().toUpperCase();
        var cpfCliente = rs.question("Digite o CPF do cliente: ").trim();
        var phoneNumber = rs.question("Digite o telefone do cliente: ").trim();
        var email = rs.question("Digite o email do cliente: ").trim();
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
var clienteLogado;
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
    if (customer_registration === 2) {
        //Puxa a função
        var clienteEncontrado = verificarClientesCadastrados();
        if (clienteEncontrado) {
            console.log("O cliente ".concat(clienteEncontrado.nomeCliente, " possui cadastro!\n"));
            clienteLogado = clienteEncontrado;
            break;
        }
        else {
            console.log("O cliente não possui cadastro ainda\n");
            requestNewInputOfCliente();
        }
    }
}
var clienteNome = clienteLogado === null || clienteLogado === void 0 ? void 0 : clienteLogado.nomeCliente;
var clienteCpf = clienteLogado === null || clienteLogado === void 0 ? void 0 : clienteLogado.cpfCliente;
////////////////////////////////////////////////////////////////////////
//Sistema de pedidos da pizzaria
//Criar o csv do arquivo de pedidos
var inputData = path.resolve(__dirname, "Pedidos.csv");
// garante que o arquivo existe e tem o cabeçalho
if (!fs.existsSync(inputData) || fs.readFileSync(inputData, "utf-8").trim() === "") {
    fs.writeFileSync(inputData, "utf-8");
}
//Criar o menu inicial
console.log("----------- PIZZARIA HENRIQUE --------------");
console.log("\nO que deseja fazer?");
console.log("1 -) Realizar um pedido");
console.log("2 -) Recibo");
console.log("3 -) Sair");
var escolhaInc = rs.question("\nDigite o numero do que deseja fazer: "); //Criar constante da ação a fazer
if (escolhaInc === '1') { //Se escolher realizar um pedido ira realizar esse codigo:
    //Criar o cardapio
    var cardapio = [
        {
            nome: '1 ---- Margherita ----',
            ingredientes: ['molho de tomate', 'muçarela', 'manjericão'], //Cardapio contendo nome do sabor, os ingredientes e o preço de cada pizza
            preco: 25.00,
        },
        {
            nome: '2 ---- Calabresa ----',
            ingredientes: ['molho de tomate', 'muçarela', 'calabresa', 'cebola'],
            preco: 30.00,
        },
        {
            nome: '3 ---- Quatro Queijos ----',
            ingredientes: ['muçarela', 'gorgonzola', 'parmesão', 'provolone'],
            preco: 35.00,
        },
        {
            nome: '4 ---- Portuguesa ----',
            ingredientes: ['molho de tomate', 'muçarela', 'presunto', 'ovo', 'cebola', 'azeitona'],
            preco: 35.00,
        },
        {
            nome: '5 ---- Frango com caputiry ----',
            ingredientes: ['molho de tomate', 'muçarela', 'frango desfiado', 'catupiry'],
            preco: 45.00,
        },
        {
            nome: '6 ---- Pepperoni ----',
            ingredientes: ['molho de tomate', 'muçarela', 'pepperoni'],
            preco: 45.00,
        },
        {
            nome: '7 ---- Vegetariana ----',
            ingredientes: ['molho de tomate', 'muçarela', 'pimentão', 'cebola', 'tomate', 'azeitona', 'milho'],
            preco: 45.00,
        },
        {
            nome: '8 ---- Bacon com Cheddar ----',
            ingredientes: ['molho de tomate', 'muçarela', 'bacon', 'cheddar'],
            preco: 45.00,
        }
    ];
    //Criar um cardapio para as bebidas disponiveis
    var bebidas = [
        { nome: '1 - Coca-Cola 500ml', preco: 5.00, tamanho: '500ml' },
        { nome: '2 - Guaraná 500ml', preco: 4.50, tamanho: '500ml' },
        { nome: '3 - Soda 500ml', preco: 4.00, tamanho: '300ml' },
        { nome: '4 - Pepsi 500ml', preco: 4.00, tamanho: '300ml' },
        { nome: '5 - Suco Natural 300ml', preco: 6.00, tamanho: '300ml' },
        { nome: '6 - Agua 300ml', preco: 2.00, tamanho: '300ml' },
    ];
    var sobremesas = [
        { nome: '1 - Pizza Doce de Chocolate - Pequena', preco: 35.00, },
        { nome: '2 - Pizza Doce de Banana Nevada - Pequena', preco: 34.50, },
        { nome: '3 - Torta Holandesa - Pequena', preco: 14.00, },
    ];
    //Criar a variavel que vai receber o pedido
    var pedidoPizzas = [];
    var pedidoBebidas = [];
    var pedidoSobremesa = [];
    //Deixar true para rodar o loop até que o usuario finalize o pedido e caso tenha alguma informação errada ele retornar do principio
    var continuar = true;
    //Loop
    while (continuar) {
        //Mostrar cardápio de pizzas
        console.log("\n--- Pizzas Disponíveis ---");
        cardapio.forEach(function (pizza) {
            console.log("".concat(pizza.nome, " - R$ ").concat(pizza.preco.toFixed(2), " \n - Ingredientes: ").concat(pizza.ingredientes.join(', '), "\n"));
        });
        //Escolha da pizza
        var escolhaStr = rs.question("\nDigite o numero da pizza que deseja: ");
        var escolhaNum = Number(escolhaStr); //Transofrmar o que foi digitado em numero
        if (isNaN(escolhaNum) || escolhaNum < 1 || escolhaNum > cardapio.length) { //Verificar se é um numero para continuar o looping
            console.log("\nEscolha inválida! Tente novamente.");
            continue;
        }
        var tamanhoEscolhido = rs.question("\nEscolha o tamanho (pequena, media, grande): ").toLowerCase(); //Definir o tamanho que vai ser pedido
        if (!['pequena', 'media', 'grande'].includes(tamanhoEscolhido)) {
            console.log("\nTamanho inválido! Tente novamente."); //Verifica se está correto para seguir com o codigo
            continue;
        }
        var pizzaBase = cardapio[escolhaNum - 1]; //Enumerar as escolhas de pizzas do cliente
        //Cria pizza com tamanho selecionado, preço fixo (sem ajuste)
        var pizzaEscolhida = __assign(__assign({}, pizzaBase), { tamanho: tamanhoEscolhido });
        pedidoPizzas.push(pizzaEscolhida);
        console.log("Pizza \"".concat(pizzaEscolhida.nome, "\" - ").concat(pizzaEscolhida.tamanho, " adicionada ao pedido."));
        //Perguntar se quer continuar adicionando pizzas
        var querContinuar = rs.question("\nQuer adicionar outra pizza? (s/n) ");
        if (querContinuar.toLowerCase() !== 's') {
            continuar = false;
        }
    }
    var querBebida = rs.question("\nDeseja adicionar bebidas ao seu pedido? (s/n): ").toLowerCase(); //Perguntar se quer bebida
    if (querBebida === 's') {
        var continuarBebidas = true; //Caso seja sim a respota ele continua
        while (continuarBebidas) {
            console.log("\n--- Bebidas Disponíveis ---");
            bebidas.forEach(function (bebida) {
                console.log("".concat(bebida.nome, " - R$ ").concat(bebida.preco.toFixed(2)));
            });
            var escolhaBebidaStr = rs.question("Digite o numero da bebida que deseja: ");
            var escolhaBebidaNum = Number(escolhaBebidaStr); //Transformar em numero
            if (isNaN(escolhaBebidaNum) || escolhaBebidaNum < 1 || escolhaBebidaNum > bebidas.length) { //Verificar se é um numero
                console.log("Escolha inválida de bebida! Tente novamente.");
            }
            else {
                var bebidaEscolhida = bebidas[escolhaBebidaNum - 1];
                pedidoBebidas.push(bebidaEscolhida);
                console.log("Bebida \"".concat(bebidaEscolhida.nome, "\" adicionada ao pedido."));
            }
            var maisBebidas = rs.question("Deseja adicionar outra bebida? (s/n): ");
            if (maisBebidas.toLowerCase() !== 's') {
                continuarBebidas = false;
            }
        }
    }
    //Sobremesa
    var querSobremesa = rs.question("\nDeseja adicionar alguma sobremesa ao seu pedido? (s/n): ").toLowerCase(); //Perguntar se quer adicionar uma sobremesa ao pedido
    if (querSobremesa === 's') {
        var continuarSobremesa = true; //Caso seja sim a respota ele continua
        while (continuarSobremesa) {
            console.log("\n--- Sobremesas Disponíveis ---");
            sobremesas.forEach(function (sobremesas) {
                console.log("".concat(sobremesas.nome, " - R$ ").concat(sobremesas.preco.toFixed(2)));
            });
            var escolhaSobremesaStr = rs.question("Digite o numero da sobremesa que deseja: ");
            var escolhaSobremesaNum = Number(escolhaSobremesaStr); //Transformar em numero
            if (isNaN(escolhaSobremesaNum) || escolhaSobremesaNum < 1 || escolhaSobremesaNum > sobremesas.length) { //Verificar se é um numero
                console.log("Escolha inválida de sobremesa! Tente novamente.");
            }
            else {
                var SobremesaEscolhida = bebidas[escolhaSobremesaNum - 1];
                pedidoSobremesa.push(SobremesaEscolhida);
                console.log("Sobremesa \"".concat(SobremesaEscolhida.nome, "\" adicionada ao pedido."));
            }
            var maisSobremesa = rs.question("Deseja adicionar outra sobremesa? (s/n): ");
            if (maisSobremesa.toLowerCase() !== 's') {
                continuarSobremesa = false;
            }
        }
    }
    //Fim do pedido
    console.log("\nSeu pedido final:");
    var total_1 = 0;
    if (pedidoPizzas.length > 0) { //Mostrar as pizzas escolhidas
        console.log("\nPizzas:");
        pedidoPizzas.forEach(function (pizza, i) {
            console.log("".concat(i + 1, " -) ").concat(pizza.nome, " - ").concat(pizza.tamanho, " - R$ ").concat(pizza.preco.toFixed(2)));
            total_1 += pizza.preco;
        });
    }
    if (pedidoBebidas.length > 0) { //Mostrar as bebidas escolhidas
        console.log("\nBebidas:");
        pedidoBebidas.forEach(function (bebida, i) {
            console.log("".concat(i + 1, " -) ").concat(bebida.nome, " - R$ ").concat(bebida.preco.toFixed(2)));
            total_1 += bebida.preco;
        });
    }
    if (pedidoSobremesa.length > 0) { //Mostrar as sobremesas escolhidas
        console.log("\nSobremesa:");
        pedidoSobremesa.forEach(function (sobremesa, i) {
            console.log("".concat(i + 1, " -) ").concat(sobremesa.nome, " - R$ ").concat(sobremesa.preco.toFixed(2)));
            total_1 += sobremesa.preco;
        });
    }
    console.log("\nTotal a pagar: R$ ".concat(total_1.toFixed(2))); //Mostrar quanto devera ser pago
    //Forma de pagamento
    console.log("\nFormas de pagamento disponíveis:");
    var formasPagamento = [
        { nome: "Dinheiro" },
        { nome: "Cartão de Débito" },
        { nome: "Cartão de Crédito" },
        { nome: "Pix" }
    ];
    formasPagamento.forEach(function (fp, i) {
        console.log("".concat(i + 1, " - ").concat(fp.nome));
    });
    var escolhaPagamentoStr = rs.question("\nDigite o numero da forma de pagamento: ");
    var escolhaPagamentoNum = Number(escolhaPagamentoStr);
    var formaPagamentoEscolhida = void 0;
    if (isNaN(escolhaPagamentoNum) ||
        escolhaPagamentoNum < 1 ||
        escolhaPagamentoNum > formasPagamento.length) {
        console.log("Forma de pagamento inválida! Será registrado como 'Não informado'.");
        formaPagamentoEscolhida = { nome: "Não informado" };
    }
    else {
        formaPagamentoEscolhida = formasPagamento[escolhaPagamentoNum - 1];
    }
    console.log("\nForma de pagamento escolhida: ".concat(formaPagamentoEscolhida.nome));
    //Salvar no csv
    if (pedidoPizzas.length > 0) { //caso o pedido tenha sido feito ele salva
        var pizzasStr = pedidoPizzas.map(function (p) { return "".concat(p.nome, " (").concat(p.tamanho, ")"); }).join(", ");
        var agora = new Date();
        var data_hora = agora.toLocaleString("pt-BR");
        var precoTotal = total_1;
        var linha = "Cliente ".concat((_a = clienteLogado === null || clienteLogado === void 0 ? void 0 : clienteLogado.nomeCliente) !== null && _a !== void 0 ? _a : "N/A", " do CPF: ;").concat((_b = clienteLogado === null || clienteLogado === void 0 ? void 0 : clienteLogado.cpfCliente) !== null && _b !== void 0 ? _b : "N/A", "\nPediu ").concat(pizzasStr, " \u00E0s ").concat(data_hora, " e pagou R$").concat(precoTotal, " no ").concat(formaPagamentoEscolhida.nome, "\n");
        fs.appendFileSync(inputData, linha);
    }
    if (pedidoBebidas.length > 0) { //salvar as bebidas da mesma maneira
        var bebidasStr = pedidoBebidas.map(function (b) { return "".concat(b.nome, " (").concat(b.tamanho, ")"); }).join(", ");
        var linha = "Bebida(s) inclusa(s): ".concat(bebidasStr, "\n");
        fs.appendFileSync(inputData, linha, "utf-8");
        if (pedidoSobremesa.length > 0) { //salvar as sobremesas da mesma maneira
            var sobremesaStr = pedidoSobremesa.map(function (s) { return "".concat(s.nome); }).join(", ");
            var linha_1 = "Sobremesa(s) inclusa(s) ".concat(sobremesaStr, "\n");
            fs.appendFileSync(inputData, linha_1, "utf-8");
        }
    }
}
////////////////////////////////////////////////////////////////////////////
// Caminho do CSV
var pedidosPath = path.join(__dirname, "Pedidos.csv");
function gerarRecibo(pedidos) {
    if (pedidos.length === 0) {
        console.log("Nenhum pedido encontrado para esse cliente.");
        return;
    }
    console.log("\n=== RECIBO ===");
    var nome = pedidos[0].cliente_nome;
    var cpf = pedidos[0].cliente_cpf;
    console.log("Cliente: ".concat(nome, " (CPF: ").concat(cpf, ")"));
    var total = 0;
    pedidos.forEach(function (p, i) {
        var preco = parseFloat(p.preco);
        var qtd = parseInt(p.quantidade);
        var subtotal = preco * qtd;
        total += subtotal;
        console.log("".concat(i + 1, ". ").concat(p.produto, "  x").concat(p.quantidade, "  R$ ").concat(subtotal.toFixed(2)));
    });
    console.log("----------------------------");
    console.log("Total: R$ ".concat(total.toFixed(2), "\n"));
}
// Função que lê e filtra pedidos
function buscarPedidosPorCliente(identificador) {
    var _a;
    var conteudo = fs.readFileSync(pedidosPath, "utf-8");
    var linhas = conteudo.trim().split("\n");
    var cabecalho = ((_a = linhas.shift()) === null || _a === void 0 ? void 0 : _a.split(",")) || [];
    var pedidos = linhas
        .map(function (linha) {
        var valores = linha.split(",");
        var pedido = {};
        cabecalho.forEach(function (col, i) { return (pedido[col.trim()] = valores[i].trim()); });
        return pedido;
    })
        .filter(function (p) {
        var _a;
        return ((_a = p["cliente_nome"]) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === identificador.toLowerCase() ||
            p["cliente_cpf"] === identificador;
    });
    return pedidos;
}
if (escolhaInc === '2') {
    var entrada = rs.question("Digite o nome ou CPF do cliente para gerar o recibo: ");
    var pedidosCliente = buscarPedidosPorCliente(entrada);
    gerarRecibo(pedidosCliente);
}
