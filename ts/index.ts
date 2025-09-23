    // Sistemas de pizzaria em typescript
    //Alunos e RA do grupo:
    //João Miguel - RA:2511914
    //Henrique Cordeiro - RA:2507350
    //Geovana Cristina - RA:2504583
    //Marcos Vinicius - RA:2506065
    //Mysael Chuff - RA:2509494
    
    // Biblíotecas necessárias para o funcionamento do sistema

    import * as fs from "fs"; // módulo para manipular arquivos
    import * as path from "path"; // módulo para lidar com caminhos de arquivos
    import * as rs from "readline-sync"; // módulo para receber entradas do usuário

    /////////////////////////////////////////////////////////////////////////////////////////////////////
    
    // -------------------------------------- Cadastro do cliente --------------------------------------
    // definindo o type de cliente

    type Cliente = {
        nomeCliente: string;
        cpfCliente: string;
        phoneNumber: string;
        endereco: string;
        numero_residencia: string;
    }

    // ---------------------------- Armazenando em CSV, bancoDeDadosCliente ----------------------------
    
    // define o caminho para onde as entradas serão armazenadas

    const inputCliente = path.resolve(__dirname, "bancoDeDadosCliente.csv");

    // cabeçalho do CSV

    const headerCliente = "nomeCliente; cpfCliente; phoneNumber; endereco; numero_residencia\n";

    // !! ------ função para ler os arquivos do banco de dados cliente "caso exista" ------ !!

    function readBancoDeDadosCliente(): Cliente[] {
        try {
            const dadosCliente = fs.readFileSync(inputCliente, "utf-8");

            // se o arquivo estiver vazio, retorna uma lista vazia

            if (!dadosCliente.trim()) return [];

            // divide o conteúdo por linhas e transforma em objetos Dados

            return dadosCliente.split("\n").map((linha) => {
                const [
                    nomeCliente, cpfCliente, phoneNumber, endereco, numero_residencia //define cada objeto da linha
                ] = linha.split(";");

                return {
                    nomeCliente: nomeCliente?.trim(),
                    cpfCliente: cpfCliente?.trim(),
                    phoneNumber: phoneNumber?.trim(),
                    endereco: endereco?.trim(),
                    numero_residencia: numero_residencia?.trim()
                };
            });
        } catch {
            // se o arquivo não existir, também retorna uma lista vazia
            return [];
        }
    }

    // !! ------ função para salvar uma nova linha no bancoDeDadosCliente.csv ------ !!
    
    function newInputCliente(Cliente: Cliente) {
        const linha = `${Cliente.nomeCliente};${Cliente.cpfCliente};${Cliente.phoneNumber};${Cliente.endereco};${Cliente.numero_residencia}\n`;
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

    function verificarClientesCadastrados(): Cliente | undefined { //função para verificar se o cliente foi cadastrado
        const cpf = rs.question("\nDigite o cpf do cliente cadastrado: ").trim();

        //Lê todos os clientes cadastrados

        const clientes = readBancoDeDadosCliente();

        //Verifica se algum cpf bate com a lista cadastrada

        return clientes.find(c => c.cpfCliente === cpf);
    }
    function requestNewInputOfCliente() {
        console.log("\n--- Cadastro de Cliente ---");
        
        let correctInputCliente: number = 0;
        while (correctInputCliente === 0) { 
            const nomeCliente = rs.question("Digite o nome do cliente: ").trim().toUpperCase();
            const cpfCliente = rs.question("Digite o CPF do cliente: ").trim();
            const phoneNumber = rs.question("Digite o telefone do cliente: ").trim();
            const endereco = rs.question("Digite o endereco do cliente: ").trim();
            const numero_residencia = rs.question("Digite o numero da residencia: ").trim();
        
            // Cria um novo objeto Cliente com as entradas do usuário

            const newRequestCliente: Cliente = {
                nomeCliente,
                cpfCliente,
                phoneNumber,
                endereco,
                numero_residencia
            };

            // Chama a função newInputCliente para salvar o novo cliente no CSV

            newInputCliente(newRequestCliente);
            console.log("\nCliente cadastrado com sucesso!");

            break;
            let correctInput = 1;
        }
    }

    // ---------------------------- Interface de cadastro de cliente ----------------------------

    let customer_registration: number | undefined;
    let clienteLogado: Cliente | undefined;

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

                const clienteEncontrado = verificarClientesCadastrados();
            if (clienteEncontrado) {
                console.log(`O cliente ${clienteEncontrado.nomeCliente} possui cadastro!\n`);
                clienteLogado = clienteEncontrado;
                break;
            } else {
                console.log("O cliente não possui cadastro ainda\n");
                requestNewInputOfCliente();
            }
            }
        }

/////////////////////////////////////////////////////////////////////////////////////////////////////

// ---------------------------- Sistema de pedidos da pizzaria ----------------------------

// Menu inicial pós tela de cadastro do cliente

console.log("----------- PIZZARIA HENRIQUE --------------");
console.log("\nO que deseja fazer?")
console.log("1 -) Realizar um pedido")
console.log("2 -) Recibo")
console.log("3 -) Sair")
console.log("4 -) Relatório")

const escolhaInc = rs.question("\nDigite o numero do que deseja fazer: ");

// ---------------------------- Cardápio da pizzaria ----------------------------

/* 
----------------------------------------------------------------------------------------------------------------
Bloco de código que compõe as funções, diretórios de armazenamento de dados, entradas e saídas da 
escolhaInc === 1
----------------------------------------------------------------------------------------------------------------
*/

//Cria o csv do arquivo de pedidos

const inputData = path.resolve(__dirname, "Pedidos.csv");

//Garante que o arquivo existe e tem o cabeçalho

if (!fs.existsSync(inputData) || fs.readFileSync(inputData, "utf-8").trim() === "") {
  fs.writeFileSync(inputData, "cliente_nome;cliente_cpf;pizza(s);bebida(s);sobremesa(s);data_hora;precoTotal;formaDePagamento;endereco\n", "utf-8");
}

//Tipos que serão utilizados posteriormente para a montagem dos pedidos
//Cria um type das pizzas para definir os valores as entidades

type Pizza = {
  numero_pizza: string;
  nome: string;
  ingredientes: string[];
  preco: number;
  tamanho?: 'pequena' | 'media' | 'grande';
}

//Cria um type para as bebidas

type Bebida = {
  numero_bebida: string;
  nome: string;
  preco: number;
  tamanho?: string;
}

//Cria um type para as sobremesas

type Sobremesa = {
  numero_sobremesa: string;
  nome: string;
  preco: number;
}

//Cria um type para a forma de pagamento

type FormadePagamento = {
    nome: string;
}

if (escolhaInc === '1') {

  //Cria um cardápio com os sabores de pizza

  const cardapio: Pizza[] = [
    { numero_pizza: '1', nome: 'Margherita', ingredientes: ['molho de tomate', 'muçarela', 'manjericão'], preco: 25.00 },
    { numero_pizza: '2', nome: 'Calabresa', ingredientes: ['molho de tomate', 'muçarela', 'calabresa', 'cebola'], preco: 30.00 },
    { numero_pizza: '3', nome: 'Quatro Queijos', ingredientes: ['muçarela', 'gorgonzola', 'parmesão', 'provolone'], preco: 35.00 },
    { numero_pizza: '4', nome: 'Portuguesa', ingredientes: ['molho de tomate', 'muçarela', 'presunto', 'ovo', 'cebola', 'azeitona'], preco: 35.00 },
    { numero_pizza: '5', nome: 'Frango com Catupiry', ingredientes: ['molho de tomate', 'muçarela', 'frango desfiado', 'catupiry'], preco: 45.00 },
    { numero_pizza: '6', nome: 'Pepperoni', ingredientes: ['molho de tomate', 'muçarela', 'pepperoni'], preco: 45.00 },
    { numero_pizza: '7', nome: 'Vegetariana', ingredientes: ['molho de tomate', 'muçarela', 'pimentão', 'cebola', 'tomate', 'azeitona', 'milho'], preco: 45.00 },
    { numero_pizza: '8', nome: 'Bacon com Cheddar', ingredientes: ['molho de tomate', 'muçarela', 'bacon', 'cheddar'], preco: 45.00}
  ];


  //Cria um cardapio para as bebidas disponiveis

  const bebidas: Bebida[] = [
    { numero_bebida: '1', nome: 'Coca-Cola 500ml', preco: 5.00, tamanho: '500ml' },
    { numero_bebida: '2', nome: 'Guarana 500ml', preco: 4.50, tamanho: '500ml' },
    { numero_bebida: '3', nome: 'Soda 500ml', preco: 4.00, tamanho: '300ml' },
    { numero_bebida: '4', nome: 'Pepsi 500ml', preco: 4.00, tamanho: '300ml' },
    { numero_bebida: '5', nome: 'Suco Natural 300ml', preco: 6.00, tamanho: '300ml' },
    { numero_bebida: '6', nome: 'Agua 300ml', preco: 2.00, tamanho: '300ml' },
  ];

  //Cria um cardapio para as sobremesas disponiveis

  const sobremesas: Sobremesa[] = [
    { numero_sobremesa: '1', nome: 'Pizza Doce de Chocolate (Pequena)', preco: 35.00,},
    { numero_sobremesa: '2', nome: 'Pizza Doce de Banana Nevada (Pequena)', preco: 34.50,},
    { numero_sobremesa: '3', nome: 'Torta Holandesa (Pequena)', preco: 14.00,},
  ];

  //Cria as opções de forma de pagamento

    const formasPagamento: FormadePagamento[] = [
    { nome: "Dinheiro" },
    { nome: "Cartao de Debito" },
    { nome: "Cartao de Credito" },
    { nome: "Pix" }
  ];

  //Cria a variavel que vai receber os valores do pedido

  const pedidoPizzas: Pizza[] = [];
  const pedidoBebidas: Bebida[] = [];
  const pedidoSobremesa: Sobremesa[] = [];

  //Deixar true para rodar o loop até que o usuario finalize o pedido e caso tenha alguma informação errada ele retornar do principio

  let continuar = true;

  //Loop + Mostrar cardápio de pizzas

  while (continuar) {
    console.log("\n--- Pizzas Disponíveis ---");
    cardapio.forEach(pizza => {
      console.log(`${pizza.numero_pizza} ---- ${pizza.nome} ---- R$ ${pizza.preco.toFixed(2)} \n - Ingredientes: ${pizza.ingredientes.join(', ')}\n`);
    });

    //Escolha da pizza

    const escolhaStr = rs.question("\nDigite o numero da pizza que deseja: ");
    const escolhaNum = Number(escolhaStr); //Transofrmar o que foi digitado em numero

    if (isNaN(escolhaNum) || escolhaNum < 1 || escolhaNum > cardapio.length) { //Verificar se é um numero para continuar o looping
      console.log("\nEscolha inválida! Tente novamente.");
      continue;
    }

    const tamanhoEscolhido = rs.question("\nEscolha o tamanho (pequena, media, grande): ").toLowerCase(); //Definir o tamanho que vai ser pedido

    if (!['pequena', 'media', 'grande'].includes(tamanhoEscolhido)) {
      console.log("\nTamanho inválido! Tente novamente."); //Verifica se está correto para seguir com o codigo
      continue;
    }

    const pizzaBase = cardapio[escolhaNum - 1]; //Enumerar as escolhas de pizzas do cliente

    //Cria pizza com tamanho selecionado, preço fixo (sem ajuste)

    const pizzaEscolhida: Pizza = {
      ...pizzaBase,
      tamanho: tamanhoEscolhido as 'pequena' | 'media' | 'grande',
    };

    pedidoPizzas.push(pizzaEscolhida);
    console.log(`Pizza "${pizzaEscolhida.nome}" - ${pizzaEscolhida.tamanho} adicionada ao pedido.`);

    //Perguntar se quer continuar adicionando pizzas

    const querContinuar = rs.question("\nQuer adicionar outra pizza? (s/n) ");
    if (querContinuar.toLowerCase() !== 's') {
      continuar = false;
    }

  }

  //Escolha da bebida

  const querBebida = rs.question("\nDeseja adicionar bebidas ao seu pedido? (s/n): ").toLowerCase(); //Perguntar se quer bebida

  if (querBebida === 's') {
    let continuarBebidas = true; //Caso seja sim a respota ele continua

    while (continuarBebidas) {
      console.log("\n--- Bebidas Disponíveis ---\n");
      bebidas.forEach(bebida => {
        console.log(`${bebida.numero_bebida} ---- ${bebida.nome} ---- R$ ${bebida.preco.toFixed(2)}`);
      });

      const escolhaBebidaStr = rs.question("Digite o numero da bebida que deseja: ");
      const escolhaBebidaNum = Number(escolhaBebidaStr); //Transformar em numero

      if (isNaN(escolhaBebidaNum) || escolhaBebidaNum < 1 || escolhaBebidaNum > bebidas.length) { //Verificar se é um numero
        console.log("\nEscolha inválida de bebida! Tente novamente.");
      } else {
        const bebidaEscolhida = bebidas[escolhaBebidaNum - 1];
        pedidoBebidas.push(bebidaEscolhida);
        console.log(`\nBebida "${bebidaEscolhida.nome}" adicionada ao pedido.`);
      }

      const maisBebidas = rs.question("\nDeseja adicionar outra bebida? (s/n): ");
      if (maisBebidas.toLowerCase() !== 's') {
        continuarBebidas = false;
      }
    }
  }

  //Escolha  da sobremesa

  const querSobremesa = rs.question("\nDeseja adicionar alguma sobremesa ao seu pedido? (s/n): ").toLowerCase(); //Perguntar se quer adicionar uma sobremesa ao pedido

  if (querSobremesa === 's') {
    let continuarSobremesa = true; //Caso seja sim a respota ele continua

    while (continuarSobremesa) {
      console.log("\n--- Sobremesas Disponíveis ---\n");
      sobremesas.forEach(sobremesas => {
        console.log(`${sobremesas.numero_sobremesa} ---- ${sobremesas.nome} ---- R$ ${sobremesas.preco.toFixed(2)}`);
      });

      const escolhaSobremesaStr = rs.question("Digite o numero da sobremesa que deseja: ");
      const escolhaSobremesaNum = Number(escolhaSobremesaStr); //Transformar em numero

      if (isNaN(escolhaSobremesaNum) || escolhaSobremesaNum < 1 || escolhaSobremesaNum > sobremesas.length) { //Verificar se é um numero
        console.log("\nEscolha inválida de sobremesa! Tente novamente.");
      } else {
        const SobremesaEscolhida = sobremesas[escolhaSobremesaNum - 1];
        pedidoSobremesa.push(SobremesaEscolhida);
        console.log(`\nSobremesa "${SobremesaEscolhida.nome}" adicionada ao pedido.`);
      }

      const maisSobremesa = rs.question("\nDeseja adicionar outra sobremesa? (s/n): ");
      if (maisSobremesa.toLowerCase() !== 's') {
        continuarSobremesa = false;
      }
    }
  }

  //Gera um resumo geral do pedido feito pelo cliente

  console.log("\nSeu pedido final:");

  let total = 0;

  if (pedidoPizzas.length > 0) { //Mostrar as pizzas escolhidas
    console.log("\nPizzas:");
    pedidoPizzas.forEach((pizza, i) => {
      console.log(`${i + 1} -) ${pizza.nome} - ${pizza.tamanho} - R$ ${pizza.preco.toFixed(2)}`);
      total += pizza.preco;
    });
  }

  if (pedidoBebidas.length > 0) { //Mostrar as bebidas escolhidas
    console.log("\nBebidas:");
    pedidoBebidas.forEach((bebida, i) => {
      console.log(`${i + 1} -) ${bebida.nome} - R$ ${bebida.preco.toFixed(2)}`);
      total += bebida.preco;
    });
  }
      
  if (pedidoSobremesa.length > 0) { //Mostrar as sobremesas escolhidas
    console.log("\nSobremesa:");
    pedidoSobremesa.forEach((sobremesa, i) => {
      console.log(`${i + 1} -) ${sobremesa.nome} - R$ ${sobremesa.preco.toFixed(2)}`);
      total += sobremesa.preco;
    });
  }

    console.log(`\nTotal a pagar: R$ ${total.toFixed(2)}`); //Mostrar quanto devera ser pago

  //Forma de pagamento

  console.log("\nFormas de pagamento disponíveis:");
  formasPagamento.forEach((fp, i) => {
    console.log(`${i + 1} - ${fp.nome}`);
  });

  const escolhaPagamentoStr = rs.question("\nDigite o numero da forma de pagamento: ");
  const escolhaPagamentoNum = Number(escolhaPagamentoStr);

  let formaPagamentoEscolhida: FormadePagamento;

  if (
    isNaN(escolhaPagamentoNum) ||
    escolhaPagamentoNum < 1 ||
    escolhaPagamentoNum > formasPagamento.length
  ) {
    console.log("Forma de pagamento inválida! Será registrado como 'Não informado'.");
    formaPagamentoEscolhida = { nome: "Não informado" };
  } else {
    formaPagamentoEscolhida = formasPagamento[escolhaPagamentoNum - 1];
  }

  console.log(`\nForma de pagamento escolhida: ${formaPagamentoEscolhida.nome}`);

  console.log(`\nPedido Realizado com sucesso! Só aguardar...`);


  // ---------------------------- Salvar no Pedidos.csv ----------------------------

  if (pedidoPizzas.length > 0) { //caso o pedido tenha sido feito ele salva
    const pizzasStr = pedidoPizzas.map(p => `${p.nome} (${p.tamanho})`).join(", ");
    const bebidasStr = pedidoBebidas.map(b => `${b.nome} (${b.tamanho})`).join(", ");
    const sobremesaStr = pedidoSobremesa.map(s => `${s.nome}`).join(", ");
    const agora = new Date();
    const data_hora = agora.toLocaleString("pt-BR");
    const precoTotal = total;

    const linha = `${clienteLogado?.nomeCliente ?? "N/A"};${clienteLogado?.cpfCliente ?? "N/A"};${pizzasStr};${bebidasStr};${sobremesaStr};${data_hora};${precoTotal};${formaPagamentoEscolhida.nome};${clienteLogado?.endereco ?? "N/A"}\n`;
    fs.appendFileSync(inputData, linha);
  }
}
  
////////////////////////////////////////////////////////////////////////////
/* 
----------------------------------------------------------------------------------------------------------------
Bloco de código que compõe as funções, diretórios de armazenamento de dados, entradas e saídas da 
escolhaInc === 2
----------------------------------------------------------------------------------------------------------------
*/
//!! ------ funções utilizada para escolhaInc === '2' ------ !!

// Caminho do CSV
const pedidosPath = path.join(__dirname, "Pedidos.csv");

function gerarRecibo(pedidos: Record<string, string>[]) {
if (pedidos.length === 0) {
  console.log("Nenhum pedido encontrado para esse cliente.");
  return;
}

console.log("\n=== RECIBO ===");
const nome = pedidos[0]["cliente_nome"];
const cpf = pedidos[0]["cliente_cpf"];
console.log(`Cliente: ${nome} (CPF: ${cpf})\n`);

let total = 0;
pedidos.forEach((p, i) => {
  const preco = parseFloat(p["precoTotal"]);
  total += preco;
  console.log(
    `${i + 1}. Pizzas: ${p["pizza(s)"]} | Bebidas: ${p["bebida(s)"]} | Sobremesas: ${p["sobremesa(s)"]}  - R$ ${preco.toFixed(2)}`
  );
});

console.log("----------------------------");
console.log(`Total gasto na pizzaria: R$ ${total.toFixed(2)}\n`);
}

// Função que lê e filtra pedidos
function buscarPedidosPorCliente(identificador: string) {
  const conteudo = fs.readFileSync(pedidosPath, "utf-8");
  const linhas = conteudo.trim().split("\n");
  const cabecalho = linhas.shift()?.split(";") || [];
  
  const pedidos = linhas
  .map((linha) => {
          const valores = linha.split(";");
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

////////////////////////////////////////////////////////////////////////////
/* 
----------------------------------------------------------------------------------------------------------------
Bloco de código que compõe as funções, diretórios de armazenamento de dados, entradas e saídas da 
escolhaInc === 3
----------------------------------------------------------------------------------------------------------------
*/
if (escolhaInc === "3") {
  console.log("\nFim do programa!");
}
/* 
----------------------------------------------------------------------------------------------------------------
Bloco de código que compõe as funções, diretórios de armazenamento de dados, entradas e saídas da 
escolhaInc === 4
----------------------------------------------------------------------------------------------------------------
*/

//!! ------ função utilizada para escolhaInc === '4' ------ !!

function gerarRelatorio() {
if (!fs.existsSync(inputData)) {
  console.log("Nenhum pedido encontrado.");
  return;
}

const conteudo = fs.readFileSync(inputData, "utf-8");
const linhas = conteudo.trim().split("\n");

if (linhas.length <= 1) {
  console.log("Nenhum pedido registrado ainda.");
  return;
}

const cabecalho = linhas.shift()?.split(";") || [];
const pedidos = linhas.map((linha) => {
const valores = linha.split(";");
const pedido: Record<string, string> = {};
cabecalho.forEach((col, i) => (pedido[col.trim()] = valores[i]?.trim() || ""));
return pedido;
});

console.log("\n====== RELATÓRIO GERAL ======\n");

// Total arrecadado

let totalArrecadado = 0; //Inicia o total arrecadado como zero
pedidos.forEach(p => totalArrecadado += parseFloat(p.precoTotal)); // Acrescenta o valor do precoTotal de cada linha ao totalArrecadado

console.log(`📌 Total de pedidos registrados: ${pedidos.length}`);
console.log(`💰 Valor total arrecadado: R$ ${totalArrecadado.toFixed(2)}\n`);

// Agrupar por cliente

const vendasPorCliente: Record<string, number> = {};
pedidos.forEach(p => {
  const cliente = `${p.cliente_nome} (${p.cliente_cpf})`;
  vendasPorCliente[cliente] = (vendasPorCliente[cliente] || 0) + parseFloat(p.precoTotal);
});

console.log("📊 Vendas por Cliente:");
for (const cliente in vendasPorCliente) {
  console.log(` - ${cliente}: R$ ${vendasPorCliente[cliente].toFixed(2)}`);
}

// Agrupar por produto

const vendasPorProduto: Record<string, number> = {};
pedidos.forEach(p => {
  const produto = p.produto;
  vendasPorProduto[produto] = (vendasPorProduto[produto] || 0) + parseFloat(p.precoTotal);
});

console.log("\n🍕 Vendas por Produto:");
for (const produto in vendasPorProduto) {
  console.log(` - ${produto}: R$ ${vendasPorProduto[produto].toFixed(2)}`);
}

console.log("\n====== FIM DO RELATÓRIO ======\n");
}

if (escolhaInc === '4') {
  gerarRelatorio();
}

////////////////////////////////////////////////////////////////////////////