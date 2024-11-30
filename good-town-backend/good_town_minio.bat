@echo off
REM ---------------------------
REM 自动化运行 MinIO 容器的脚本
REM ---------------------------

REM 设置 MinIO 环境变量
echo pull lastet minio image...
docker pull docker.unsee.tech/minio/minio
echo pull finished.

set MINIO_ROOT_USER=good_town
set MINIO_ROOT_PASSWORD=good_town

REM 设置数据存储路径
set DATA_DIR=D:\good_town\minio\data

REM 检查 Docker 是否已启动
docker info >nul 2>&1
if errorlevel 1 (
    echo Docker is not running. Please start Docker.
    exit /b 1
)

REM 删除现有的 minio 容器（如果存在）
docker ps -a -q -f name=good_town_minio | findstr . >nul
if not errorlevel 1 (
    echo Stopping and removing existing good_town_minio container...
    docker stop good_town_minio
    docker rm good_town_minio
)

REM 运行新的 MinIO 容器
echo Starting MinIO container...
docker run -d ^
  -p 9000:9000 ^
  -p 9001:9001 ^
  --name good_town_minio ^
  -e "MINIO_ROOT_USER=%MINIO_ROOT_USER%" ^
  -e "MINIO_ROOT_PASSWORD=%MINIO_ROOT_PASSWORD%" ^
  -v %DATA_DIR%:/data ^
  docker.unsee.tech/minio/minio server /data --console-address ":9001"

echo MinIO container started successfully.
echo API open in 9000
echo webui open in 9001
echo open localhost:9001 to start.

pause
