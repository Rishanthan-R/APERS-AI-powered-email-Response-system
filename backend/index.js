const http = require('http');
const connectDB = require('./db');
const { sendEmail, getEmails } = require('./controllers/emailController');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Helper to parse query parameters
const url = require('url');

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === '/send-email') {
    const { sender, recipient, subject, body } = parsedUrl.query;

    if (!sender || !recipient || !subject || !body) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      return res.end('Missing required fields');
    }

    const email = await sendEmail({ sender, recipient, subject, body });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(email));

  } else if (parsedUrl.pathname === '/emails') {
    const emails = await getEmails();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(emails));

  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <h1>Node.js + MongoDB Email Project</h1>
      <p>Send an email: /send-email?sender=alice@example.com&recipient=bob@example.com&subject=Hello&body=Test</p>
      <p>View emails: <a href="/emails">/emails</a></p>
    `);
  }
});

server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}/`));
