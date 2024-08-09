# todo-list
Simple todo list app using JS and pseudo-React (based on [didact](https://github.com/pomber/didact))

## Tasks
Tasks can be created, marked as complete and removed. 
Also they can be edited by double clicking on the task's text.

<img width="1470" alt="image" src="https://github.com/user-attachments/assets/3cd46db6-4baa-4e1e-9b07-3cf4314bb1f8">

## Local storage
App can be used without creating any accounts. 
Tasks will be saved locally using localStorage.

<img width="1470" alt="image" src="https://github.com/user-attachments/assets/f8f02f37-c6bc-4b11-a5fa-865746e9e5c6">


## User authentication
Sign Up and Sign In features. User can create account using only email and password. 
User's data will be validated using [validate.js](https://github.com/ansman/validate.js)

<img width="1470" alt="image" src="https://github.com/user-attachments/assets/50f9ba14-b66b-4c41-917b-7678b7cdc46f">

# Installation
## Prerequisites
- Node.js
- PostgreSQL
## Steps

1. Clone the repository
```bash
$ git clone git@github.com:A5KET/todo-list.git
$ cd todo-list/server
```

2. Install dependencies
```bash
$ cd server
$ npm install
```

3. Configure environment variables
```bash
$ export PGSTRING="postgres://myuser:mypassword@localhost:5432/todolist"
```

4. Start the backend server
```bash
$ npm start
```


