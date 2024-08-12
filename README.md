## Setup

```bash
npm install
cp .env.example .env
docker compose up -d
```

```txt
# .env
DB_DATABASE=postgres
```

```bash
node ace migration:run
node ace db:seed
```

## Development

```bash
npm run dev
```
