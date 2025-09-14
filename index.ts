// importar as bibliotecas necessárias
import * as fs from "fs"; // módulo para manipular arquivos
import * as path from "path"; // módulo para lidar com caminhos de arquivos
import * as rs from "readline-sync"; // módulo para receber entradas do usuário

//Definindo o type de veiculo
type Veiculo = {
    nomeDono: string;
    cpfDono: string;
    placa: string;
    cor: string;
    modelo: string;
}

//define o caminho para onde as entradas serão armazenadas
const inputData = path.resolve(__dirname, "dataLog.csv");

//cabeçalho do CSV
const header = "nomeDono;cpfDono;placa;cor;modelo\n";

//função para ler os arquivos do agendamento "caso exista"
function readDataLog(): Veiculo[] {
    try {
        const dados = fs.readFileSync(inputData, "utf-8");

        //se o arquivo estiver vazio, retorna uma lista vazia
        if (!dados.trim()) return [];

        // divide o conteúdo por linhas e transforma em objetos Agendamento
        return dados.split("\n").map((linha) => {
            const [
                nomeDono, cpfDono, placa, cor, modelo
            ] = linha.split(";");

            return {
                nomeDono: nomeDono?.trim(),
                cpfDono: cpfDono?.trim(),
                placa: placa?.trim(),
                cor: cor?.trim(),
                modelo: modelo?.trim(),
            };
        });
    } catch {
        // se o arquivo não existir, também retorna uma lista vazia
        return [];
    }
}

// função para salvar uma nova entrada no arquivo
function newInput(veiculo: Veiculo) {
    const linha = `${veiculo.nomeDono};${veiculo.cpfDono};${veiculo.placa};${veiculo.cor};${veiculo.modelo}\n`;
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
    const nomeDono = rs.question("Digite o nome do dono do veículo: ");

    // 2. Solicita o CPF do dono
    const cpfDono = rs.question("Digite o CPF do dono do veículo (apenas números): ");

    // 3. Solicita a placa do veículo
    const placa = rs.question("Digite a placa do veículo: ");

    // 4. Solicita a cor do veículo
    const cor = rs.question("Digite a cor do veículo: ");

    // 5. Solicita o modelo do veículo
    const modelo = rs.question("Digite o modelo do veículo: ");

    // 6. Cria um novo objeto Veiculo com as entradas do usuário
    const novoVeiculo: Veiculo = {
        nomeDono,
        cpfDono,
        placa,
        cor,
        modelo
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