# 💾 Guia de Banco de Dados - QubitSim

## 📋 Introdução

Este guia fornece diretrizes e boas práticas para o gerenciamento de banco de dados do QubitSim, garantindo a integridade e performance dos dados.

## 🏗️ Estrutura

### 1. Schema
```sql
-- Usuários
CREATE TABLE users (
  id UUID PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Simulações
CREATE TABLE simulations (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  algorithm VARCHAR(50) NOT NULL,
  parameters JSONB NOT NULL,
  result JSONB,
  status VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Resultados
CREATE TABLE results (
  id UUID PRIMARY KEY,
  simulation_id UUID REFERENCES simulations(id),
  data JSONB NOT NULL,
  metrics JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Índices
```sql
-- Índices para otimização
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_simulations_user_id ON simulations(user_id);
CREATE INDEX idx_simulations_status ON simulations(status);
CREATE INDEX idx_results_simulation_id ON results(simulation_id);
```

## 🔄 Migrações

### 1. Estrutura
```javascript
// migrations/001_initial_schema.js
exports.up = async (knex) => {
  await knex.schema.createTable('users', (table) => {
    table.uuid('id').primary();
    table.string('username', 50).unique().notNullable();
    table.string('email', 255).unique().notNullable();
    table.string('password_hash', 255).notNullable();
    table.timestamps(true, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('users');
};
```

### 2. Execução
```javascript
// Executar migrações
const runMigrations = async () => {
  try {
    await knex.migrate.latest();
    console.log('Migrações executadas com sucesso');
  } catch (error) {
    console.error('Erro ao executar migrações:', error);
    throw error;
  }
};
```

## 🔒 Segurança

### 1. Criptografia
```javascript
// Criptografia de dados sensíveis
const encryption = {
  // Chaves
  keys: {
    algorithm: 'aes-256-gcm',
    key: process.env.ENCRYPTION_KEY,
    iv: crypto.randomBytes(16)
  },
  
  // Funções
  encrypt: (data) => {
    const cipher = crypto.createCipheriv(
      encryption.keys.algorithm,
      encryption.keys.key,
      encryption.keys.iv
    );
    return Buffer.concat([
      cipher.update(JSON.stringify(data)),
      cipher.final()
    ]);
  },
  
  decrypt: (encrypted) => {
    const decipher = crypto.createDecipheriv(
      encryption.keys.algorithm,
      encryption.keys.key,
      encryption.keys.iv
    );
    return JSON.parse(
      Buffer.concat([
        decipher.update(encrypted),
        decipher.final()
      ]).toString()
    );
  }
};
```

### 2. Permissões
```sql
-- Permissões de usuário
GRANT SELECT ON users TO app_user;
GRANT INSERT, UPDATE ON users TO app_user;
GRANT DELETE ON users TO admin_user;

-- Permissões de simulação
GRANT SELECT ON simulations TO app_user;
GRANT INSERT, UPDATE ON simulations TO app_user;
GRANT DELETE ON simulations TO admin_user;
```

## 📊 Otimização

### 1. Queries
```javascript
// Otimização de queries
const queryOptimizer = {
  // Cache
  cache: new Map(),
  
  // Query com cache
  queryWithCache: async (key, query) => {
    if (queryOptimizer.cache.has(key)) {
      return queryOptimizer.cache.get(key);
    }
    const result = await query();
    queryOptimizer.cache.set(key, result);
    return result;
  },
  
  // Limpar cache
  clearCache: () => {
    queryOptimizer.cache.clear();
  }
};
```

### 2. Índices
```sql
-- Índices compostos
CREATE INDEX idx_simulations_user_status ON simulations(user_id, status);

-- Índices parciais
CREATE INDEX idx_active_simulations ON simulations(status)
WHERE status = 'active';

-- Índices de texto
CREATE INDEX idx_simulations_name ON simulations USING gin (to_tsvector('portuguese', name));
```

## 🔄 Backup

### 1. Backup Automático
```javascript
// Configuração de backup
const backupConfig = {
  // Agendamento
  schedule: '0 0 * * *', // Diário à meia-noite
  
  // Localização
  location: process.env.BACKUP_PATH,
  
  // Retenção
  retention: {
    daily: 7,
    weekly: 4,
    monthly: 12
  },
  
  // Execução
  execute: async () => {
    const timestamp = new Date().toISOString();
    const filename = `backup_${timestamp}.sql`;
    
    try {
      await exec(`pg_dump -Fc ${process.env.DATABASE_URL} > ${filename}`);
      await rotateBackups();
    } catch (error) {
      console.error('Erro no backup:', error);
      throw error;
    }
  }
};
```

### 2. Restauração
```javascript
// Procedimento de restauração
const restore = {
  // Verificar backup
  verify: async (backupFile) => {
    try {
      await exec(`pg_restore -l ${backupFile}`);
      return true;
    } catch (error) {
      console.error('Backup inválido:', error);
      return false;
    }
  },
  
  // Restaurar backup
  execute: async (backupFile) => {
    try {
      await exec(`pg_restore -d ${process.env.DATABASE_URL} ${backupFile}`);
      console.log('Backup restaurado com sucesso');
    } catch (error) {
      console.error('Erro na restauração:', error);
      throw error;
    }
  }
};
```

## 📈 Monitoramento

### 1. Métricas
```javascript
// Coletar métricas
const metrics = {
  // Queries lentas
  slowQueries: {
    threshold: 1000, // 1 segundo
    log: (query, duration) => {
      if (duration > metrics.slowQueries.threshold) {
        console.warn('Query lenta:', { query, duration });
      }
    }
  },
  
  // Conexões
  connections: {
    active: 0,
    max: 100,
    monitor: () => {
      if (metrics.connections.active > metrics.connections.max * 0.8) {
        console.warn('Alto número de conexões');
      }
    }
  }
};
```

### 2. Logs
```javascript
// Logs de banco de dados
const dbLogger = {
  // Queries
  queries: {
    log: (query, params) => ({
      timestamp: new Date().toISOString(),
      query,
      params,
      duration: query.duration
    })
  },
  
  // Erros
  errors: {
    log: (error) => ({
      timestamp: new Date().toISOString(),
      message: error.message,
      stack: error.stack,
      query: error.query
    })
  }
};
```

## 🔍 Manutenção

### 1. Vacuum
```sql
-- Vacuum automático
ALTER TABLE users SET (
  autovacuum_vacuum_scale_factor = 0.1,
  autovacuum_analyze_scale_factor = 0.05,
  autovacuum_vacuum_cost_delay = 20
);

-- Vacuum manual
VACUUM ANALYZE users;
VACUUM ANALYZE simulations;
VACUUM ANALYZE results;
```

### 2. Reindex
```sql
-- Reindexar tabelas
REINDEX TABLE users;
REINDEX TABLE simulations;
REINDEX TABLE results;

-- Reindexar índices específicos
REINDEX INDEX idx_users_email;
REINDEX INDEX idx_simulations_user_id;
```

## 📚 Recursos Adicionais

### Links Úteis
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Knex.js](https://knexjs.org/)
- [TypeORM](https://typeorm.io/)
- [Prisma](https://www.prisma.io/)

### Ferramentas
- pgAdmin
- DBeaver
- TablePlus
- Postico 