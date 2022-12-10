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

##### 5. Application is running on `localhost`, You can try:

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

Request Body {
    "email": "test@test.com",
    "password": "test",
}
-------------------------
Response Body
{
    "token": "eyJhbGciOiJIUzM4NCIsIn...",
    "user": {
        "_id": "6393c0358e75172b1c779b36",
        "firstName": "sofia",
        "lastName": "tancredy",
        "email": "sofia@gmail.com",
        "picture": null,
        "createdAt": "2022-12-09T23:09:41.030Z"
    }
}
```

3. Update user profile picture

```bash
http://localhost:3001/upload-profile-picture - Post

Header {
    "Bearer": "eyJhbGciOiJIUzM4NCIsIn...",
}

Request Body {
    "picture": choose file from your pc
}
-------------------------
Response Body
{
    "msg": "Profile picture updated succesfully!"
}
```
