# Library Management System - Backend

## Setup

1. Install MongoDB locally or use MongoDB Atlas
2. Install dependencies:
```bash
cd backend
npm install
```

3. Update `.env` file with your MongoDB URI

4. Start the server:
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Authentication
- POST `/api/auth/login` - Login user

### Books
- GET `/api/books` - Get all books
- POST `/api/books` - Add new book
- PUT `/api/books/:id` - Update book
- DELETE `/api/books/:id` - Delete book

### Members
- GET `/api/members` - Get all members
- POST `/api/members` - Add new member
- PUT `/api/members/:id` - Update member
- GET `/api/members/search/:memberNo` - Search member by number

### Issues
- GET `/api/issues` - Get all active issues
- POST `/api/issues` - Issue a book
- PUT `/api/issues/:id/return` - Return a book
- GET `/api/issues/overdue` - Get overdue returns

## Database Models

### User
- username, password, role (admin/user)

### Book
- name, author, type, serialNo, category, cost, procurementDate, available

### Member
- memberNo, name, email, phone, startDate, endDate, status

### Issue
- bookName, author, serialNo, issueDate, returnDate, actualReturnDate, remarks, fine, finePaid, status
