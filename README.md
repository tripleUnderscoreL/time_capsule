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