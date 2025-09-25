
#!/bin/bash

# Orchestrator Agent - Exemplos de Uso da API
# Configure a variável API_KEY antes de executar os exemplos

# Configuração
API_KEY="your-secret-api-key-here"
BASE_URL="http://localhost:8080"

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Orchestrator Agent - Exemplos de API${NC}"
echo "=================================================="

# Verificar se API_KEY está configurada
if [ "$API_KEY" = "your-secret-api-key-here" ]; then
    echo -e "${RED}❌ Configure a variável API_KEY antes de executar os exemplos${NC}"
    echo "Edite este arquivo e substitua 'your-secret-api-key-here' pela sua chave real"
    exit 1
fi

# Função para fazer requisições
make_request() {
    local method=$1
    local endpoint=$2
    local data=$3
    local description=$4
    
    echo -e "\n${YELLOW}📡 $description${NC}"
    echo "Endpoint: $method $endpoint"
    
    if [ -n "$data" ]; then
        echo "Payload: $data"
        response=$(curl -s -X $method "$BASE_URL$endpoint" \
            -H "Authorization: Bearer $API_KEY" \
            -H "Content-Type: application/json" \
            -d "$data")
    else
        response=$(curl -s -X $method "$BASE_URL$endpoint" \
            -H "Authorization: Bearer $API_KEY")
    fi
    
    echo -e "${GREEN}Resposta:${NC}"
    echo "$response" | python3 -m json.tool 2>/dev/null || echo "$response"
    
    # Extrair task_id se presente
    task_id=$(echo "$response" | python3 -c "import sys, json; data=json.load(sys.stdin); print(data.get('task_id', ''))" 2>/dev/null)
    if [ -n "$task_id" ]; then
        echo -e "${BLUE}Task ID: $task_id${NC}"
        return 0
    fi
    return 1
}

# 1. Health Check
make_request "GET" "/" "" "Health Check"

# 2. Deploy API
echo -e "\n${BLUE}=== DEPLOY TASKS ===${NC}"

deploy_api_payload='{
  "type": "deploy",
  "service": "api",
  "branch": "main"
}'

if make_request "POST" "/task" "$deploy_api_payload" "Deploy API Service"; then
    api_task_id=$task_id
fi

# 3. Deploy Web
deploy_web_payload='{
  "type": "deploy",
  "service": "web",
  "branch": "main"
}'

if make_request "POST" "/task" "$deploy_web_payload" "Deploy Web Service"; then
    web_task_id=$task_id
fi

# 4. DNS Sync
echo -e "\n${BLUE}=== DNS TASKS ===${NC}"

dns_sync_payload='{
  "type": "dns_sync",
  "domain": "paranhospr.com.br",
  "apiCNAME": "api.render.com",
  "webCNAME": "web.render.com",
  "redirect_root": true,
  "targets": ["www.paranhospr.com.br", "paranhospr.com.br"]
}'

if make_request "POST" "/task" "$dns_sync_payload" "Sync DNS Records"; then
    dns_task_id=$task_id
fi

# 5. Import Municípios
echo -e "\n${BLUE}=== DATABASE TASKS ===${NC}"

import_payload='{
  "type": "import_municipios",
  "xlsx_url": "https://example.com/municipios.xlsx",
  "sheet": 0
}'

if make_request "POST" "/task" "$import_payload" "Import Municipalities"; then
    import_task_id=$task_id
fi

# 6. Verify Services
echo -e "\n${BLUE}=== VERIFICATION TASKS ===${NC}"

verify_payload='{
  "type": "verify",
  "targets": [
    "https://api.paranhospr.com.br",
    "https://paranhospr.com.br",
    "https://www.paranhospr.com.br"
  ]
}'

if make_request "POST" "/task" "$verify_payload" "Verify Service Health"; then
    verify_task_id=$task_id
fi

# 7. Comment on PR
echo -e "\n${BLUE}=== GITHUB TASKS ===${NC}"

comment_pr_payload='{
  "type": "comment_pr",
  "repo": "luishspontes/paranhospr.com.br",
  "pr": 1,
  "message": "🚀 Deploy realizado com sucesso!\n\n✅ API: Deployed\n✅ Web: Deployed\n✅ DNS: Synced\n✅ Health Check: Passed"
}'

if make_request "POST" "/task" "$comment_pr_payload" "Comment on PR"; then
    comment_task_id=$task_id
fi

# 8. Check Task Status
echo -e "\n${BLUE}=== STATUS CHECKS ===${NC}"

# Aguardar um pouco para as tarefas processarem
echo -e "${YELLOW}⏳ Aguardando 5 segundos para as tarefas processarem...${NC}"
sleep 5

# Verificar status das tarefas criadas
if [ -n "$api_task_id" ]; then
    make_request "GET" "/status/$api_task_id" "" "Status do Deploy API"
fi

if [ -n "$dns_task_id" ]; then
    make_request "GET" "/status/$dns_task_id" "" "Status do DNS Sync"
fi

if [ -n "$verify_task_id" ]; then
    make_request "GET" "/status/$verify_task_id" "" "Status da Verificação"
fi

# 9. List Recent Tasks
echo -e "\n${BLUE}=== TASK LISTING ===${NC}"

make_request "GET" "/tasks?limit=10&offset=0" "" "List Recent Tasks"

# 10. Exemplos de Payloads Inválidos (para testar validação)
echo -e "\n${BLUE}=== VALIDATION TESTS ===${NC}"

invalid_deploy='{
  "type": "deploy",
  "service": "invalid_service"
}'

make_request "POST" "/task" "$invalid_deploy" "Invalid Deploy Service (should fail)"

invalid_dns='{
  "type": "dns_sync",
  "domain": "example.com"
}'

make_request "POST" "/task" "$invalid_dns" "Incomplete DNS Payload (should fail)"

# 11. Exemplos com diferentes branches
echo -e "\n${BLUE}=== BRANCH DEPLOYMENT EXAMPLES ===${NC}"

deploy_dev_payload='{
  "type": "deploy",
  "service": "api",
  "branch": "development"
}'

make_request "POST" "/task" "$deploy_dev_payload" "Deploy API from Development Branch"

deploy_feature_payload='{
  "type": "deploy",
  "service": "web",
  "branch": "feature/new-ui"
}'

make_request "POST" "/task" "$deploy_feature_payload" "Deploy Web from Feature Branch"

# 12. Verificação de múltiplos targets
echo -e "\n${BLUE}=== MULTI-TARGET VERIFICATION ===${NC}"

multi_verify_payload='{
  "type": "verify",
  "targets": [
    "https://api.paranhospr.com.br/health",
    "https://paranhospr.com.br",
    "https://www.paranhospr.com.br",
    "https://admin.paranhospr.com.br",
    "https://docs.paranhospr.com.br"
  ]
}'

make_request "POST" "/task" "$multi_verify_payload" "Multi-Target Health Check"

# 13. DNS com múltiplos targets
echo -e "\n${BLUE}=== COMPLEX DNS CONFIGURATION ===${NC}"

complex_dns_payload='{
  "type": "dns_sync",
  "domain": "paranhospr.com.br",
  "apiCNAME": "api-production.render.com",
  "webCNAME": "web-production.render.com",
  "redirect_root": true,
  "targets": [
    "www.paranhospr.com.br",
    "admin.paranhospr.com.br",
    "docs.paranhospr.com.br",
    "blog.paranhospr.com.br"
  ]
}'

make_request "POST" "/task" "$complex_dns_payload" "Complex DNS Configuration"

# 14. Importação com sheet específica
echo -e "\n${BLUE}=== ADVANCED IMPORT EXAMPLES ===${NC}"

advanced_import_payload='{
  "type": "import_municipios",
  "xlsx_url": "https://www.ibge.gov.br/explica/codigos-dos-municipios.xlsx",
  "sheet": 1
}'

make_request "POST" "/task" "$advanced_import_payload" "Import from Specific Sheet"

echo -e "\n${GREEN}✅ Todos os exemplos foram executados!${NC}"
echo -e "${YELLOW}💡 Dicas:${NC}"
echo "- Use GET /tasks para ver todas as tarefas"
echo "- Use GET /status/{task_id} para acompanhar o progresso"
echo "- Configure AUTO_FIX=true para auto-remediação"
echo "- Configure ENABLE_HUMAN_GATE=true para aprovação manual"
echo ""
echo -e "${BLUE}📚 Para mais informações, consulte o README.md${NC}"
