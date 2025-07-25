const express = require('express');
const app = express();
// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE
// });

app.get('/', (req, res) => {
    res.send('Hello Node.JS');
});

app.post('/', (req, res) => {
    res.send('Got a POST request')
});

app.put('/', (req, res) => {
    res.send('Got a PUT request');
});

app.delete('/', (req, res) => {
    res.send('Got a DELETE request')
});

app.get('/', (req, res) => {
    console.log(req.query)
    res.send(req.query.name + ' ' + req.query.age)
})

app.get('/products', (req, res) => {
    const sql = 'SELECT * FROM products';
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({message: 'Error occurre while retrieving product.', error: err});
        }  else {
            res.status(200).json(result);
        }
    });
});

app.get('/products/:id', (req, res) => {
    const id = Number(req.params.id)
    const sql = 'SELECT * FROM products WHERE id = ?';
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({message: 'Error occurre while retrieving product.', error: err});
        } else {
            if (result.length === 0) {
                res.status(400).json({ message: 'Product not found.' });
            } else {
                res.status(200).json({message: 'Product retrieved successfully.', data: result});
            }
        }
    });
});

app.post('/product', (req, res) => {
    const product = req.body;
    const sql = 'INSERT INTO product (name, price, discount, review_count image_url) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [product.name, product.price, product.discount, product.review_count, product.image_url], (err, result) => {
        if (err) {
            res.status(500).json({message: 'Error occurred while inserting product.', error: err});
        } else {
            res.status(201).json({message: 'Product inserted successfully'});
        }
    });
});

app.put('/product/:id', (req, res) => {
    const id = Number(req.params.id);
    const product = req.body;
    const sql = 'UPDATE products SET name = ?, price = ?, discount = ?, review_count = ?, image_url = ? WHERE id = ?';
    db.query(sql, [product.name, product.price, product.discount, product.review_count, product.image_url, id], (err, result) => {
        if (err) {
            res.status(500).json({message: 'Error occurred while inserting product.', error: err});
        } else {
            res.status(201).json({message: 'Product inserted successfully'});
        }
    });
});

app.delete('/product/:id', (req, res) => {
    const id = Number(req.params.id);
    const sql = 'DELETE FROM products WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).json({message: 'Error occurre while deleting product.', error: err});
        }  else {
            res.status(200).json({message: 'Product deleted successfully,' });
        }
    });
});

app.get('/product/search/:keyword', (req, res) => {
    const keyword = req.params.keyword;
    const sql = 'SELECT * FROM products WHERE name LIKE ?';
    db.query(sql, [`%${keyword}%`], (err, result) => {
        if (err) {
            res.status(500).json({message: 'Error occurre while retrieving product.', error: err});
        }  else {
            res.status(200).json(result);
        }
    });
});


app.listen(3000, () => console.log('Server running on port 3000'))
