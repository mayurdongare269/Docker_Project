@echo off
echo ========================================
echo   Hostel Management System - Startup
echo ========================================
echo.

echo [1/3] Stopping any running containers...
docker-compose down

echo.
echo [2/3] Starting all containers...
docker-compose up -d

echo.
echo [3/3] Waiting for backend to initialize (30 seconds)...
timeout /t 30 /nobreak

echo.
echo ========================================
echo   Checking Status...
echo ========================================
docker-compose ps

echo.
echo ========================================
echo   Backend Logs (Last 10 lines):
echo ========================================
docker-compose logs backend --tail=10

echo.
echo ========================================
echo   SUCCESS! Application is ready!
echo ========================================
echo.
echo   Frontend:      http://localhost:3000
echo   Backend API:   http://localhost:5000
echo   Mongo Express: http://localhost:8081
echo.
echo   Admin Login:
echo   Username: warden
echo   Password: warden123
echo.
echo ========================================

echo.
echo Opening browser...
start http://localhost:3000

echo.
echo Press any key to exit...
pause >nul
