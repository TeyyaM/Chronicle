import Express, { Request, Response } from "express";
const App = Express();
const PORT = 8080;
import dotenv from 'dotenv';
dotenv.config();

// Setup database for queries
import pg from 'pg';
const connectionString = process.env.DATABASE_URL ||
    `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=disable`;
const pool = new pg.Pool({connectionString});
pool.connect()
  .catch(e => console.log(`Error connecting to Postgres server:\n${e}`));

import generateDatabaseHelpers from './db/helpers/helpers.js';

// The custom helper functions routes use
const { 
  getEntriesByCategory,
  getEntryByEntryId,
  getGraphByUserId,
  getCategories,
  getUserByUserId,
  getUserIdByLogin,
  getUsers,
  getFontByFontId,
  getFonts,
  insertCategory,
  insertEntry,
  insertUser,
  updateDatabase } = generateDatabaseHelpers(pool);

// Express Configuration
App.use(Express.urlencoded({ extended: false }));
App.use(Express.json());
App.use(Express.static('public'));

// Hardcoded userId for development
const userId = '1';

App.get('/api/entries', (req: Request, res: Response) => {
  getEntriesByCategory(userId, req.query)
  .then((data) => res.json(data.rows));
});

App.get('/api/entries/:entryId', (req: Request, res: Response) => {
  getEntryByEntryId({entryId: req.params.entryId, userId})
  .then((data) => res.json(data.rows));
});

App.get('/api/categories', (req: Request, res: Response) => {

  getCategories(userId)
  .then((data) => res.json(data.rows));
});

// Dev only, remove later
App.get('/api/users-list', (req: Request, res: Response) => {
  getUsers()
  .then((data) => res.json(data.rows));
});

App.get('/api/users', (req: Request, res: Response) => {
  const { username, password } = req.query as { username: string, password: string };
  // Returns null to the front end if there's no matching user
  getUserIdByLogin(username, password)
  .then((data) => getUserByUserId(data.rows[0] ? data.rows[0].id : null))
  .then((data) => res.json(data ? data.rows[0] : null))
  .catch(error => console.log('Error:', error));

});

// Dev only, delete later
// App.get('/api/users/:id', (req: Request, res: Response) => {
//    getUserByUserId(req.params.id)
//    .then((data) => res.json(data.rows));
// });

App.get('/api/fonts', (req: Request, res: Response) => {

  getFonts()
  .then((data) => res.json(data.rows));
});

App.get('/api/fonts/:id', (req: Request, res: Response) => {
  getFontByFontId(req.params.id)
  .then((data) => res.json(data.rows));
});

App.get('/api/graph/', (req: Request, res: Response) => {
  getGraphByUserId(userId, req.query)
  .then((data) => res.json(data.rows));
});

App.post('/api/entries', (req: Request, res: Response) => {
  const attributes = {
    title: req.body.title,
    content: req.body.content,
    mood: req.body.mood || null,
    privacy: req.body.privacy || true,
    user_id: req.body.userId,
    category_id: req.body.category || null
  }
  insertEntry(attributes)
  .then((data) => res.json(data.rows));
});

App.post('/api/entries/:id', (req: Request, res: Response) => {
  updateDatabase(req.body.params, { table: 'entries', type: 'update', id: req.params.id })
  .then((data) => res.json(data.rows));
});

App.post('/api/users/:id', (req: Request, res: Response) => {
  updateDatabase(req.body.params, { table: 'users', type: 'update', id: req.params.id })
  .then((data) => res.json(data.rows));
});

App.delete('/api/entries/:id', (req: Request, res: Response) => {
  updateDatabase(req.body, { table: 'entries', type: 'delete', id: req.params.id })
  .then((data) => res.json(data.rows));
});

App.post('/api/categories', (req: Request, res: Response) => {
  insertCategory({user_id: userId, name: req.body.name})
  .then((data) => res.json(data.rows));
});

App.post('/api/users', (req: Request, res: Response) => {
  const attributes = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }
  insertUser(attributes)
  .then((data) => res.json(data.rows));
});

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});
