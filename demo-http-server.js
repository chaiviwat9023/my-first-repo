const http = require('http');
const hostname = 'localhost';
const port = 3000;
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    
    if (req.url === '/about') {
            res.end('About Page\n');
    } else if (req.url === '/contact') {
            res.end('Contact Page\n');
    } else {
            res.end('Hello, World!\n');
    }
});

server.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}/`);
});