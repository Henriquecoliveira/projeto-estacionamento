// importar as bibliotecas necessárias
import * as fs from "fs"; // módulo para manipular arquivos
import * as path from "path"; // módulo para lidar com caminhos de arquivos
import * as readline from "readline"; // módulo para receber entradas do usuário

//Definindo o type de veiculo
type Veiculo = {
    nomeDono: string;
    cpfDono: string;
    placa: string;
    cor: string;
    modelo: string;
}

//cria a interface de leitura no terminal
const read = readline.createInterface({ input, output });

//define o caminho para onde as entradas serão armazenadas
const dadosDeEntrada = path.resolve(__dirname, "dataLog.csv");