import pool from '../db/server.js';


export const getAllbooks = async(req, res) => {
    try {
        const result = await pool.query('SELECT * from books');
        res.json(result);
    } catch (error) {
        res.status(500).json({message:"something broke"});
    }
};

//Error Handler Middleware

// export const getAllbooks = async (req, res, next) => {
//     try {
//         const result = await pool.query('SELECT * from books');

//         if (!result.rows.length) {
//             throw new Error('no books found');
//         }
//     } catch (error) {
//             next(error);
//         }
// };


export const getBookById = async(req, res) => {
    const {id} = req.params;
    try {
        const result = await pool.query('SELECT * from books WHERE id = $1', [id]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({message: 'something broke'});
    }
};

export const addNewBook = async(req, res) => {
    const {name, author, image_url} = req.body;

    try {
        const result = await pool.query('INSERT INTO books (name, author, image_url) VALUES ($1, $2, $3) RETURNING *', [name, author, image_url]);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        res.status(500).json({message: 'something broke'});      
    }
};

export const updateBook = async (req, res) => {
    const {id} = req.params;
    const {name, author, image_url} = req.body;

    try {
        const result = await pool.query('UPDATE books SET name = $1, author = $2, image_url = $3 WHERE id = $4 RETURNING *', [name, author, image_url, id] ); 
        res.json(result.rows[0]);
    } catch (something) {
        res.status(500).json({message:'something broke'});
        console.log(something);
    }
};

export const deleteBook = async(req, res) => {
    const {id} = req.params;
    try {
        await pool.query ('DELETE FROM BOOKS WHERE ID = $1', [1]);
        res.status(200).json({message:'book deleted'});
    } catch (err) {
        res.status(500).json({message: 'something broke'});
        console.log(err);
    }
};
