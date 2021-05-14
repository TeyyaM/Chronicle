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
const getEntryByCategory = (attributes, params) => {
    const { categoryId, userId } = attributes;
    const { startDate, endDate, mood, limit } = params;
    const queryParams = [userId];
    let queryStart = 'SELECT ';
    let queryMid = ' FROM entries';
    let queryEnd = ' WHERE entries.user_id = $1';
    if (categoryId === '0') {
        queryStart += '*';
        queryEnd += ` AND category_id IS NULL`;
    }
    else {
        queryStart += 'entries.*, categories.name as category_name';
        queryMid += ' JOIN categories ON entries.category_id = categories.id';
        if (categoryId) {
            queryParams.push(categoryId);
            queryEnd += ' AND category_id = $2';
        }
    }
    if (startDate) {
        queryParams.push(startDate);
        queryEnd += ` AND date_created > $${queryParams.length}`;
    }
    if (endDate) {
        queryParams.push(endDate);
        queryEnd += ` AND date_created < $${queryParams.length}`;
    }
    if (mood && mood !== 'all' && mood !== 'null') {
        queryParams.push(mood);
        queryEnd += ` AND mood = $${queryParams.length}`;
    }
    if (mood === 'null') {
        queryEnd += ` AND mood IS NULL`;
    }
    if (limit) {
        queryParams.push(limit);
        queryEnd += ` LIMIT $${queryParams.length}`;
    }
    let query = queryStart + queryMid + queryEnd;
    console.log(query);
    return pool.query(query, queryParams);
};
const getEntryByEntryId = (attributes) => {
    const { entryId, userId } = attributes;
    const query = `SELECT * FROM entries
  WHERE user_id = $1 AND id = $2;`;
    const queryParams = [userId, entryId];
    return pool.query(query, queryParams);
};
const getGraphByUserId = (userId, params) => {
    const { type, startDate, endDate } = params;
    const queryParams = [userId];
    let queryStart = 'SELECT mood, ';
    let queryMid = ' FROM entries WHERE user_id = $1 AND mood IS NOT NULL ';
    let queryEnd = '';
    if (type === 'line') {
        queryStart += `TO_CHAR(date_created, 'YYYY-MM-DD') as date`;
        queryEnd = 'ORDER BY date_created';
    }
    if (type === 'pie') {
        queryStart += 'count(*) as entries';
        queryEnd = 'GROUP BY mood';
    }
    if (startDate && endDate) {
        queryMid += 'AND date_created BETWEEN $2 and $3';
        queryParams.push(startDate, endDate);
    }
    else {
        if (startDate) {
            queryMid += `AND date_created > $2 `;
            queryParams.push(startDate);
        }
        if (endDate) {
            queryMid += `AND date_created < $2 `;
            queryParams.push(endDate);
        }
    }
    const query = queryStart + queryMid + queryEnd;
    return pool.query(query, queryParams);
};
const getCategories = (userId) => {
    const query = `SELECT * FROM categories
  WHERE user_id = $1`;
    const queryParams = [userId];
    return pool.query(query, queryParams);
};
const getUserByUserId = (id) => {
    const query = `
  SELECT users.*,
  fonts.script as body_script,
  title.script as title_script
  FROM users 
  JOIN fonts ON users.body_font_id = fonts.id 
  JOIN (
    SELECT fonts.*, users.id as user_id
    FROM users 
    JOIN fonts ON users.title_font_id = fonts.id 
    WHERE users.id = $1
  ) as title
  ON users.id = title.user_id
    WHERE users.id = $1;`;
    const queryParams = [id];
    return pool.query(query, queryParams);
};
const getUsers = () => {
    const query = 'SELECT * FROM users';
    return pool.query(query);
};
const getFontByFontId = (id) => {
    const query = `SELECT * FROM fonts
  WHERE id = $1;`;
    const queryParams = [id];
    return pool.query(query, queryParams);
};
const getFonts = () => {
    const query = 'SELECT * FROM fonts';
    return pool.query(query);
};
const insertIntoDatabase = (attributes, table) => {
    const queryParams = [];
    let queryStart = `INSERT INTO ${table} (`;
    let queryMid = ') VALUES (';
    let queryEnd = ') RETURNING id';
    for (const [attribute, value] of Object.entries(attributes)) {
        if (queryParams.length) {
            queryStart += ', ';
            queryMid += ', ';
        }
        queryParams.push(value);
        queryStart += `${attribute}`;
        queryMid += `$${queryParams.length}`;
    }
    if (table !== 'users') {
        queryEnd += ', user_id as userId';
    }
    const queryString = queryStart + queryMid + queryEnd;
    console.log(queryString);
    return pool.query(queryString, queryParams);
};
const insertCategory = (attributes) => {
    return insertIntoDatabase(attributes, 'categories');
};
const insertEntry = (attributes) => {
    return insertIntoDatabase(attributes, 'entries');
};
const insertUser = (attributes) => {
    return insertIntoDatabase(attributes, 'users');
};
App.use(Express.urlencoded({ extended: false }));
App.use(Express.json());
App.use(Express.static('public'));
const userId = '1';
App.get('/api/entries', (req, res) => {
    getEntryByCategory({ categoryId: null, userId }, req.query)
        .then((data) => res.json(data.rows));
});
App.get('/api/entries/:id', (req, res) => {
    getEntryByEntryId({ entryId: req.params.id, userId })
        .then((data) => res.json(data.rows));
});
App.get('/api/categories', (req, res) => {
    getCategories(userId)
        .then((data) => res.json(data.rows));
});
App.get('/api/categories/:id', (req, res) => {
    getEntryByCategory({ categoryId: req.params.id, userId }, req.query)
        .then((data) => res.json(data.rows));
});
App.get('/api/users', (req, res) => {
    getUsers()
        .then((data) => res.json(data.rows));
});
App.get('/api/users/:id', (req, res) => {
    getUserByUserId(req.params.id)
        .then((data) => res.json(data.rows));
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
    console.log(attributes);
    insertEntry(attributes)
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
