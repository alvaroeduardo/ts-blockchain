# Iniciando o Projeto ts-blockchain

Este é um guia passo a passo para ajudá-lo a iniciar o projeto **ts-blockchain** - uma implementação de uma Blockchain com TypeScript.

## Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em seu sistema antes de começar.

## Passo 1: Clonar o Repositório

Clone o repositório do projeto em seu ambiente local usando o seguinte comando:

```bash
git clone https://github.com/alvaroeduardo/ts-blockchain
```

## Passo 2: Instalar Dependências

Navegue até o diretório do projeto e instale as dependências usando o npm. Execute o seguinte comando no terminal:

```bash
cd ts-blockchain
npm install
```

Isso instalará todas as dependências listadas no arquivo `package.json`, incluindo o TypeScript e outras ferramentas necessárias.

## Modo de Desenvolvimento

Se preferir um ambiente de desenvolvimento com reinicialização automática, você pode usar o seguinte comando:

```bash
npm run dev
```

Isso utiliza o `ts-node-dev` para reiniciar automaticamente o aplicativo sempre que detecta alterações nos arquivos TypeScript.

# Explicando o Projeto

Implementamos uma estrutura simples de blockchain usando TypeScript. Vamos analisar as principais partes do código:

1. **Importação de Funções Auxiliares:**
   ```typescript
   import { hash, validatedHash } from "./helpers"
   ```
   O código importa duas funções chamadas `hash` e `validatedHash` de um módulo ou arquivo chamado "helpers". Essas funções provavelmente são responsáveis por calcular hashes e validar hashes de acordo com algum critério.

2. **Definição das Interfaces:**
   ```typescript
   export interface Block {
       // ...
   }
   ```
   Define a interface `Block` que representa a estrutura de um bloco na blockchain. Um bloco contém um cabeçalho (`header`) e um payload (`payload`). O cabeçalho inclui um número de nonce e o hash do bloco. O payload contém informações como a sequência do bloco, o carimbo de data/hora, os dados e o hash do bloco anterior.

3. **Definição da Classe Blockchain:**
   ```typescript
   export class Blockchain {
       // ...
   }
   ```
   Define a classe `Blockchain` que encapsula a lógica da blockchain. Algumas características principais da classe incluem:
   - Uso de uma propriedade privada `#chain` para armazenar os blocos da blockchain.
   - Uso de um valor privado `powPrefix` e uma dificuldade para a prova de trabalho (Proof of Work).
   - Um construtor que cria o bloco inicial (Genesis block).
   - Métodos para criar blocos, minerar blocos, verificar a validade de um bloco e adicionar blocos à blockchain.

4. **Métodos Importantes:**
   - `createGenesisBlock`: Cria o bloco inicial da blockchain.
   - `lastBlock`: Retorna o último bloco na cadeia.
   - `hashLastBlock`: Retorna o hash do último bloco.
   - `createBlock`: Cria um novo bloco com base nos dados fornecidos.
   - `mineBlock`: Realiza o processo de mineração para encontrar um hash que atenda aos requisitos de dificuldade.
   - `checkBlock`: Verifica se um bloco é válido com base no bloco anterior e na prova de trabalho.
   - `sendBlock`: Adiciona um bloco à blockchain após verificar sua validade.

5. **Uso de Hashes e Prova de Trabalho:**
   O código usa funções de hash para calcular hashes de blocos e verifica se o hash atende aos requisitos de dificuldade especificados na prova de trabalho.

6. **Console Logging:**
   O código contém instruções `console.log` para fornecer informações sobre a criação e mineração de blocos.

# Imagens do Projeto Rodando

![](https://imgur.com/jQnilla.png)
![](https://imgur.com/vF0dkfm.png)

# Direitos Autorais

© 2023 **Alvaro Eduardo Silva**. Todos os direitos reservados.

Este projeto é protegido por direitos autorais e destinado apenas para fins educacionais e de desenvolvimento. Qualquer uso não autorizado, reprodução ou distribuição sem a permissão expressa do autor é estritamente proibido.

---

Agradecemos por respeitar os direitos autorais e contribuir para a comunidade de desenvolvimento! 📚✨