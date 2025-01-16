# base desafio infra

## Descrição

Este é o código de um site simples onde você escreve o seu nome em um campo de entrada e este nome é salvo no banco de dados junto com a hora do envio das informações.

Este site é feito para parar de funcionar quando o mesmo nome é enviado duas vezes.

## Iniciar aplicação

1. Certifique-se que todas as informações do arquivo [`.env`](.env) estão preenchidas

2. Executar

    npm
    ``` bash
        npm start
    ```

    yarn
    ``` bash
        yarn start
    ```

## Objetivo
    
   Neste desafio você deve criar dois contêineres, um para rodar a aplicação node e um para hospedar o banco de dados postgres. É obrigatório o uso de docker-compose para inciar os dois containers juntos.

   Faz parte do trabalho de um SRE garantir que as aplicações estejam sempre no ar, então quando houver algum problema com a aplicação, a maquina for desligada inesperadamente ou o código falhar e encerrar a execução, ela deve voltar a funcionar o mais rápido possível.

   O código do site e o banco de dados deve ser hospedado em uma máquina EC2 na aws, deve ser possível acessar as rodas do backend e a pagina principal do site pela internet.
   
    

## Rotas

POST addr:port/create ->

parâmetros:
body {
    name: <value>,
    hour: <value>
}

salva os dados no banco de dados, e se repetir o mesmo nome a aplicação falha e é encerrada com código 1


GET addr:port/getInfo ->

Retorna todos os dados salvos no banco de dados