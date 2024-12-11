// Import modul yang dibutuhkan
const express = require('express');
const app = express();
const port = 3000;

// Middleware untuk parsing JSON
app.use(express.json());

// Data dummy untuk menyimpan buku
let books = [];

// Endpoint untuk mendapatkan semua buku
app.get('/books', (req, res) => {
  if (books.length === 0) {
    res.send("Belum ada buku yang tersedia pada perpustakaan ini bang");
  } else {
    res.json(books);
  }
});

// Endpoint untuk mendapatkan buku berdasarkan ID
app.get('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).send('Buku tidak ditemukan');
  }
});

// Endpoint untuk menambahkan buku baru
app.post('/books', (req, res) => {
  const newBook = {
    id: books.length + 1, // ID baru
    title: req.body.title,
    author: req.body.author,
    year: req.body.year || new Date().getFullYear(), // Default tahun sekarang jika tidak disertakan
    genre: req.body.genre || 'Unknown' // Default genre jika tidak disertakan
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// Endpoint untuk memperbarui buku berdasarkan ID
app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const bookIndex = books.findIndex(b => b.id === id);
  if (bookIndex !== -1) {
    const updatedBook = {
      id: id,
      title: req.body.title,
      author: req.body.author,
      year: req.body.year,
      genre: req.body.genre
    };
    books[bookIndex] = updatedBook;
    res.json(updatedBook);
  } else {
    res.status(404).send('Buku tidak ditemukan');
  }
});

// Endpoint untuk menghapus buku berdasarkan ID
app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const bookIndex = books.findIndex(b => b.id === id);
  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    res.send('Buku berhasil dihapus');
  } else {
    res.status(404).send('Buku tidak ditemukan');
  }
});

// Menjalankan server
app.listen(port, () => {
  console.log(`Book management app listening on http://localhost:${port}`);
});
