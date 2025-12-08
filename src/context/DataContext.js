import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [books, setBooks] = useState([
    { id: 1, name: 'The Great Gatsby', author: 'F. Scott Fitzgerald', type: 'book', serialNo: 'B001', available: true, category: 'Fiction', cost: '15.99', procurementDate: '2024-01-10' },
    { id: 2, name: 'Inception', author: 'Christopher Nolan', type: 'movie', serialNo: 'M001', available: true, category: 'Sci-Fi', cost: '19.99', procurementDate: '2024-01-15' },
    { id: 3, name: '1984', author: 'George Orwell', type: 'book', serialNo: 'B002', available: false, category: 'Fiction', cost: '12.99', procurementDate: '2024-01-12' }
  ]);
  
  const [members, setMembers] = useState([
    { id: 1, memberNo: 'M001', name: 'John Doe', email: 'john@example.com', phone: '1234567890', startDate: '2024-01-01', endDate: '2024-07-01', status: 'active' }
  ]);
  
  const [issuedBooks, setIssuedBooks] = useState([
    { id: 1, bookName: 'The Great Gatsby', author: 'F. Scott Fitzgerald', issueDate: '2024-01-15', returnDate: '2024-01-30', remarks: '' }
  ]);

  const addBook = (book) => setBooks([...books, { ...book, id: books.length + 1 }]);
  const updateBook = (id, updatedBook) => setBooks(books.map(b => b.id === id ? { ...b, ...updatedBook } : b));
  const addMember = (member) => setMembers([...members, { ...member, id: members.length + 1 }]);
  const updateMember = (id, updatedMember) => setMembers(members.map(m => m.id === id ? { ...m, ...updatedMember } : m));
  const issueBook = (issue) => {
    setIssuedBooks([...issuedBooks, { ...issue, id: issuedBooks.length + 1 }]);
    setBooks(books.map(b => b.name === issue.bookName ? { ...b, available: false } : b));
  };
  const returnBook = (id) => setIssuedBooks(issuedBooks.filter(b => b.id !== id));

  return (
    <DataContext.Provider value={{ books, members, issuedBooks, addBook, updateBook, addMember, updateMember, issueBook, returnBook }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
