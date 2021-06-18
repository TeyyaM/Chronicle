import Express from "express";
const App = Express();
const PORT = 8080;
import dotenv from 'dotenv';
dotenv.config();
import pg from 'pg';
const connectionString = process.env.DATABASE_URL ||
    `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=disable`;
const pool = new pg.Pool({ connectionString });
pool.connect()
    .catch(e => console.log(`Error connecting to Postgres server:\n${e}`));
import generateDatabaseHelpers from './db/helpers/helpers.js';
const { getEntriesByCategory, getEntryByEntryId, getGraphByUserId, getCategories, getUserByUserId, getUserIdByLogin, getUsers, getFontByFontId, getFonts, insertCategory, insertEntry, insertUser, updateDatabase } = generateDatabaseHelpers(pool);
App.use(Express.urlencoded({ extended: false }));
App.use(Express.json());
App.use(Express.static('public'));
const userId = '1';
App.get('/api/entries', (req, res) => {
    getEntriesByCategory(userId, req.query)
        .then((data) => res.json(data.rows));
});
App.get('/api/entries/:entryId', (req, res) => {
    getEntryByEntryId({ entryId: req.params.entryId, userId })
        .then((data) => res.json(data.rows));
});
App.get('/api/categories', (req, res) => {
    getCategories(userId)
        .then((data) => res.json(data.rows));
});
App.get('/api/users-list', (req, res) => {
    getUsers()
        .then((data) => res.json(data.rows));
});
App.get('/api/users', (req, res) => {
    const { username, password } = req.query;
    getUserIdByLogin(username, password)
        .then((data) => getUserByUserId(data.rows[0] ? data.rows[0].id : null))
        .then((data) => res.json(data ? data.rows[0] : null))
        .catch(error => console.log('Error:', error));
});
App.get('/api/fonts', (req, res) => {
    getFonts()
        .then((data) => res.json(data.rows));
});
App.get('/api/fonts/:id', (req, res) => {
    getFontByFontId(req.params.id)
        .then((data) => res.json(data.rows));
});
App.get('/api/graph/', (req, res) => {
    getGraphByUserId(userId, req.query)
        .then((data) => res.json(data.rows));
});
App.post('/api/entries', (req, res) => {
    const attributes = {
        title: req.body.title,
        content: req.body.content,
        mood: req.body.mood || null,
        privacy: req.body.privacy || true,
        user_id: req.body.userId,
        category_id: req.body.category || null
    };
    insertEntry(attributes)
        .then((data) => res.json(data.rows));
});
App.post('/api/entries/:id', (req, res) => {
    updateDatabase(req.body.params, { table: 'entries', type: 'update', id: req.params.id })
        .then((data) => res.json(data.rows));
});
App.post('/api/users/:id', (req, res) => {
    updateDatabase(req.body.params, { table: 'users', type: 'update', id: req.params.id })
        .then((data) => res.json(data.rows));
});
App.delete('/api/entries/:id', (req, res) => {
    updateDatabase(req.body, { table: 'entries', type: 'delete', id: req.params.id })
        .then((data) => res.json(data.rows));
});
App.post('/api/categories', (req, res) => {
    insertCategory({ user_id: userId, name: req.body.name })
        .then((data) => res.json(data.rows));
});
App.post('/api/users', (req, res) => {
    const attributes = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };
    insertUser(attributes)
        .then((data) => res.json(data.rows));
});
App.listen(PORT, () => {
    console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});
