    // Sistemas de pizzaria completo
    // importar as bibliotecas necessárias

    import * as fs from "fs"; // módulo para manipular arquivos
    import * as path from "path"; // módulo para lidar com caminhos de arquivos
    import * as rs from "readline-sync"; // módulo para receber entradas do usuário

    // definindo o type de veiculo

    type Pedido = {
        nomeCliente: string;
        cpfCliente: string;
        pizzas: string;
        bebida: string;
        sobremesa: string;
        acompanhamento: string;
        endereco: string;
        data_hora: string;
        mes: number;
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
            // const data_hora = inserir função para puxar data e hora do sistema
            // const mes = inserir função para puxar o mes do sistema
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
                // data_hora, tirar o comentário após inserir a função
                // mes, tirar o comentário após inserir a função
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

    // Interface do usuário
    let userChoice: number | undefined;
    while (userChoice !== 9 ) {
        console.log("\nSistema de gerenciamento de pizzaria\n");
        console.log("1 - Cadastrar pedido");
        console.log("3 - Relatório")
        console.log("9 - Desligar programa")
        userChoice = parseInt(rs.question("O que deseja fazer?")); // = Pede uma entrada ao usuário

        //userChoice === 1
        if (userChoice === 1) {
            requestNewInputOfPizza();
            continue;
        }
    }

    // Você pode opcionalmente ler e imprimir os dados para verificar
    console.log("\n--- Dados atuais no CSV ---");
    console.log(readDataLog());