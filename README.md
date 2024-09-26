# HotDeal Program

This is a simple HotDeal program that shows a list of hot deals and tracks clicks using an API.

## Project Structure
- **backend/**: Contains the Node.js Express backend that provides the API for hot deals and click tracking.
- **frontend/**: Contains the HTML, JavaScript, and CSS files for the frontend to display and interact with the hot deals.

## Installation

### Backend (Node.js + Express)
1. Navigate to the `backend/` directory:
   ```bash
   cd backend/
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Frontend
Simply open `frontend/index.html` in your web browser.

## Running the Server
1. From the `backend/` directory, run the following command to start the Node.js server:
   ```bash
   node server.js
   ```

2. The server will run on `http://localhost:3000`.

## API Endpoints
- **GET /api/hotdeals**: Retrieves the list of hot deals.
- **POST /api/hotdeals/click/:id**: Tracks a click for a specific hot deal.
