    // Sistemas de pizzaria completo
    // importar as bibliotecas necessárias

    import * as fs from "fs"; // módulo para manipular arquivos
    import * as path from "path"; // módulo para lidar com caminhos de arquivos
    import * as rs from "readline-sync"; // módulo para receber entradas do usuário

    //////////////////////////////////////////////////////////////////////////
    
    // Cadastro do cliente
    // definindo o type de cliente

    type Cliente = {
        nomeCliente: string;
        cpfCliente: string;
        phoneNumber: string;
        email: string;
    }
    // inicia o bloco de código para armazenagem e modificação de dados no arquivo dataLog
    // define o caminho para onde as entradas serão armazenadas

    const inputCliente = path.resolve(__dirname, "bancoDeDadosCliente.csv");

    // cabeçalho do CSV
    const headerCliente = "nomeCliente; cpfCliente; phoneNumber; email\n";

    // função para ler os arquivos do banco de dados cliente "caso exista"
    function readBancoDeDadosCliente(): Cliente[] {
        try {
            const dadosCliente = fs.readFileSync(inputCliente, "utf-8");

            // se o arquivo estiver vazio, retorna uma lista vazia
            if (!dadosCliente.trim()) return [];

            // divide o conteúdo por linhas e transforma em objetos Dados
            return dadosCliente.split("\n").map((linha) => {
                const [
                    nomeCliente, cpfCliente, phoneNumber, email
                ] = linha.split(";");

                return {
                    nomeCliente: nomeCliente?.trim(),
                    cpfCliente: cpfCliente?.trim(),
                    phoneNumber: phoneNumber?.trim(),
                    email: email?.trim(),
                };
            });
        } catch {
            // se o arquivo não existir, também retorna uma lista vazia
            return [];
        }
    }
     // inicia o bloco de código para funções e criação de objetos

    // função para salvar uma nova entrada no arquivo
    // para a entrada de novos dados no arquivo bancoDeDadosCliente.csv
    function newInputCliente(Cliente: Cliente) {
        const linha = `${Cliente.nomeCliente};${Cliente.cpfCliente};${Cliente.phoneNumber};${Cliente.email}\n`;
        fs.appendFileSync(inputCliente, linha, "utf-8");
    }

    // Garante que o arquivo CSV tenha o cabeçalho se ele não existir ou estiver vazio
    if (!fs.existsSync(inputCliente) || fs.readFileSync(inputCliente, 'utf-8').trim() === '') {
        fs.writeFileSync(inputCliente, headerCliente, "utf-8");
    }

    // Entrada de Clientes

    //função utilizada na customer_registration ===2
    function verificarClientesCadastrados(): Cliente | undefined { //função para verificar se o cliente foi cadastrado
        const cpf = rs.question("Digite o cpf do cliente cadastrado: ").trim();

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
            const email = rs.question("Digite o email do cliente: ").trim();
        
            // Cria um novo objeto Cliente com as entradas do usuário
            const newRequestCliente: Cliente = {
                nomeCliente,
                cpfCliente,
                phoneNumber,
                email,
            };

            // Chama a função newInput para salvar o novo cliente no CSV
            newInputCliente(newRequestCliente);
            console.log("Cliente cadastrado com sucesso!");

            break;
            let correctInput = 1;
        }
    }

    // Interface de cadastro de cliente
    let customer_registration: number | undefined;
    let clienteLogado: Cliente | undefined;

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
        const clienteNome = clienteLogado?.nomeCliente;
        const clienteCpf = clienteLogado?.cpfCliente;

////////////////////////////////////////////////////////////////////////

//Sistema de pedidos da pizzaria

//Criar o csv do arquivo de pedidos
const inputData = path.resolve(__dirname, "Pedidos.csv");

// garante que o arquivo existe e tem o cabeçalho
if (!fs.existsSync(inputData) || fs.readFileSync(inputData, "utf-8").trim() === "") {
  fs.writeFileSync(inputData, "utf-8");
}


//Criar uma interface das pizzas para definir os valores as entidades
type Pizza = {
  nome: string;
  ingredientes: string[];
  preco: number;
  tamanho?: 'pequena' | 'media' | 'grande';
}

//Criar a mesma interface agora para as bebidas
type Bebida = {
  nome: string;
  preco: number;
  tamanho?: string;
}

//Criar a mesma interface para as sobremesas
type Sobremesa = {
  nome: string;
  preco: number;
}

//Criar para a forma de pagamento
type FormadePagamento = {
    nome: string;
}

//Criar o menu inicial
    console.log("----------- PIZZARIA HENRIQUE --------------");
    console.log("\nO que deseja fazer?")
    console.log("1 -) Realizar um pedido")
    console.log("2 -) Recibo")
    console.log("3 -) Sair")

    const  escolhaInc = rs.question("\nDigite o numero do que deseja fazer: "); //Criar constante da ação a fazer

    if (escolhaInc === '1') {    //Se escolher realizar um pedido ira realizar esse codigo:

//Criar o cardapio
const cardapio: Pizza[] = [
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
    ingredientes: ['molho de tomate','muçarela', 'frango desfiado', 'catupiry'],
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
const bebidas: Bebida[] = [
  { nome: '1 - Coca-Cola 500ml', preco: 5.00, tamanho: '500ml' },
  { nome: '2 - Guaraná 500ml', preco: 4.50, tamanho: '500ml' },
  { nome: '3 - Soda 500ml', preco: 4.00, tamanho: '300ml' },
  { nome: '4 - Pepsi 500ml', preco: 4.00, tamanho: '300ml' },
  { nome: '5 - Suco Natural 300ml', preco: 6.00, tamanho: '300ml' },
  { nome: '6 - Agua 300ml', preco: 2.00, tamanho: '300ml' },
];

const sobremesas: Sobremesa[] = [
  { nome: '1 - Pizza Doce de Chocolate - Pequena', preco: 35.00,},
  { nome: '2 - Pizza Doce de Banana Nevada - Pequena', preco: 34.50,},
  { nome: '3 - Torta Holandesa - Pequena', preco: 14.00,},
];

//Criar a variavel que vai receber o pedido
const pedidoPizzas: Pizza[] = [];
const pedidoBebidas: Bebida[] = [];
const pedidoSobremesa: Sobremesa[] = [];

//Deixar true para rodar o loop até que o usuario finalize o pedido e caso tenha alguma informação errada ele retornar do principio
let continuar = true;


//Loop
while (continuar) {
  //Mostrar cardápio de pizzas
  console.log("\n--- Pizzas Disponíveis ---");
  cardapio.forEach(pizza => {
    console.log(`${pizza.nome} - R$ ${pizza.preco.toFixed(2)} \n - Ingredientes: ${pizza.ingredientes.join(', ')}\n`);
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

const querBebida = rs.question("\nDeseja adicionar bebidas ao seu pedido? (s/n): ").toLowerCase(); //Perguntar se quer bebida

if (querBebida === 's') {
  let continuarBebidas = true; //Caso seja sim a respota ele continua

  while (continuarBebidas) {
    console.log("\n--- Bebidas Disponíveis ---");
    bebidas.forEach(bebida => {
      console.log(`${bebida.nome} - R$ ${bebida.preco.toFixed(2)}`);
    });

    const escolhaBebidaStr = rs.question("Digite o numero da bebida que deseja: ");
    const escolhaBebidaNum = Number(escolhaBebidaStr); //Transformar em numero

    if (isNaN(escolhaBebidaNum) || escolhaBebidaNum < 1 || escolhaBebidaNum > bebidas.length) { //Verificar se é um numero
      console.log("Escolha inválida de bebida! Tente novamente.");
    } else {
      const bebidaEscolhida = bebidas[escolhaBebidaNum - 1];
      pedidoBebidas.push(bebidaEscolhida);
      console.log(`Bebida "${bebidaEscolhida.nome}" adicionada ao pedido.`);
    }

    const maisBebidas = rs.question("Deseja adicionar outra bebida? (s/n): ");
    if (maisBebidas.toLowerCase() !== 's') {
      continuarBebidas = false;
    }
  }
}

//Sobremesa
const querSobremesa = rs.question("\nDeseja adicionar alguma sobremesa ao seu pedido? (s/n): ").toLowerCase(); //Perguntar se quer adicionar uma sobremesa ao pedido

if (querSobremesa === 's') {
  let continuarSobremesa = true; //Caso seja sim a respota ele continua

  while (continuarSobremesa) {
    console.log("\n--- Sobremesas Disponíveis ---");
    sobremesas.forEach(sobremesas => {
      console.log(`${sobremesas.nome} - R$ ${sobremesas.preco.toFixed(2)}`);
    });

    const escolhaSobremesaStr = rs.question("Digite o numero da sobremesa que deseja: ");
    const escolhaSobremesaNum = Number(escolhaSobremesaStr); //Transformar em numero

    if (isNaN(escolhaSobremesaNum) || escolhaSobremesaNum < 1 || escolhaSobremesaNum > sobremesas.length) { //Verificar se é um numero
      console.log("Escolha inválida de sobremesa! Tente novamente.");
    } else {
      const SobremesaEscolhida = bebidas[escolhaSobremesaNum - 1];
      pedidoSobremesa.push(SobremesaEscolhida);
      console.log(`Sobremesa "${SobremesaEscolhida.nome}" adicionada ao pedido.`);
    }

    const maisSobremesa = rs.question("Deseja adicionar outra sobremesa? (s/n): ");
    if (maisSobremesa.toLowerCase() !== 's') {
      continuarSobremesa = false;
    }
  }
}

//Fim do pedido
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
const formasPagamento: FormadePagamento[] = [
  { nome: "Dinheiro" },
  { nome: "Cartão de Débito" },
  { nome: "Cartão de Crédito" },
  { nome: "Pix" }
];

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

    //Salvar no csv
    if (pedidoPizzas.length > 0) { //caso o pedido tenha sido feito ele salva
const pizzasStr = pedidoPizzas.map(p => `${p.nome} (${p.tamanho})`).join(", ");
const agora = new Date();
const data_hora = agora.toLocaleString("pt-BR");
const precoTotal = total;

const linha = `Cliente ${clienteLogado?.nomeCliente ?? "N/A"} do CPF: ;${clienteLogado?.cpfCliente ?? "N/A"}\nPediu ${pizzasStr} às ${data_hora} e pagou R$${precoTotal} no ${formaPagamentoEscolhida.nome}\n`;
fs.appendFileSync(inputData, linha);

 }
    if (pedidoBebidas.length > 0) { //salvar as bebidas da mesma maneira
      const bebidasStr = pedidoBebidas.map(b => `${b.nome} (${b.tamanho})`).join(", ");
      
      const linha = `Bebida(s) inclusa(s): ${bebidasStr}\n`;
      fs.appendFileSync(inputData, linha, "utf-8");
      
      if (pedidoSobremesa.length > 0) { //salvar as sobremesas da mesma maneira
        const sobremesaStr = pedidoSobremesa.map(s => `${s.nome}`).join(", ");
        
        const linha = `Sobremesa(s) inclusa(s) ${sobremesaStr}\n`;  fs.appendFileSync(inputData, linha, "utf-8");
      }
    }
  }
  ////////////////////////////////////////////////////////////////////////////
  // Caminho do CSV
  const pedidosPath = path.join(__dirname, "Pedidos.csv");

  function gerarRecibo(pedidos: Record<string, string>[]) {
  if (pedidos.length === 0) {
    console.log("Nenhum pedido encontrado para esse cliente.");
    return;
  }

  console.log("\n=== RECIBO ===");
  const nome = pedidos[0].cliente_nome;
  const cpf = pedidos[0].cliente_cpf;
  console.log(`Cliente: ${nome} (CPF: ${cpf})`);

  let total = 0;
  pedidos.forEach((p, i) => {
    const preco = parseFloat(p.preco);
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
  