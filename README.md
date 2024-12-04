Task Manager API
Uma API para autenticação de usuários e gerenciamento de tarefas com monitoramento e testes de carga. Esta API é projetada para facilitar o gerenciamento de tarefas associadas a usuários autenticados.

📋 Funcionalidades
Autenticação de Usuários

Registro de novos usuários.
Login e autenticação JWT.
Gerenciamento de Tarefas

Criação, listagem, atualização e exclusão de tarefas associadas a usuários autenticados.
Monitoramento

Monitoramento de métricas com Prometheus.
Testes

Testes unitários com Jest e Supertest.
Testes de carga e desempenho com Artillery.
🛠️ Tecnologias e Dependências
O projeto utiliza as seguintes tecnologias e bibliotecas:

Dependências
express: Framework para construção da API.
dotenv: Gerenciamento de variáveis de ambiente.
bcryptjs: Hashing seguro de senhas.
jsonwebtoken: Geração e validação de tokens JWT.
@prisma/client: ORM para manipulação do banco de dados.
swagger-jsdoc e swagger-ui-express: Documentação da API.
express-prometheus-middleware: Monitoramento com Prometheus.
json2xml: Conversão de JSON para XML.
Dependências de Desenvolvimento
jest: Biblioteca para testes unitários.
supertest: Testes de endpoints.
nodemon: Monitoramento e reinício automático do servidor.
🔧 Instalação e Execução
Pré-requisitos
Node.js instalado (versão 18 ou superior).
Banco de dados MySQL configurado.
Java instalado (para Artillery, se necessário).

Configuração
1 - Clone o repositório:
git clone <seu-repositorio-github>
cd task_av2

2- Instale as dependências:
npm install

3- Configure o arquivo .env
DATABASE_URL="mysql://<usuário>:<senha>@localhost:3306/<nome-do-banco>"
JWT_SECRET="sua-chave-secreta"

4- Execute as migrações do banco de dados:
npx prisma migrate dev

5- npm start       O servidor estará disponível em http://localhost:3000.

🧪 Testes
-Testes Unitários
Para executar os testes unitários:
npm test

-Testes de Carga
Execute os testes de carga com o Artillery:
artillery run test.yml

Os resultados estarão disponíveis no terminal.

-Testes de Monitoramento
Acesse http://localhost:3000/metrics para verificar as métricas expostas.

📄 Documentação da API
A documentação da API foi gerada com Swagger e está disponível no SwaggerHub: https://app.swaggerhub.com/apis/VINICIUSOS95/TaskManagerAPIII/1

🚀 Hospedagem
A API está hospedada na Railway. Utilize o link funcional para acesso: Task Manager API - Railway
