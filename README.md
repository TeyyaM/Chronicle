# Chronicle

A private journaling web app designed to help you keep track of your mood over time and store your entires for you to look back upon.

Created by [Tessa](https://github.com/TeyyaM), [Josiah](https://github.com/J-pilon) and [Sam](https://github.com/brackish888).

This was designed and implemented as a way to showcase the skills that were learned in the [Lighthouse Labs Web Development](https://github.com/lighthouse-labs) bootcamp and is considered our final project of the course.

Within this project we used many tools introduced to us such as:

- React
- _Typescript_
- Express
- Jest
- HTML
- CSS
- Axios
- Node
- PostgreSQL
- Cypress (upcoming/in progress)

_In a way to simulate realworld experiences we decided to use Typescript as our main programming language, one that we had not covered in the course_

We started the project with a _no fluff_ React/Express boilerplate supplied by @garrettgsb and can be found [here.](https://github.com/garrettgsb/react-express-boilerplate)

## Features

- Home page Journaling form
  - Write, post, save and edit journal entries
  - Give each entry a Category (or none) to help you keep track of certain memories
  - Give your post a mood to track your progress over time
- Customize your journaling experience!
  - change your background, secondary, accent, text and form colours
- Reference your past entries by Category or by Date
  - Graph your mood overtime with a dynamic date picker that lets you pick the intervals that you want to graph.

## Getting started!

## Dependencies

- react 17.0.2
- typescript 4.2.4
- node 14.16.0
- npm 6.14.11
- pgSQL 9.5.25

Fork this repository, then clone your fork onto your machine.

You will need **TWO** terminal windows/tabs to run this (or some other plan for running two Node processes).

Firstly, in either terminal, you will need to create the database. Run `psql -U development`, enter the password `development`, then run `CREATE DATABASE chronicle_development;`. Once that is done, you can exist postgres with `\q` and proceed on to the other instructions. Reminder: this _does_ require having postgressSQL on your machine.

In one terminal, `cd` into `react-front-end`. Run `npm install` to install the dependencies. Then run `npm start` and go to `localhost:3000` in your browser.

In the other terminal, `cd` into `express-back-end`. Run `npm install` to install the dependencies, then `npm run db:reset` to do the inital seeding of the server.
In this same folder create a `.env` file with these secrets:
DB_HOST=localhost
DB_USER=development
DB_PASS=development
DB_NAME=chronicle_development
DB_PORT=5432
Then you can run `npm run go` to start the backend server.
(this will run on localhost:8080)
