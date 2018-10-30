# Homework Assignment 1


## The Assignment:

Please create a simple "Hello World" API. Meaning:

1. It should be a RESTful JSON API that listens on a port of your choice. 

2. When someone posts anything to the route /hello, you should return a welcome message, in JSON format. This message can be anything you want. 


## Result

RESTful JSON API that listens to port 8080, which only valid path is /hello.
It should return 200 status code and an object with two key values properties:
1. First key = "msg" and value a welcome msg
2. Seconde key = "post" and a value containing the clients post

If you try with another route it will return a 404 status code with an object containing a message that advices you to try in the correct path by listing all posible path in "routes".