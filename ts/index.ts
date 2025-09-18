    // Sistemas de pizzaria completo
    // importar as bibliotecas necessárias

    import * as fs from "fs"; // módulo para manipular arquivos
    import * as path from "path"; // módulo para lidar com caminhos de arquivos
    import * as rs from "readline-sync"; // módulo para receber entradas do usuário

    // definindo o type de pedido

    type Pedido = {
        nomeCliente: string;
        cpfCliente: string;
        pizzas: string;
        bebida: string;
        sobremesa: string;
        acompanhamento: string;
        endereco: string;
        data_hora: string;
        mes: string;
        formaDePagamento: string;
    }
    // inicia o bloco de código para armazenagem e modificação de dados no arquivo dataLog
    // define o caminho para onde as entradas serão armazenadas

    const inputData = path.resolve(__dirname, "dataLog.csv");

    // cabeçalho do CSV
    const header = "nomeCliente; cpfCliente; pizzas; bebida; sobremesa; acompanhamento; endereco; data_hora; mes; formaDePagamento\n";

    // função para ler os arquivos do dataLog "caso exista"
    function readDataLog(): Pedido[] {
        try {
            const dados = fs.readFileSync(inputData, "utf-8");

            // se o arquivo estiver vazio, retorna uma lista vazia
            if (!dados.trim()) return [];

            // divide o conteúdo por linhas e transforma em objetos Dados
            return dados.split("\n").map((linha) => {
                const [
                    nomeCliente, cpfCliente, pizzas, bebida, sobremesa, acompanhamento, endereco, data_hora, mes, formaDePagamento
                ] = linha.split(";");

                return {
                    nomeCliente: nomeCliente?.trim(),
                    cpfCliente: cpfCliente?.trim(),
                    pizzas: pizzas?.trim(),
                    bebida: bebida?.trim(),
                    sobremesa: sobremesa?.trim(),
                    acompanhamento: acompanhamento?.trim(),
                    endereco: endereco?.trim(),
                    data_hora: data_hora?.trim(),
                    mes: mes?.trim(),
                    formaDePagamento: formaDePagamento?.trim(),
                };
            });
        } catch {
            // se o arquivo não existir, também retorna uma lista vazia
            return [];
        }
    }

    // inicia o bloco de código para funções e criação de objetos

    // função para salvar uma nova entrada no arquivo
    // para a entrada de novos dados no arquivo dataLog.csv
    function newInput(Pedido: Pedido) {
        const linha = `${Pedido.nomeCliente};${Pedido.cpfCliente};${Pedido.pizzas};${Pedido.bebida};${Pedido.sobremesa};${Pedido.acompanhamento};${Pedido.endereco};${Pedido.data_hora};${Pedido.mes};${Pedido.formaDePagamento}\n`;
        fs.appendFileSync(inputData, linha, "utf-8");
    }

    // Garante que o arquivo CSV tenha o cabeçalho se ele não existir ou estiver vazio
    if (!fs.existsSync(inputData) || fs.readFileSync(inputData, 'utf-8').trim() === '') {
        fs.writeFileSync(inputData, header, "utf-8");
    }

    // Entrada de pedidos

    function requestNewInputOfPizza() {
        console.log("\n--- Cadastro de Pedidos ---");
        
        let correctInput: number = 0;
        while (correctInput === 0) { 
            const nomeCliente = rs.question("Digite o nome do cliente: ").trim().toUpperCase();
            const cpfCliente = rs.question("Digite o CPF do cliente: ").trim();
            const pizzas = rs.question("Digite os sabores da pizza: ").trim().toUpperCase();
            const bebida = rs.question("Digite as bebidas: ").trim().toUpperCase();
            const sobremesa = rs.question("Digite a sobremesa: ").trim().toUpperCase();
            const acompanhamento = rs.question("Digite o acompanhamento: ").trim(). toUpperCase();
            const endereco = rs.question("Digite o endereço do cliente: ").trim().toUpperCase();
            const data_hora  = new Date().toLocaleDateString("pt-br");
            const mes = new Date().toLocaleDateString("pt-br", { month: "long"});
            const formaDePagamento = rs.question("Digite a forma de pagamento: ").trim().toUpperCase(); 
        
            // Cria um novo objeto Pedido com as entradas do usuário
            const newRequest: Pedido = { // está dando erro por faltar as contantes data_hora e mes
                nomeCliente,
                cpfCliente,
                pizzas,
                bebida,
                sobremesa,
                acompanhamento,
                endereco,
                data_hora,
                mes,
                formaDePagamento,
            };

            // Chama a função newInput para salvar o novo veículo no CSV
            newInput(newRequest);
            console.log("Veículo cadastrado com sucesso!");

            break;
            let correctInput = 1;
        }
    }
    // Encerrando o bloco de código para armazenagem e modificação de dados no arquivo dataLog
    // Encerrando o bloco de código para funções e criação de objetos


    // Exemplo de como chamar a função para solicitar entrada
    // requestNewInputOfPizza();


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
        else if (customer_registration === 2) {
            
            //Puxa a função
            const clienteEncontrado = verificarClientesCadastrados();

            if (clienteEncontrado) {
                console.log(`O cliente ${clienteEncontrado.nomeCliente} possui cadastro!\n`);
                break;
            } else {
                console.log("O cliente não possui cadastro ainda\n");
                requestNewInputOfCliente();
            }
            }
        }

    ////////////////////////////////////////////////////////////////////////

    // Interface de pedidos
    let userChoice: number | undefined;
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