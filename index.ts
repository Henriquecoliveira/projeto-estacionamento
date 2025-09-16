    // importar as bibliotecas necessárias

    import * as fs from "fs"; // módulo para manipular arquivos
    import * as path from "path"; // módulo para lidar com caminhos de arquivos
    import * as rs from "readline-sync"; // módulo para receber entradas do usuário

    // definindo o type de veiculo

    type Veiculo = {
        nomeDono: string;
        cpfDono: string;
        placa: string;
        cor: string;
        modelo: string;
        hora: string;
        data: string;
    }
    // inicia o bloco de código para armazenagem e modificação de dados no arquivo dataLog

    // define o caminho para onde as entradas serão armazenadas

    const inputData = path.resolve(__dirname, "dataLog.csv");

    // cabeçalho do CSV
    const header = "nomeDono;cpfDono;placa;cor;modelo; hora; data\n";

    // função para ler os arquivos do dataLog "caso exista"
    function readDataLog(): Veiculo[] {
        try {
            const dados = fs.readFileSync(inputData, "utf-8");

            // se o arquivo estiver vazio, retorna uma lista vazia
            if (!dados.trim()) return [];

            // divide o conteúdo por linhas e transforma em objetos Dados
            return dados.split("\n").map((linha) => {
                const [
                    nomeDono, cpfDono, placa, cor, modelo, hora, data
                ] = linha.split(";");

                return {
                    nomeDono: nomeDono?.trim(),
                    cpfDono: cpfDono?.trim(),
                    placa: placa?.trim(),
                    cor: cor?.trim(),
                    modelo: modelo?.trim(),
                    hora: hora?.trim(),
                    data: data?.trim(),
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
    function newInput(veiculo: Veiculo) {
        const linha = `${veiculo.nomeDono};${veiculo.cpfDono};${veiculo.placa};${veiculo.cor};${veiculo.modelo};${veiculo.hora};${veiculo.data}\n`;
        fs.appendFileSync(inputData, linha, "utf-8");
    }

    // Garante que o arquivo CSV tenha o cabeçalho se ele não existir ou estiver vazio
    if (!fs.existsSync(inputData) || fs.readFileSync(inputData, 'utf-8').trim() === '') {
        fs.writeFileSync(inputData, header, "utf-8");
    }

    // Entrada de veículo

    function requestNewInputOfVehicle() {
        console.log("\n--- Cadastro de Veículo ---");
        
        let correctInput: number = 0;
        while (correctInput === 0) { 
            const nomeDono = rs.question("Digite o nome do dono do veículo: ").trim().toUpperCase();
            const cpfDono = rs.question("Digite o CPF do dono do veículo (apenas números): ").trim();
            const placa = rs.question("Digite a placa do veículo: ").trim().toUpperCase();
            const cor = rs.question("Digite a cor do veículo: ").trim().toUpperCase();
            const modelo = rs.question("Digite o modelo do veículo: ").trim().toUpperCase();
            const { data, hora } = getSystemDateTime();
        
            // Cria um novo objeto Veiculo com as entradas do usuário
            const newVehicle: Veiculo = {
                nomeDono,
                cpfDono,
                placa,
                cor,
                modelo,
                horadata,
            };

            // Chama a função newInput para salvar o novo veículo no CSV
            newInput(newVehicle);
            console.log("Veículo cadastrado com sucesso!");

            break;
            let correctInput = 1;
        }
    }
    // Encerrando o bloco de código para armazenagem e modificação de dados no arquivo dataLog
    // Encerrando o bloco de código para funções e criação de objetos


    // Exemplo de como chamar a função para solicitar entrada
    // requestNewInputOfVehicle();

    // Interface do usuário
    let userChoice: number | undefined;
    while (userChoice !== 9 ) {
        console.log("\nSistema de gerenciamento de estacionamento\n");
        console.log("1 - Cadastrar entrada de veículo");
        console.log("2 - Registrar saída de veículo");
        console.log("3 - Relatório")
        console.log("9 - Desligar programa")
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