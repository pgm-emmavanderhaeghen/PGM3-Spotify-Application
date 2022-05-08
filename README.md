# Spotify

## Introduction
Everyone knows the popular music player: Spotify. Well ... this is the new and improved version! It's kinda like a Spotify 2.0 version.

## Installation
Move to the root of this project and install node_modules.
```bash
npm install
```

## Usage
To start the server write this line of code in the terminal:
```bash
npm run start:dev
```

## Feature overview
### 1.1. Authentication: logging in and out
If a user is not logged in, the application displays a login screen.

- The user can log in using an existing username and  password.
- The input fields have validation and visual feedback for the user.
- The user is able to register if they don't have an account yet.
 

### 1.2. Authentication & Authorisation: registering
- The user can register with a username, e-mail, password (which is encrypted in the database) and an authorisation (role).
- A user is authorised and given one of three possible roles: admin, reader or editor.

- The input fields have validation and visual feedback for the user.


### 1.3. Main application Functionalities
Each role has specified CRUD movements (CREATE, READ, EDIT, DELETE). Which are explained below:

**Reader**

A reader can only:
- Consult/view *Songs*
- View *Artists* together with their corresponding *Albums*/discography
- View lists (*Playlists*) with different Songs
 

**Editor**

An editor can do everything a reader can, plus:
- Modify *Songs*
- Adjust *Artists* and link/unlink them to existing *Albums*
- Adjust *Playlists* and remove or add *Songs* to a playlist
 

**Admin**

An administrator can do everything an editor can, plus the following:

- Delete *Songs*
- Delete *Artists* and their corresponding *Albums*
- Delete *Playlists*
- Delete *Users* from the system and/or deny them access

### 1.4. Modifying data
Each registered user can change his/her data:

- The password
- First name and surname
- Username
- Avatar


## Technical dependencies
This is an overview of all the dependencies used in this project:

### General
- **nodemon** during development for auto-reload of the application.
- **NodeJS** and **Express** to handle the requests and responses from client <-> server.
- **MVC** (Model, View, Controller) as the application architecture via ExpressJS.
- **ES6 modules** (import & export).

### Database
- Storage of data using an **SQLite3** database
- DB connection and SQL-queries to database go via **TypeORM**

### Authentication
- **JWT** - Json Web Token
- Password hashing using **bcrypt**

### Express middleware
- body-parser
- cookie-parser
- Validation of data with express-validator

### Testing
- Jest

### Seeding
- When the application is started for the first time, the database is filled with seeding data. 
- **Fakerjs** was used to generate this data.

### Git
- **GitHub** is a code hosting platform for version control and collaboration, we used Git to regularly commit our progress.

### Code Styling
- **ESLint** with the eslint-config-airbnb as the base config.

### Documentation
- The API is documented with **Swagger**.


## Support
Should you encounter any issues or questions, you can contact me on emmavand24@student.arteveldehs.be or send me a message on teams. :)


## Author
This project was made by yours truly, <br> Emma Van der Haeghen <3

## Postscript
Finally, I would like to say that I am aware that this application is of low quality. I am deeply disappointed in myself, but despite all the mental breakdowns and panic attacks, I could not bring myself to do better. I slept very badly for a whole week and am very unhappy with my work. I just wanted to let you know that I did my best throughout the whole Easter period, but the end result is deeply disappointing. I would like to apologise for this. 


## License
MIT License

Copyright (c) 2022 Emma Van der Haeghen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
