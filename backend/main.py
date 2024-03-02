## Our main roots/endpoints.

# Endpoints are anything after our server.  
# Example: localhost:5000/about   <-

# A request is anything we send to a server, in our case an API.
# Requesting something to happen.  Sent by the front end to the backend.
# A request has a type (either GET, POST, PATCH, DELETE)
# accompanied by some json data.

# A response is sent by the backend to the frontend.
# Contains a status (200 for success, 404 not found, etc.)
# accompanied by some json data.


from flask import request, jsonify # jsonify allows us to return json data.
from config import app, db
from models import Contact

# /contacts is the route/endpoint we're going to go to.
# On this line, we're specifying the valid requests we can make to /contacts.
@app.route("/contacts", methods = ["GET"]) # GET method decorator.
def get_contacts():
    # Uses flask to get all the contacts in our Contact database.
    # The contacts variable will hold a bunch of python objects, each
    # object another contact.
    contacts = Contact.query.all()
    # Take the Python objects in our contacts variable and convert them 
    # into json.  Map takes the contacts and applies our to_json() function
    # to them, and stores them in a map.  We then convert the map to a list.
    json_contacts = list(map(lambda x: x.to_json(), contacts))
    # Create a python dictionary, with the key being "contacts", holding
    # our list of contacts, then jsonify and return it.
    return jsonify({"contacts": json_contacts})

# Route for creating the contacts.
@app.route("/create_contact", methods = ["POST"])
def create_contact():
    # Look in the request's json data and extract the contact's first name, 
    # last name and email.  Save them to corresponding variables.
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    email = request.json.get("email")
    
    # If any of the variables are "" or None (ie. False)
    if not first_name or not last_name or not email:
        # Return a json message and the appropriate error code.
        return (jsonify({
            "message": "You must include a first name, last name, and email"
            }), 400,
        )
    else:
        # Create a new contact passing the above variables as arguments.
        # Note: id will be automatically generated for us, so we do not need
        # to pass an id.
        new_contact = Contact(first_name = first_name, last_name = last_name,
                              email = email)
        # Errors can occur here, so use a try/except block.
        try:
            # Stages the contact for adding, doesn't actually add it.
            db.session.add(new_contact) 
            # Adds all the staged objects to the database.
            db.session.commit()
            
        except Exception as exception_object:
            return jsonify({"message": str(exception_object)}), 400
        # Return message along with status code for "creation".
        return jsonify({"message": "User created!"}), 201
    
# Route for updating a contact's information in the database. 
# Example endpoint:  /update_contact/1 
@app.route("/update_contact/<int:user_id>", methods = ["PATCH"])
def update_contact(user_id):
    # Look in the database and find the user that has this id.
    contact = Contact.query.get(user_id)
    
    # If no user is found with that id
    if not contact:
        return jsonify({"message": "User not found."}), 404
    # Otherwise...
    else:
        # The data given to us.
        data = request.json
        # Update the contact's first name to be the first name given to us.
        #
        # get() looks for the key "firstName" in the data given to us. If it 
        # exists, it'll return that key's value. If it doesn't, it'll return 
        # the value associated with the second argument.
        contact.first_name = data.get("firstName", contact.first_name)
        
        contact.last_name = data.get("lastName", contact.last_name)
        contact.email = data.get("email", contact.email)
        # Since the contact already exists, it doesn't need to be staged again.
        # We can just commit.
        db.session.commit()
        
        return jsonify({"message": "User updated."}), 200

# Route for deleting a contact from the database.
# Example endpoint:  /delete_contact/1 
@app.route("/delete_contact/<int:user_id>", methods = ["DELETE"])
def delete_contact(user_id):
    # Look in the database and find the user that has this id.
    contact = Contact.query.get(user_id)
    
    # If no user is found with that id
    if not contact:
        return jsonify({"message": "User not found."}), 404
    # Otherwise...
    else:
        db.session.delete(contact)
        db.session.commit()
        
        return jsonify({"message": "User deleted."}), 200

# A condition that protects against running the app unless we
# intentionally run it.
if __name__ == "__main__":
    # Get the context of our application
    with app.app_context():
        # Create all of the different models defined in our database.
        # ie. spin up the database.
        db.create_all()
        
    app.run(debug = True)