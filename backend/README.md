# Charity API

## How to use migrations

#### Commands:

#### Create tables
```
npm run typeorm migration:run
```

#### Erase tables
```
npm run typeorm migration:revert
```

## How to config your database

Edit *ormconfig.json*

```
{
  "type": "postgres",
  "host": "your_host",
  "port": 5434,
  "username": "your_username",
  "password": "your_password",
  "database": "charity",
  "migrations": [
    "./src/database/migrations/*.ts"
  ],
  "entities": [
    "./src/models/*.ts"
  ],
  "cli": {
    "migrationsDir": "./src/database/migrations"
  }
}
```

And create your database via SQL

    CREATE DATABASE charity;

## How to start

    npm run dev