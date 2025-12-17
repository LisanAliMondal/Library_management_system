# Pending Book Issue Requests Feature

## Overview
Users can now submit book issue requests that require admin approval before the book is actually issued.

## Changes Made

### Backend Changes

1. **Request Model** (`backend/models/Request.js`)
   - Added fields: `author`, `serialNo`, `type`, `issueDate`, `returnDate`, `remarks`
   - Stores complete issue details for approval

2. **Request Routes** (`backend/routes/requests.js`)
   - Changed `/fulfill` endpoint to `/approve`
   - Approval now creates an Issue record and marks book as unavailable
   - Updates request status to 'fulfilled'

### Frontend Changes

1. **BookIssue Page** (`src/pages/BookIssue.js`)
   - Now creates a pending request instead of directly issuing the book
   - Sends request to `/api/requests` endpoint
   - Shows confirmation message about awaiting admin approval

2. **IssueRequests Page** (`src/pages/IssueRequests.js`)
   - Filters to show only pending requests
   - Admins see an "Approve" button for each request
   - Clicking approve creates the actual issue and updates book availability
   - Non-admin users can view pending requests but cannot approve

## User Flow

1. **User submits request**: User fills out book issue form → Creates pending request
2. **Admin reviews**: Admin navigates to "Pending Issue Requests" from Reports
3. **Admin approves**: Admin clicks "Approve" → Book is issued and marked unavailable
4. **Request fulfilled**: Request status changes to 'fulfilled' and disappears from pending list

## Access

- **Users**: Can create requests and view pending requests
- **Admins**: Can create requests, view pending requests, and approve them
- **Route**: `/pending-requests` (accessible from Reports page)
