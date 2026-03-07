# Sijill Staff Portal

Built with React + Vite.

## Run with Docker

### 1) Build and run

```bash
docker compose up --build
```

The app will be available at `http://localhost:8080`.

### 2) Configure API base URL

This project uses `VITE_API_BASE_URL` at **build time**. Set it before building:

```bash
# PowerShell
$env:VITE_API_BASE_URL="https://your-api.example.com/api/v1"
docker compose up --build
```

```bash
# Bash
VITE_API_BASE_URL="https://your-api.example.com/api/v1" docker compose up --build
```

### 3) Build image directly (optional)

```bash
docker build -t sijill-staff-portal --build-arg VITE_API_BASE_URL=https://your-api.example.com/api/v1 .
docker run -p 8080:80 sijill-staff-portal
```
