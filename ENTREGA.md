# Entrega — José Emanuel de Oliveira Sousa

> Preencha este arquivo. Ele nos ajuda a rodar e entender o seu projeto.

## Como rodar

```bash
git clone git@github.com:Emanueltyc/dev-junior-challenge.git
cd dev-junior-challenge
docker compose up --build -d
```

## O que foi feito

Api em Nest + TypeScript
PostgreSQL para persistência de dados
Um teste unitário simples para a criação de check-in
Frontend em React + Vite
Shadcn + Tailwindcss
Docker

## Onde guardei os dados

Utilizei o banco de dados PostgreSQL pois já possuo experiência com bancos de dados relacionais e ORMs.

## Decisões e dificuldades

Houveram pontos de dificuldade na configuração do docker e do teste unitário

## O que faria com mais tempo

Implementaria mais testes para a API, como um teste de busca de check-ins com diversos filtros.

O frontend poderia ser melhorado pensando em um cenário com centenas ou mais de check-ins na fila. Atualmente busca todo o histórico de check-ins, então poderia ser implementado um sistema de filtro melhor.
