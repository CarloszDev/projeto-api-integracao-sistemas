# Arquitetura da Solução - API de Alerta de Alagamentos

## 1. Visão Geral

A arquitetura desta solução foi projetada para ser simples, modular e escalável, funcionando como um *middleware* central que orquestra a comunicação entre dispositivos de campo (sensores) e sistemas de notificação. A API foi desenvolvida em Node.js com o framework Express.js, garantindo alta performance e um ecossistema robusto.

## 2. Componentes da Arquitetura

1.  **Sensores IoT (Sistema de Entrada):** Dispositivos físicos responsáveis por medir o nível da água em locais estratégicos da cidade. Eles se comunicam com nossa API enviando dados via requisições HTTP POST.
2.  **API REST (Nosso Projeto):** O núcleo do sistema. Ela é responsável por:
    * Receber e validar os dados dos sensores.
    * Processar a lógica de negócio (neste caso, registrar um alerta).
    * Armazenar os alertas em uma base de dados (simulada em memória).
    * Integrar-se com o sistema de notificação para disparar os alertas.
    * Fornecer um endpoint para consulta dos alertas recentes.
3.  **Serviço de Notificação (Sistema de Saída):** Um sistema externo (simulado) que recebe o comando da nossa API para enviar notificações de emergência para a Defesa Civil, cidadãos via aplicativo, SMS, etc.
4.  **Clientes de Monitoramento (Consumidores de Dados):** Aplicações como dashboards da prefeitura ou aplicativos para cidadãos que consomem os dados da nossa API via HTTP GET para exibir os alertas mais recentes.

## 3. Diagrama de Fluxo de Dados

O diagrama abaixo ilustra o fluxo de comunicação entre os componentes:

[Sensor IoT] --(1. Envia dados via HTTP POST)--> [API de Alerta (Express.js)]
|
|--(2. Valida, processa e armazena o alerta)--> [Banco de Dados (Em memória)]
|
|--(3. Dispara notificação)--> [Serviço de Notificação Externo]

[Dashboard/App] --(4. Consulta alertas via HTTP GET)--> [API de Alerta (Express.js)] --(5. Retorna dados dos alertas)--> [Dashboard/App]


## 4. Protocolo de Comunicação

O protocolo escolhido para toda a comunicação com a API foi o **REST/HTTP**, por sua simplicidade, ampla adoção no mercado e por ser stateless, o que facilita a escalabilidade da solução.

* **Verbos HTTP Utilizados:**
    * `POST`: Para criação de novos recursos (alertas).
    * `GET`: Para leitura de recursos (consultar alertas).
* **Formato de Dados:** O formato `JSON` foi utilizado para o corpo das requisições e respostas, por ser leve e facilmente interpretável por praticamente qualquer linguagem de programação.