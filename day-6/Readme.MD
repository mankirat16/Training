## directions to run the project

go to offcial postgres website
download and install postgres verison 15.7
set up password and username of the database
set port as 5433

```
open psql on your machine
CREATE TABLE students;
\c students
INSERT INTO students (name , email , age , dob) VALUES ('joe' , 'xyz@gmail.com' ,21 , '16-08-2003');
```

### setup postgres on your local machine

make a .env file in the services project directory
make a DB_PWD field in the .env and write the password you put while setting up your postgres database
make a PORT field , set the PORT field to 5000

### go to terminal of project, run the following commands

```
cd day-6-services
npm i
npm start
```

### open another tab of cmd on vs code and run the folowing commands

```
cd day-6-frontend
npm i
npm start
```
