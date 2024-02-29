## The main configuration of our application.

# Building the API in flask.
from flask import Flask
# ORM.  Allows us to modify the database using normal python code, which 
# will be translated into SQL.
from flask_sqlalchemy import SQLAlchemy

# Allows us to send a request to the backend from a different URL.
# By default, it is protected, so we'll have to remove the CORS error.
from flask_cors import CORS 

# Initialize the flask application.
app = Flask(__name__)
# Wrap our app in cors.  This disables the error mentioned above.
CORS(app)

## Initialize some database things.

# Specify the location of the local sqlite database on our machine.
# The name of the database file will be mydatabase.db
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase.db"
# We're not going to track all the modifications we make to the database.
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Create an instance of our database.
db = SQLAlchemy(app)