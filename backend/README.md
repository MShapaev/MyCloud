# Backend
## Развёртывание на сервере Linux Ubuntu. Для этого выполнить следующие шаги:
1. Для управления из своего терминала скопировать публичный ключ ssh на сервер:  
```bash
cat ~/.ssh/id_rsa.pub
```
- Ввести публичный ключ в соответствующем поле при создании сервера
- Войти через консоль на сервер, где вместо 0.0.0.0 ввести ip созданного сервера.
```bash
ssh root@0.0.0.0
```
------------------------------------------------------------------------
2. Создать нового пользователя
- Вместо user_user ввести имя нового пользователя и наделить нового пользователя правами `superuser`
```bash
adduser user_name
usermod user_name -aG sudo
```
- Переключиться на вновь созданного пользователя:
```bash
sudo -i -u user_name
```
------------------------------------------------------------------------
3. Обновить список репозиториев и обновить пакеты:
```bash
sudo apt update -y && apt upgrade -y
```
- Установить следующие пакеты:
```bash
sudo apt-get install python3 python3-venv python3-pip postgresql nginx
```
- Сменить пароль пользователя postgres и создайте базу данных
```bash
sudo su postgres
psql
ALTER USER postgres WITH PASSWORD '2312';
CREATE DATABASE mycloud;
\q
exit
```
- Клонировать в корень папки вашего пользователя репозиторий с проектом, перейти в папку MyCloud/backend  
```bash
cd MyCloud/backend
```
настроить виртуальное окружение Python и установить пакеты из requirements.txt
```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```
- Сделать миграции и выгрузить данные из заранее подготовленного файла loaddata.json:
```bash
python manage.py migrate
python manage.py loaddata loaddata.json
```
--------------------------------------------------------------------
1. Настроить gunicorn:  
```bash
sudo nano /etc/systemd/system/gunicorn.service
```
- Вписать следующий код, где сменить имя пользователя 'Shapaev' на вашего пользователя
```bash
[Unit]
Description=gunicorn
After=network.target

[Service]
User=Shapaev
WorkingDirectory=/home/Shapaev/MyCloud/backend
ExecStart=/home/Shapaev/MyCloud/backend/venv/bin/gunicorn --access-logfile -\
    --workers=3 \
    --bind unix:/home/Shapaev/MyCloud/backend/backend/project.sock backend.wsgi:application

[Install]
WantedBy=multi-user.target

```
Запустить gunicorn, добавить в автозагрузку и проверить его работу 
```bash
sudo systemctl start gunicorn
sudo systemctl enable gunicorn
sudo systemctl status gunicorn
```
--------------------------------------------------------------------------
5. Настроить nginx.  
Создать новый файл конфигурации:
```bash
sudo nano /etc/nginx/sites-available/mycloud
```
Вписать следующий код, сменить имя пользователя системы и ip сервера
```bash
server {
    listen 80;
    server_name 79.174.81.35;
    root /home/Shapaev/MyCloud/frontend/build;

    location /media/ {
        alias /home/Shapaev/MyCloud/backend/backend/media/;
        default_type "image/jpg";
    }
    location / {
        try_files $uri /index.html =404;
    }
    location /api/ {
        include proxy_params;
        proxy_pass http://unix:/home/Shapaev/MyCloud/backend/backend/project.sock;
    }
    location /a/ {
        include proxy_params;
        proxy_pass http://unix:/home/Shapaev/MyCloud/backend/backend/project.sock;
    }
}
```
- Создать ссылку на конфигурацию
```bash
sudo ln -s /etc/nginx/sites-available/mycloud /etc/nginx/sites-enabled
```
- Дать Nginx полные права
```bash
sudo ufw allow 'Nginx Full'
```
- Собрать в папку статические файлы для доступа Nginx
```bash
python manage.py collectstatic
```
- Настроить максимальный размер файла для загрузки:
```bash
sudo nano /etc/nginx/nginx.conf
```
- Добавив следующие строки в http{} (например 40мб)  
client_max_body_size 40M;  
client_body_buffer_size 40M;

- Переопределить конфигурацию сервера nginx и проверить его работоспособность:
```bash
sudo systemctl reload nginx
sudo systemctl status nginx
```
- Логи nginx:
```bash
sudo nano /var/log/nginx/access.log
sudo nano /var/log/nginx/error.log
```
