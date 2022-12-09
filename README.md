### Rest Api application wih NodeJS and ExpressJs and JWT and MongoDB and Docker.

---

##### 1. Create environment variable `.env` file in the next folder

```bash
server
```

##### 2. Copy next environment variable to `.env` file

```bash
SERVER_PORT = 3001
MONGO_URI = Mongo_Atlas_Uri
JWT_SECRET = 1234
```

##### 3. Enter docker folder by running command

```bash
cd docker
```

##### 4. Run the next command to start the application

```bash
docker compose up
```

##### 5. Application is running on `localhost`

```bash
http://127.0.0.1:3001/
```

---

#### Discover the next Urls

1. Create new user

```bash
http://127.0.0.1:3001/register - Post

{
    "firstName": "test",
    "lastName": "test",
    "email": "test@test.com",
    "password": "test",
}
```

2. Login with credential

```bash
http://127.0.0.1:3001/auth/login - Post

{
    "email": "test@test.com",
    "password": "test",
}
```
