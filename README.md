
# Orchestrator Agent

Um sistema completo de orquestração de tarefas DevOps usando LangGraph + FastAPI. O sistema executa tarefas como deploy, DNS, importação de planilhas para Supabase, verificação de saúde, etc., através de webhooks REST.

## 🚀 Características

- **Orquestração Inteligente**: Usa LangGraph para fluxo de trabalho com planejamento, execução, verificação e auto-remediação
- **API REST**: Endpoints FastAPI para execução de tarefas e monitoramento de status
- **Múltiplas Integrações**: GitHub, Render, Cloudflare, Supabase, Google Calendar
- **Auto-remediação**: Tentativas automáticas de correção em caso de falha
- **Persistência**: Armazenamento SQLite para estado das tarefas
- **Containerizado**: Docker e docker-compose prontos para produção

## 📋 Tipos de Tarefas Suportadas

### 1. Deploy (`deploy`)
```json
{
  "type": "deploy",
  "service": "api|web",
  "branch": "main"
}
```

### 2. Sincronização DNS (`dns_sync`)
```json
{
  "type": "dns_sync",
  "domain": "example.com",
  "apiCNAME": "api.render.com",
  "webCNAME": "web.render.com",
  "redirect_root": true,
  "targets": ["www.example.com"]
}
```

### 3. Importação de Municípios (`import_municipios`)
```json
{
  "type": "import_municipios",
  "xlsx_url": "https://example.com/municipios.xlsx",
  "sheet": 0
}
```

### 4. Verificação de Saúde (`verify`)
```json
{
  "type": "verify",
  "targets": ["https://api.example.com", "https://web.example.com"]
}
```

### 5. Comentário em PR (`comment_pr`)
```json
{
  "type": "comment_pr",
  "repo": "owner/repo",
  "pr": 123,
  "message": "Deploy realizado com sucesso!"
}
```

## 🛠️ Instalação e Configuração

### 1. Clone o repositório
```bash
git clone <repository-url>
cd orchestrator-agent
```

### 2. Configure as variáveis de ambiente
```bash
cp .env.example .env
# Edite o arquivo .env com suas credenciais
```

### 3. Variáveis Obrigatórias

```bash
# Autenticação da API
AGENT_API_KEY=your-secret-api-key-here

# GitHub
GITHUB_TOKEN=ghp_your_github_token_here  # Gerado por luishspontes@gmail.com
GITHUB_OWNER=luishspontes
GITHUB_REPO=paranhospr.com.br

# Render Deploy Hooks
RENDER_DEPLOY_HOOK_API=https://api.render.com/deploy/srv-your-api-service-id
RENDER_DEPLOY_HOOK_WEB=https://api.render.com/deploy/srv-your-web-service-id

# Cloudflare
CLOUDFLARE_API_TOKEN=your-cloudflare-api-token
CLOUDFLARE_ZONE_ID=your-cloudflare-zone-id

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE=your-supabase-service-role-key

# Google Calendar (Service Account)
GOOGLE_PROJECT_ID=your-google-project-id
GOOGLE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
GOOGLE_CALENDAR_ID=your-calendar-id@group.calendar.google.com
```

### 4. Executar com Docker (Recomendado)

```bash
# Build e start
docker-compose up --build

# Em background
docker-compose up -d --build

# Ver logs
docker-compose logs -f
```

### 5. Executar Localmente

```bash
# Instalar dependências
pip install -r requirements.txt

# Executar servidor
uvicorn app.server:app --host 0.0.0.0 --port 8080 --reload
```

## 📡 Uso da API

### Autenticação
Todas as requisições requerem header de autenticação:
```bash
Authorization: Bearer your-secret-api-key-here
```

### Endpoints Principais

#### POST /task - Executar Tarefa
```bash
curl -X POST "http://localhost:8080/task" \
  -H "Authorization: Bearer your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "deploy",
    "service": "api",
    "branch": "main"
  }'
```

Resposta:
```json
{
  "task_id": "uuid-here",
  "status": "running",
  "message": "Task deploy started successfully"
}
```

#### GET /status/{task_id} - Status da Tarefa
```bash
curl -X GET "http://localhost:8080/status/uuid-here" \
  -H "Authorization: Bearer your-api-key"
```

Resposta:
```json
{
  "task_id": "uuid-here",
  "status": "completed",
  "task_type": "deploy",
  "payload": {...},
  "result": {...},
  "error": null,
  "created_at": "2024-01-01T12:00:00",
  "updated_at": "2024-01-01T12:05:00"
}
```

#### GET /tasks - Listar Tarefas
```bash
curl -X GET "http://localhost:8080/tasks?limit=10&offset=0" \
  -H "Authorization: Bearer your-api-key"
```

## 🔧 Configurações Avançadas

### Auto-remediação
```bash
AUTO_FIX=true
MAX_FIX_ATTEMPTS=3
```

### Human Gate (Aprovação Manual)
```bash
ENABLE_HUMAN_GATE=true
HUMAN_GATE_TIMEOUT=300
```

### Verificação
```bash
VERIFY_TIMEOUT=30
VERIFY_MAX_RETRIES=3
```

## 🏗️ Arquitetura

### Fluxo do LangGraph
```
START → planner → {tool nodes} → verify → (auto_remediator se AUTO_FIX=true) → END
```

### Componentes Principais

1. **FastAPI Server** (`app/server.py`): API REST com endpoints
2. **LangGraph Orchestrator** (`app/graph.py`): Definição do fluxo de trabalho
3. **Tools** (`app/tools/`): Módulos de integração
4. **State Store** (`app/state_store.py`): Persistência SQLite
5. **Schemas** (`app/schemas.py`): Validação Pydantic

### Tools Disponíveis

- **GitHub Ops**: Comentários em PR, operações Git
- **Render Deploy**: Deploy de serviços API/Web
- **Cloudflare DNS**: Gerenciamento de registros DNS
- **Supabase DB**: Importação de dados, operações de banco
- **Google Calendar**: Eventos de calendário (placeholder)
- **Verifier**: Verificação de saúde de serviços
- **Human Gate**: Aprovação manual (placeholder)

## 🚀 Deploy no Render

### Build Command
```bash
pip install -r requirements.txt
```

### Start Command
```bash
uvicorn app.server:app --host 0.0.0.0 --port 8080
```

### Variáveis de Ambiente
Configure todas as variáveis obrigatórias no painel do Render.

## 📝 Exemplos de Uso

Veja o arquivo `scripts/curl_examples.sh` para exemplos completos de todas as operações.

### Deploy de API
```bash
curl -X POST "http://localhost:8080/task" \
  -H "Authorization: Bearer your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "deploy",
    "service": "api",
    "branch": "main"
  }'
```

### Sincronização DNS
```bash
curl -X POST "http://localhost:8080/task" \
  -H "Authorization: Bearer your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "dns_sync",
    "domain": "paranhospr.com.br",
    "apiCNAME": "api.render.com",
    "webCNAME": "web.render.com",
    "redirect_root": true,
    "targets": ["www.paranhospr.com.br"]
  }'
```

### Importação de Municípios
```bash
curl -X POST "http://localhost:8080/task" \
  -H "Authorization: Bearer your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "import_municipios",
    "xlsx_url": "https://example.com/municipios.xlsx",
    "sheet": 0
  }'
```

### Verificação de Saúde
```bash
curl -X POST "http://localhost:8080/task" \
  -H "Authorization: Bearer your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "verify",
    "targets": [
      "https://api.paranhospr.com.br",
      "https://paranhospr.com.br"
    ]
  }'
```

## 🔍 Monitoramento

### Health Check
```bash
curl http://localhost:8080/
```

### Status das Tarefas
```bash
# Listar tarefas recentes
curl -X GET "http://localhost:8080/tasks" \
  -H "Authorization: Bearer your-api-key"

# Status específico
curl -X GET "http://localhost:8080/status/task-id" \
  -H "Authorization: Bearer your-api-key"
```

## 🐛 Troubleshooting

### Logs do Docker
```bash
docker-compose logs -f orchestrator-agent
```

### Verificar Configuração
```bash
# Verificar variáveis de ambiente
docker-compose exec orchestrator-agent env | grep -E "(GITHUB|RENDER|CLOUDFLARE|SUPABASE)"

# Testar conectividade
docker-compose exec orchestrator-agent curl -I https://api.github.com
```

### Problemas Comuns

1. **Token GitHub inválido**: Verifique se o token foi gerado pela conta correta
2. **Deploy hooks Render**: Confirme as URLs dos webhooks
3. **Cloudflare API**: Verifique token e zone ID
4. **Supabase**: Confirme URL e service role key

## 📄 Licença

Este projeto é proprietário e confidencial.

## 🤝 Contribuição

Para contribuir com o projeto, entre em contato com a equipe de desenvolvimento.

---

**Nota**: Este sistema foi desenvolvido especificamente para o projeto paranhospr.com.br e requer configurações específicas das integrações mencionadas.
