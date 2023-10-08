this is a small example for hilton interview quiz.

the RESTful GraphQL Endpoints is in server-backend.
the SPA is in front-backend.

you need to run your local mongoDB in yor pc, and the test data is in db-init floder.

opration:
1. run your local mongoDB, and use db-init/hilton.js for init.
2. cd server-backend and yarn it. then yarn start.
3. cd front-backend adn yarn it. then yarn serve. 
4. open broswer and goto localhost:8080

tips:
Guests and Employees used 1 SPA. you can choose the character before sign in. (雇员 is Employees,  客户 -> Guests).
Guests login with phone Number, no password. if you never sign in before, you will be sign up automaticly.
Employees has only one, the "peter". password is 123456. if you want add another employee, the password is encode by md5(username + md5(password)).
