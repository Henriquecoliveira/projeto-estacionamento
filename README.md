Pizzaria-em-Typescript

Projeto de um software de pizzaria em typescript desenvolvido para cadastrar clientes, exibir relatorios e recibos além de realizar pedidos.

🍕 Sistema de Pizzaria

-Alunos e RA do grupo: João Miguel - RA:2511914 Henrique Cordeiro - RA:2507350 Geovana Cristina - RA:2504583 Marcos Vinicius - RA:2506065 Mysael Chuff - RA:2509494

Projeto em Node.js para simular o sistema de uma pizzaria.
Com ele você pode cadastrar clientes, fazer pedidos (pizza, bebida, sobremesa) e ainda gerar recibos automáticos em CSV.
O que precisa ter

    Node.js instalado na sua máquina
    Dependências:
        fs (já vem no Node)
        path (já vem no Node)
        readline-sync → instale com:

npm install readline-sync

-------------------------------------------------------
!!!Como rodar!!!

1. Baixe ou clone o projeto.


2. No terminal, entre na pasta e rode:

node index.js

 Como usar

-Menu de clientes

logo no início você pode:

1 → Cadastrar cliente novo

2 → Conferir se o cliente já está cadastrado

9 → Sair


-Menu principal

Depois de cadastrar/verificar o cliente, abre o menu principal:

1 → Fazer um pedido

2 → Gerar recibo

3 → Sair

4 → Relatório

-como funciona o pedido 

 - 1. Escolhe o sabor e o tamanho da pizza (pequena, média ou grande).


 - 2. Decide se quer adicionar bebidas.


 - 3. Decide se quer incluir sobremesas.


 - 4. O sistema mostra um resumo com tudo o que foi pedido + o valor total.


 - 5. Escolhe a forma de pagamento:

Dinheiro

Cartão de Débito

Cartão de Crédito

Pix


-Recibo

Todos os pedidos ficam guardados em Pedidos.csv.

Pra gerar um recibo é só ir no menu, escolher a opção 2 e informar o nome ou CPF do cliente.

Ele vai listar todas às pizzas, bebidas e sobremesas pedidas pelo cliente, por pedido separadamente e, dará um total de quanto ele gastou na pizzaria.

-------------------------------------------------------
!!!Arquivos que o sistema gera!!!

bancoDeDadosCliente.csv → onde ficam salvos os clientes

Pedidos.csv → onde ficam salvos os pedidos e recibos![Fluxograma](https://github.com/user-attachments/assets/94bef54c-194b-4df2-8921-47e6c76d1c5d)
![Diagrama de dependencias](https://github.com/user-attachments/assets/26bb5930-e067-4f92-b197-c8c37bce8e19)


Recibos.csv → onde ficam salvos os recibos

