# FastAPI + Next.js Application

A full-stack application with a FastAPI backend and Next.js frontend.

## Project Structure

```
fastapi-app/
├── main.py                 # FastAPI backend
├── pyproject.toml          # Python dependencies (uv)
├── .python-version         # Python version for uv
├── frontend/              # Next.js frontend
│   ├── app/              # Next.js app directory
│   │   ├── page.tsx      # Home page
│   │   └── items/        # Items management page
│   ├── lib/              # Utilities and API client
│   └── .env.local        # Environment variables
```

## Backend Setup (FastAPI)

### Prerequisites

Install [uv](https://github.com/astral-sh/uv) (recommended):
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

Or on macOS with Homebrew:
```bash
brew install uv
```

### Setup and Run

1. Install dependencies:
```bash
uv sync
```

2. Run the FastAPI server:
```bash
uv run uvicorn main:app --reload --port 8001
```

Or activate the virtual environment and run directly:
```bash
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
uvicorn main:app --reload --port 8001
```

The backend will be available at:
- API: http://localhost:8001
- Interactive docs: http://localhost:8001/docs
- Alternative docs: http://localhost:8001/redoc

### API Endpoints

- `GET /` - Root endpoint with welcome message
- `GET /health` - Health check endpoint
- `GET /items/{item_id}` - Get item by ID (with optional query parameter)
- `POST /items/` - Create new item

## Frontend Setup (Next.js)

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file (if not exists):
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

The frontend will be available at http://localhost:3000

### Environment Variables

Create a `.env.local` file in the `frontend` directory:

```
NEXT_PUBLIC_API_URL=http://localhost:8001
```

## Running the Full Stack

To run both the backend and frontend:

1. Start the FastAPI backend (from project root):
```bash
uv run uvicorn main:app --reload --port 8001
```

2. In a new terminal, start the Next.js frontend:
```bash
cd frontend
npm run dev
```

3. Open http://localhost:3000 in your browser

## Features

- **Home Page**: Displays API status and health check
- **Items Management**: Create and fetch items from the API
- **Dark Mode**: Automatic dark mode support
- **Responsive Design**: Works on mobile and desktop
- **Type Safety**: Full TypeScript support in the frontend
- **CORS Enabled**: Backend configured to accept requests from the frontend

## Development

### Backend Development

The FastAPI backend uses:
- **uv** for fast dependency management
- FastAPI for the API framework
- Pydantic for data validation
- Uvicorn as the ASGI server

### Frontend Development

The Next.js frontend uses:
- Next.js 16 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- React hooks for state management

## Building for Production

### Backend

For production deployment, use a production ASGI server:
```bash
uv run uvicorn main:app --host 0.0.0.0 --port 8001
```

Or build and deploy the virtual environment:
```bash
uv sync --frozen
source .venv/bin/activate
uvicorn main:app --host 0.0.0.0 --port 8001
```

### Frontend

Build the Next.js application:
```bash
cd frontend
npm run build
npm start
```

## License

MIT
