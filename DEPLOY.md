# Deployment Instructions for Hostinger VPS

## Prerequisites
- A Hostinger VPS with Docker and Docker Compose installed.
- Your `GEMINI_API_KEY`.

## Deployment Steps

1. **Clone the Repository**
   SSH into your VPS and clone the repository:
   ```bash
   git clone <your-repo-url>
   cd Portafolio-retro
   ```

2. **Set Environment Variables**
   Create a `.env` file in the root directory:
   ```bash
   nano .env
   ```
   Add your API key:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```
   Save and exit (`Ctrl+O`, `Enter`, `Ctrl+X`).

3. **Build and Run**
   Run the application using Docker Compose:
   ```bash
   docker-compose up -d --build
   ```

4. **Verify Deployment**
   The application should now be running on port 3000 (mapped to port 80 inside the container).
   - If you have a reverse proxy (like Nginx on the host) or a CloudPanel setup, point it to `http://127.0.0.1:3000`.
   - OR, if you want it explicitly on port 80/443 directly, modify `docker-compose.yml` to map ports accordingly (`80:80`).

## Updates
To deploy changes:
1. `git pull`
2. `docker-compose up -d --build`
