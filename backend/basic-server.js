const http = require('http');

const server = http.createServer((req, res) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle OPTIONS requests (for CORS preflight)
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }
  
  res.setHeader('Content-Type', 'text/plain');
  
  if (req.url === '/') {
    res.statusCode = 200;
    res.end('Server is running.');
  } else if (req.url === '/api') {
    res.statusCode = 200;
    res.end('API root.');
  } else if (req.url === '/api/test-db') {
    res.statusCode = 200;
    res.end('Database connection test.');
  } else if (req.url === '/api/users') {
    res.statusCode = 200;
    res.end('Users endpoint.');
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('Available routes:');
  console.log(`- http://localhost:${PORT}/`);
  console.log(`- http://localhost:${PORT}/api`);
  console.log(`- http://localhost:${PORT}/api/test-db`);
  console.log(`- http://localhost:${PORT}/api/users`);
}); 