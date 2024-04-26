const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
app.use(bodyParser.json());

// Sample user data (in a real application, this would be stored in a database)
const users = [
  { id: 1, username: 'user1', password: '$2b$10$1234567890123456789012' },
  { id: 2, username: 'user2', password: '$2b$10$1234567890123456789012' },
 
];

// Sample book data (in a real application, this would be stored in a database)
let books = [
  { id: 1, title: 'Book 1', author: 'Author 1', publicationYear: 2020 },
  { id: 2, title: 'Book 2', author: 'Author 2', publicationYear: 2021 },
];

// Secret key for JWT
const secretKey = 'myKey';

// Middleware for authentication
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.userId = decoded.userId;
    next();
  });
};

// User registration
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Check if user already exists
  if (users.find(user => user.username === username)) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: 'Error hashing password' });
    }

    const newUser = { id: users.length + 1, username, password: hashedPassword };
    users.push(newUser);

    res.status(201).json({ message: 'User registered successfully' });
  });
});

// User login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (err || !result) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: user.id }, secretKey);
    res.json({ token });
  });
});

// Get all books
app.get('/books', authenticate, (req, res) => {
  res.json(books);
});

// Get a specific book
app.get('/books/:id', authenticate, (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(book => book.id === bookId);

  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  res.json(book);
});

// Create a new book
app.post('/books', authenticate, (req, res) => {
  const { title, author, publicationYear } = req.body;

  if (!title || !author || !publicationYear) {
    return res.status(400).json({ message: 'Title, author, and publication year are required' });
  }

  const newBook = { id: books.length + 1, title, author, publicationYear };
  books.push(newBook);

  res.status(201).json(newBook);
});

// Update a book
app.put('/books/:id', authenticate, (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author, publicationYear } = req.body;

  const book = books.find(book => book.id === bookId);

  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  book.title = title || book.title;
  book.author = author || book.author;
  book.publicationYear = publicationYear || book.publicationYear;

  res.json(book);
});

// Delete a book
app.delete('/books/:id', authenticate, (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex(book => book.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }

  books.splice(bookIndex, 1);
  res.sendStatus(204);
});

// Filter books by author
app.get('/books/author/:author', authenticate, (req, res) => {
  const author = req.params.author;
  const filteredBooks = books.filter(book => book.author === author);

  res.json(filteredBooks);
});

// Filter books by publication year
app.get('/books/year/:year', authenticate, (req, res) => {
  const year = parseInt(req.params.year);
  const filteredBooks = books.filter(book => book.publicationYear === year);

  res.json(filteredBooks);
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});