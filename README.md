# C4S.Report

## Описание проекта

C4S.Report - это проект для автоматизации сбора статистики по играм на платформе Яндекс Игры. Платформа предоставляет два различных ресурса для отслеживания статистики: один для метрик, связанных с доходом игры, и другой для метрик, связанных с самой игрой (оценка, рейтинг, дата публикации и прочие). Наш продукт решает проблему консолидации данных и автоматического сбора информации из разных источников.

## Текущий статус

Проект находится в стадии разработки. Возможны ошибки и баги. Актуальная версия проекта находится в ветке `dev`.

## Архитектура проекта

Проект состоит из двух частей:

- **Backend**: репозиторий с исходным кодом [C4S.Report Backend](https://github.com/AlekseyMinigaleev/C4S.Report/tree/dev).
- **Frontend**: репозиторий с исходным кодом фронтенда [C4S.Report Frontend](https://github.com/AlekseyMinigaleev/s4c-report-front/tree/dev).

### Технологии

Этот проект разработан с использованием следующих технологий:

- **React**: JavaScript библиотека для создания пользовательских интерфейсов.
- **TypeScript**: Статически типизированный язык программирования, расширяющий возможности JavaScript.

## Запуск проекта

### Установка с помощью Git

1. Склонируйте репозиторий с GitHub:
    ```sh
    git clone -b dev https://github.com/AlekseyMinigaleev/C4S.Frontend.git
    cd C4S.Frontend
    ```

2. Установите зависимости:
    ```sh
    npm install
    ```

3. Запустите проект:
    ```sh
    npm start
    ```

### Установка с помощью Docker Compose

Если вы предпочитаете использовать Docker для развертывания проекта, следуйте этим шагам:

1. Убедитесь, что у вас установлены Docker и Docker Compose.

2. Создайте файл `docker-compose.yml` с указанным ниже содержимым:

    ```yaml
    version: '3.4'

    networks:
      c4s.report:

    services:
      db:
        container_name: db
        image: mcr.microsoft.com/mssql/server:2022-latest
        ports:
          - 8001:1433
        environment:
          - ACCEPT_EULA=Y
          - MSSQL_SA_PASSWORD=your_password
        networks:
          - c4s.report
      api:
        container_name: api
        image: alekseyminigaleev/c4sapi:3.1
        ports:
          - 8080:8080
        depends_on:
          - db
        networks:
          - c4s.report
      front:
        container_name: front
        image: alekseyminigaleev/c4s-front:3.1
        ports:
          - 3000:3000
        networks:
          - c4s.report
    ```

3. Запустите Docker Compose:
    ```sh
    docker-compose up
    ```

Эта конфигурация позволяет легко и быстро развернуть все необходимые компоненты проекта C4S.Report, используя Docker Compose. Все сервисы будут доступны на соответствующих портах на вашем локальном компьютере.

Откройте браузер и перейдите по адресу:
    ```
    http://localhost:3000/auth
    ```
