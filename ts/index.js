"use strict";
// Sistemas de pizzaria em typescript
// Biblíotecas necessárias para o funcionamento do sistema
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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs"); // módulo para manipular arquivos
var path = require("path"); // módulo para lidar com caminhos de arquivos
var rs = require("readline-sync"); // módulo para receber entradas do usuário
// ---------------------------- Armazenando em CSV, bancoDeDadosCliente ----------------------------
// define o caminho para onde as entradas serão armazenadas
var inputCliente = path.resolve(__dirname, "bancoDeDadosCliente.csv");
// cabeçalho do CSV
var headerCliente = "nomeCliente; cpfCliente; phoneNumber; endereco; numero_residencia\n";
// !! ------ função para ler os arquivos do banco de dados cliente "caso exista" ------ !!
function readBancoDeDadosCliente() {
    try {
        var dadosCliente = fs.readFileSync(inputCliente, "utf-8");
        // se o arquivo estiver vazio, retorna uma lista vazia
        if (!dadosCliente.trim())
            return [];
        // divide o conteúdo por linhas e transforma em objetos Dados
        return dadosCliente.split("\n").map(function (linha) {
            var _a = linha.split(";"), nomeCliente = _a[0], cpfCliente = _a[1], phoneNumber = _a[2], endereco = _a[3], numero_residencia = _a[4] //define cada objeto da linha
            ;
            return {
                nomeCliente: nomeCliente === null || nomeCliente === void 0 ? void 0 : nomeCliente.trim(),
                cpfCliente: cpfCliente === null || cpfCliente === void 0 ? void 0 : cpfCliente.trim(),
                phoneNumber: phoneNumber === null || phoneNumber === void 0 ? void 0 : phoneNumber.trim(),
                endereco: endereco === null || endereco === void 0 ? void 0 : endereco.trim(),
                numero_residencia: numero_residencia === null || numero_residencia === void 0 ? void 0 : numero_residencia.trim()
            };
        });
    }
    catch (_a) {
        // se o arquivo não existir, também retorna uma lista vazia
        return [];
    }
}
// !! ------ função para salvar uma nova linha no bancoDeDadosCliente.csv ------ !!
function newInputCliente(Cliente) {
    var linha = "".concat(Cliente.nomeCliente, ";").concat(Cliente.cpfCliente, ";").concat(Cliente.phoneNumber, ";").concat(Cliente.endereco, ";").concat(Cliente.numero_residencia, "\n");
    fs.appendFileSync(inputCliente, linha, "utf-8");
}
// Garante que o arquivo CSV tenha o cabeçalho se ele não existir ou estiver vazio
if (!fs.existsSync(inputCliente) || fs.readFileSync(inputCliente, 'utf-8').trim() === '') {
    fs.writeFileSync(inputCliente, headerCliente, "utf-8");
}
// ----------------------------  Entrada de Clientes ---------------------------- 
/*
 !! ------ função utilizada na customer_registration === 2 ------ !!

 "customer_registration === 2" é a condição que a constante tem que estar
para cadastrar novos clientes, essa parte do código aparece na linha === 147
*/
function verificarClientesCadastrados() {
    var cpf = rs.question("\nDigite o cpf do cliente cadastrado: ").trim();
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
        var endereco = rs.question("Digite o endereco do cliente: ").trim();
        var numero_residencia = rs.question("Digite o número da residencia: ").trim();
        // Cria um novo objeto Cliente com as entradas do usuário
        var newRequestCliente = {
            nomeCliente: nomeCliente,
            cpfCliente: cpfCliente,
            phoneNumber: phoneNumber,
            endereco: endereco,
            numero_residencia: numero_residencia
        };
        // Chama a função newInputCliente para salvar o novo cliente no CSV
        newInputCliente(newRequestCliente);
        console.log("\nCliente cadastrado com sucesso!");
        break;
        var correctInput = 1;
    }
}
// ---------------------------- Interface de cadastro de cliente ----------------------------
var customer_registration;
var clienteLogado;
while (customer_registration !== 9) {
    console.log("\n----------- Sistema de cadastro de cliente -----------\n");
    console.log("1 - Cadastrar cliente");
    console.log("2 - O cliente ja é cadastrado");
    console.log("9 - Desligar programa");
    customer_registration = parseInt(rs.question("\nQual opcao voce deseja realizar? "));
    // if customer_registration === 1
    if (customer_registration === 1) {
        requestNewInputOfCliente();
        continue;
    }
    // if customer_registration === 2
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
/////////////////////////////////////////////////////////////////////////////////////////////////////
//const clienteNome = clienteLogado?.nomeCliente; // guarda em outra constante o nome do cliente para facilitar seu uso no resto do código
//const clienteCpf = clienteLogado?.cpfCliente; // guarda em outra constante o cpf do cliente para facilitar seu uso no resto do código
//const clienteEndereco = clienteLogado?.endereco; // // guarda em outra constante o cpf do cliente para facilitar seu uso no resto do código
/////////////////////////////////////////////////////////////////////////////////////////////////////
// ---------------------------- Sistema de pedidos da pizzaria ----------------------------
// Menu inicial pós tela de cadastro do cliente
console.log("----------- PIZZARIA HENRIQUE --------------");
console.log("\nO que deseja fazer?");
console.log("1 -) Realizar um pedido");
console.log("2 -) Recibo");
console.log("3 -) Sair");
console.log("4 -) Relatório");
var escolhaInc = rs.question("\nDigite o numero do que deseja fazer: ");
// ---------------------------- Cardápio da pizzaria ----------------------------
/*
----------------------------------------------------------------------------------------------------------------
Bloco de código que compõe as funções, diretórios de armazenamento de dados, entradas e saídas da
escolhaInc === 1
----------------------------------------------------------------------------------------------------------------
*/
//Cria o csv do arquivo de pedidos
var inputData = path.resolve(__dirname, "Pedidos.csv");
//Garante que o arquivo existe e tem o cabeçalho
if (!fs.existsSync(inputData) || fs.readFileSync(inputData, "utf-8").trim() === "") {
    fs.writeFileSync(inputData, "cliente_nome;cliente_cpf;pizza;data_hora;precoTotal;formaDePagamento;endereco\n", "utf-8");
}
if (escolhaInc === '1') {
    //Cria um cardápio com os sabores de pizza
    var cardapio = [
        { numero_pizza: '1', nome: 'Margherita', ingredientes: ['molho de tomate', 'muçarela', 'manjericão'], preco: 25.00 },
        { numero_pizza: '2', nome: 'Calabresa', ingredientes: ['molho de tomate', 'muçarela', 'calabresa', 'cebola'], preco: 30.00 },
        { numero_pizza: '3', nome: 'Quatro Queijos', ingredientes: ['muçarela', 'gorgonzola', 'parmesão', 'provolone'], preco: 35.00 },
        { numero_pizza: '4', nome: 'Portuguesa', ingredientes: ['molho de tomate', 'muçarela', 'presunto', 'ovo', 'cebola', 'azeitona'], preco: 35.00 },
        { numero_pizza: '5', nome: 'Frango com Catupiry', ingredientes: ['molho de tomate', 'muçarela', 'frango desfiado', 'catupiry'], preco: 45.00 },
        { numero_pizza: '6', nome: 'Pepperoni', ingredientes: ['molho de tomate', 'muçarela', 'pepperoni'], preco: 45.00 },
        { numero_pizza: '7', nome: 'Vegetariana', ingredientes: ['molho de tomate', 'muçarela', 'pimentão', 'cebola', 'tomate', 'azeitona', 'milho'], preco: 45.00 },
        { numero_pizza: '8', nome: 'Bacon com Cheddar', ingredientes: ['molho de tomate', 'muçarela', 'bacon', 'cheddar'], preco: 45.00 }
    ];
    //Cria um cardapio para as bebidas disponiveis
    var bebidas = [
        { numero_bebida: '1', nome: 'Coca-Cola 500ml', preco: 5.00, tamanho: '500ml' },
        { numero_bebida: '2', nome: 'Guaraná 500ml', preco: 4.50, tamanho: '500ml' },
        { numero_bebida: '3', nome: 'Soda 500ml', preco: 4.00, tamanho: '300ml' },
        { numero_bebida: '4', nome: 'Pepsi 500ml', preco: 4.00, tamanho: '300ml' },
        { numero_bebida: '5', nome: 'Suco Natural 300ml', preco: 6.00, tamanho: '300ml' },
        { numero_bebida: '6', nome: 'Agua 300ml', preco: 2.00, tamanho: '300ml' },
    ];
    //Cria um cardapio para as sobremesas disponiveis
    var sobremesas = [
        { numero_sobremesa: '1', nome: 'Pizza Doce de Chocolate (Pequena)', preco: 35.00, },
        { numero_sobremesa: '2', nome: 'Pizza Doce de Banana Nevada (Pequena)', preco: 34.50, },
        { numero_sobremesa: '3', nome: 'Torta Holandesa (Pequena)', preco: 14.00, },
    ];
    //Cria a variavel que vai receber os valores do pedido
    var pedidoPizzas = [];
    var pedidoBebidas = [];
    var pedidoSobremesa = [];
    //Deixar true para rodar o loop até que o usuario finalize o pedido e caso tenha alguma informação errada ele retornar do principio
    var continuar = true;
    //Loop + Mostrar cardápio de pizzas
    while (continuar) {
        console.log("\n--- Pizzas Disponíveis ---");
        cardapio.forEach(function (pizza) {
            console.log("".concat(pizza.numero_pizza, " ---- ").concat(pizza.nome, " ---- R$ ").concat(pizza.preco.toFixed(2), " \n - Ingredientes: ").concat(pizza.ingredientes.join(', '), "\n"));
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
    //Escolha da bebida
    var querBebida = rs.question("\nDeseja adicionar bebidas ao seu pedido? (s/n): ").toLowerCase(); //Perguntar se quer bebida
    if (querBebida === 's') {
        var continuarBebidas = true; //Caso seja sim a respota ele continua
        while (continuarBebidas) {
            console.log("\n--- Bebidas Disponíveis ---");
            bebidas.forEach(function (bebida) {
                console.log("".concat(bebida.numero_bebida, " ---- ").concat(bebida.nome, " ---- R$ ").concat(bebida.preco.toFixed(2)));
            });
            var escolhaBebidaStr = rs.question("Digite o numero da bebida que deseja: ");
            var escolhaBebidaNum = Number(escolhaBebidaStr); //Transformar em numero
            if (isNaN(escolhaBebidaNum) || escolhaBebidaNum < 1 || escolhaBebidaNum > bebidas.length) { //Verificar se é um numero
                console.log("\nEscolha inválida de bebida! Tente novamente.");
            }
            else {
                var bebidaEscolhida = bebidas[escolhaBebidaNum - 1];
                pedidoBebidas.push(bebidaEscolhida);
                console.log("\nBebida \"".concat(bebidaEscolhida.nome, "\" adicionada ao pedido."));
            }
            var maisBebidas = rs.question("\nDeseja adicionar outra bebida? (s/n): ");
            if (maisBebidas.toLowerCase() !== 's') {
                continuarBebidas = false;
            }
        }
    }
    //Escolha  da sobremesa
    var querSobremesa = rs.question("\nDeseja adicionar alguma sobremesa ao seu pedido? (s/n): ").toLowerCase(); //Perguntar se quer adicionar uma sobremesa ao pedido
    if (querSobremesa === 's') {
        var continuarSobremesa = true; //Caso seja sim a respota ele continua
        while (continuarSobremesa) {
            console.log("\n--- Sobremesas Disponíveis ---");
            sobremesas.forEach(function (sobremesas) {
                console.log("".concat(sobremesas.numero_sobremesa, " ---- ").concat(sobremesas.nome, " ---- R$ ").concat(sobremesas.preco.toFixed(2)));
            });
            var escolhaSobremesaStr = rs.question("Digite o numero da sobremesa que deseja: ");
            var escolhaSobremesaNum = Number(escolhaSobremesaStr); //Transformar em numero
            if (isNaN(escolhaSobremesaNum) || escolhaSobremesaNum < 1 || escolhaSobremesaNum > sobremesas.length) { //Verificar se é um numero
                console.log("\nEscolha inválida de sobremesa! Tente novamente.");
            }
            else {
                var SobremesaEscolhida = sobremesas[escolhaSobremesaNum - 1];
                pedidoSobremesa.push(SobremesaEscolhida);
                console.log("\nSobremesa \"".concat(SobremesaEscolhida.nome, "\" adicionada ao pedido."));
            }
            var maisSobremesa = rs.question("\nDeseja adicionar outra sobremesa? (s/n): ");
            if (maisSobremesa.toLowerCase() !== 's') {
                continuarSobremesa = false;
            }
        }
    }
    //Gera um resumo geral do pedido feito pelo cliente
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
    // ---------------------------- Salvar no Pedidos.csv ----------------------------
    if (pedidoPizzas.length > 0) { //caso o pedido tenha sido feito ele salva
        var pizzasStr = pedidoPizzas.map(function (p) { return "".concat(p.nome, " (").concat(p.tamanho, ")"); }).join(",");
        var bebidasStr = pedidoBebidas.map(function (b) { return "".concat(b.nome, " (").concat(b.tamanho, ")"); }).join(",");
        var sobremesaStr = pedidoSobremesa.map(function (s) { return "".concat(s.nome); }).join(",");
        var agora = new Date();
        var data_hora = agora.toLocaleString("pt-BR");
        var precoTotal = total_1;
        var linha = "".concat((_a = clienteLogado === null || clienteLogado === void 0 ? void 0 : clienteLogado.nomeCliente) !== null && _a !== void 0 ? _a : "N/A", ";").concat((_b = clienteLogado === null || clienteLogado === void 0 ? void 0 : clienteLogado.cpfCliente) !== null && _b !== void 0 ? _b : "N/A", ";").concat(pizzasStr, ";").concat(bebidasStr, ";").concat(sobremesaStr, ";").concat(data_hora, ";").concat(precoTotal, ";").concat(formaPagamentoEscolhida.nome, ";").concat((_c = clienteLogado === null || clienteLogado === void 0 ? void 0 : clienteLogado.endereco) !== null && _c !== void 0 ? _c : "N/A", "\n");
        fs.appendFileSync(inputData, linha);
    }
    /*
      if (pedidoBebidas.length > 0) { //salvar as bebidas da mesma maneira
            
        const linha = `Bebida(s) inclusa(s): ${bebidasStr}\n`;
        fs.appendFileSync(inputData, linha, "utf-8");
            
        if (pedidoSobremesa.length > 0) { //salvar as sobremesas da mesma maneira
              
          const linha = `Sobremesa(s) inclusa(s) ${sobremesaStr}\n`;  fs.appendFileSync(inputData, linha, "utf-8");
          fs.appendFileSync(inputData, linha, "utf-8");
    
        }
      }*/
}
////////////////////////////////////////////////////////////////////////////
/*



  // Caminho do CSV
  const pedidosPath = path.join(__dirname, "Pedidos.csv");

  function gerarRecibo(pedidos: Record<string, string>[]) {
  if (pedidos.length === 0) {
    console.log("Nenhum pedido encontrado para esse cliente.");
    return;
  } else {
  console.log("\n=== RECIBO ===");
  const nome = pedidos[0].cliente_nome;
  const cpf = pedidos[0].cliente_cpf;
  console.log(`Cliente: ${nome} (CPF: ${cpf})`);
  }

  let total = 0;
  pedidos.forEach((p, i) => {
    const preco = parseFloat(p.precoTotal);
    const qtd = parseInt(p.quantidade);
    const subtotal = preco * qtd;
    total += subtotal;
    console.log(
      `${i + 1}. ${p.produto}  x${p.quantidade}  R$ ${subtotal.toFixed(2)}`
    );
  });

  console.log("----------------------------");
  console.log(`Total: R$ ${total.toFixed(2)}\n`);
}
// Função que lê e filtra pedidos
function buscarPedidosPorCliente(identificador: string) {
  const conteudo = fs.readFileSync(pedidosPath, "utf-8");
  const linhas = conteudo.trim().split("\n");
  const cabecalho = linhas.shift()?.split(",") || [];
  
  const pedidos = linhas
  .map((linha) => {
          const valores = linha.split(",");
          const pedido: Record<string, string> = {};
          cabecalho.forEach((col, i) => (pedido[col.trim()] = valores[i].trim()));
          return pedido;
        })
        .filter(
          (p) =>
            p["cliente_nome"]?.toLowerCase() === identificador.toLowerCase() ||
            p["cliente_cpf"] === identificador
        );

      return pedidos;
    }
if (escolhaInc === '2') {

      const entrada = rs.question(
        "Digite o nome ou CPF do cliente para gerar o recibo: "
      );

      const pedidosCliente = buscarPedidosPorCliente(entrada);
      gerarRecibo(pedidosCliente);
    }
  */ 
