# tri7-exam

### How to run the backend API

Go to backend project directory

    cp tri7-exam-backend

Install dependencies

    composer install

Copy the environment template

    cp .env.example .env

Generate the key for your environment file, it will define the value for `APP_KEY=`

    php artisan key:generate

Edit then the `.env` file to suit your needs

    DB_CONNECTION=mysql
    DB_HOST=mysql
    DB_PORT=3306
    DB_DATABASE=CHANGE_DATABASE
    DB_USERNAME=CHANGE_USERNAME
    DB_PASSWORD=CHANGE_PASSWORD

Migrate and seed to populate data

    php artisan migrate --seed 

Finally, you may start API

    php artisan serve

### How to run the frontend

Go to frontend project directory

    cp tri7-exam-frontend

Install dependencies

    npm install

Make sure environments are correct

    file: src/environments/environment.ts

Finally, you may start frontend

    npm run start
