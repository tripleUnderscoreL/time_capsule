# time_capsule
## Запуск backend-сервера
* Создать виртуальное окружение ```python -m venv venv```
* Активировать вирутальное окружение ```venv/scripts/activate```
* Перейти в папку серверной частью ```cd backend```
* Установить зависимости ```pip install -r requirements.txt```
* Запустить миграции 
```
python manage.py makemigrations
python manage.py migrate
```
* Опционально - создать суперпользователя ```python manage.py createsuperuser```
* Опционально - создать несколько объектов в БД ```python manage.py populate_db```
* Запустить сервер ```python manage.py runserver```
* админ панель дев-сервера доступна по адресу http://127.0.0.1:8000/admin, использовать данные от суперпользователя

## Запуск frontend-сервера
* Скачать node js, npm
* Прописать команду ```npm ci``` для установки большинства зависимостей
* Прописать команду ```npm install ngx-cookie-service --save --force``` для установки cookie service (почему-то после прошлой команды сам не устанавливается)
* Прописать команду ```npm install -g "@angular/cli"``` для установки фреймворка angular
* После установки всех необходимых зависимостей в папке frontend проекта прописать команду в терминале ```ng serve```, адрес для доступа будет указан в терминале (http://localhost:4200/)
* *Дополнительный пункт при возникновении ошибок: в powershell (от имени администратора) установить ```Set-ExecutionPolicy RemoteSigned```
