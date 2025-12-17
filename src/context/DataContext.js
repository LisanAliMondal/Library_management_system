import React, { createContext, useState, useContext, useEffect } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);

  const fetchBooks = () => {
    fetch('http://localhost:5001/api/books')
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.error('Error fetching books:', err));
  };

  const fetchMembers = () => {
    fetch('http://localhost:5001/api/members')
      .then(res => res.json())
      .then(data => setMembers(data))
      .catch(err => console.error('Error fetching members:', err));
  };

  useEffect(() => {
    fetchBooks();
    fetchMembers();
    fetchIssues();
  }, []);
  

  
  const [issuedBooks, setIssuedBooks] = useState([]);

  const fetchIssues = () => {
    fetch('http://localhost:5001/api/issues')
      .then(res => res.json())
      .then(data => setIssuedBooks(data))
      .catch(err => console.error('Error fetching issues:', err));
  };

  const addBook = (book) => setBooks([...books, { ...book, id: books.length + 1 }]);
  const updateBook = (id, updatedBook) => setBooks(books.map(b => b.id === id ? { ...b, ...updatedBook } : b));

  const issueBook = (issue) => {
    setIssuedBooks([...issuedBooks, { ...issue, id: issuedBooks.length + 1 }]);
    setBooks(books.map(b => b.name === issue.bookName ? { ...b, available: false } : b));
  };
  const returnBook = (id) => setIssuedBooks(issuedBooks.filter(b => b.id !== id));

  return (
    <DataContext.Provider value={{ books, members, issuedBooks, issueBook, returnBook, fetchBooks, fetchMembers, fetchIssues }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
