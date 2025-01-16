require('dotenv').config({
    path: '.env'
});

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    next();
});

// Configuração do pool de conexão com o PostgreSQL
const pool = new Pool({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Rota test
app.get('/', (req, res) => {
    res.send('Desafio Infra\n');
});

// bd new route
app.post('/create', async (req, res) => {
    const { name, hour } = req.body;

    try {
        const client = await pool.connect();
        await client.query(
            'INSERT INTO person (name, time) VALUES ($1, $2)',
            [name, hour]
        );
        client.release();
        res.status(201).send('Registro inserido com sucesso');
    } catch (err) {
        console.error(err);

        if (err.code === '23505') {
            res.status(400).send('Erro: Registro duplicado');
        } else {
            res.status(500).send('Erro no servidor');
        }
    }
});

app.get('/getInfo', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM person');
        client.release();
        res.send(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro no servidor');
    }
});

// server init
const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
    console.log(`Aplicação ouvindo na porta ${port}`);
});
