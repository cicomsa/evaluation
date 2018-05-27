# ClassEvaluations

## Project description

This project was made as a final individual assignment, where I could showcase my knowledge and understanding in React and Redux, and in the front-end connection to the back-end.

**The goal of the app is**

* To have built a platform for teachers where they can add, edit and delete batches, students and/or evaluations.

## How to:

Install the dependencies:

* In each project directory run `yarn `

Run the front-end side of the app:

* In the ‘client’ directory run `yarn start`

Run the back-end side of the app:

* Have a ‘DATABASE_URL' environment variable set
* Start the TypeScript compiler: `tsc -w`
* Connect to Postgres with TypeORM: `yarn start`

## API and Database

The database containes four tables: user, batch, student, evaluation. 
User is a table of the registred users which holds the users' e-mail and hashed password.
The batch table contains details of the batch: number, start date and end date.
The student table holds the students' details: full name, image and batch id.
The evaluation table presents the evaluations' details: color, date, remark, student-id and batch-id.

## User routes

|**URI**|**VERB**|**ACTION**|
|--------------------------|---------------------|---------------------------------------------------|
| /batches                 | GET&POST&DELETE     | Display all batches. Add & delete batch.          |
| /batches/:id             | GET&PUT&POST&DELETE | Display & edit batch. Add & delete student.       |
| /students/:id            | GET&PUT&POST&DELETE | Display & edit student. Add & display evaluation. |            
| /evaluations/student/:id | GET&PUT             | Display & delete evaluations.                     |
| /evaluations/:id         |                     | Display & edit evaluation.                        |


## Public routes

|**URI**|**VERB**|**ACTION**|
|-------------|---------|-----------------------------------|
| /logout     | N/A     | lougoutPage                       |
| /login      | POST    | loginPage                         |
| /signup     | POST    | signupPage                        |


## Front-End Folder Structure

After creation, your 'client' directory should contain the following:

```
ClassEvaluation/
  node_modules/
  package.json
  yarn.lock
  public/
    index.html
    
  src/
    actions/
    components/
    reducers/
    App.css
    App.js
    constants.js
    App.test.js
    index.css
    index.js 
    jwt.js
    middleware.js
    registerServiceWorker.js
    store.js
```

## Back-End Folder Structure

After creation, your 'server' directory should contain the following:

```
  node_modules/
  package.json
  yarn.lock
  target/
  tsconfig.json
  
  src/
    batch/
    evaluation/
    logins/
    students/
    users/
    db.ts
    index.ts
    jwt.ts

```
    
