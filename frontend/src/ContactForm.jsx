import {useState} from "react"

// Takes in our existing contact (if one exists.)
const ContactForm = ({ existingContact = {}, updateCallback }) => {
    // If one exists, use their values, otherwise, have an empty string.
    const [firstName, setFirstName] = useState(existingContact.firstName || "");
    const [lastName, setLastName] = useState(existingContact.lastName ||"");
    const [email, setEmail] = useState(existingContact.email || "");

    // If we're passing an existing contact, the length will not be 0.
    // Thus, we will be updating.
    const updating = Object.entries(existingContact).length !== 0

    const onSubmit = async (e) => {
        // Do not refresh the page automatically.
        e.preventDefault()

        // Javascript object.
        const data = {
            firstName,
            lastName,
            email
        }

        // Specify URL endpoint for adding new contact information (the
        // endpoint we set up to receive POST requests in our backend.)
        // or updating existing contact information based on dynamic data.
        // If updating variable is set to true, then set url to 
        // localhost:5000/update_contact/${existingContact.id}
        // Otherwise, set it to localhost:5000/create_contact
        const url = "http://127.0.0.1:5000/" + (
            updating ? `update_contact/${existingContact.id}` : "create_contact"
        )
        // When you're doing something other than a GET request, you need 
        // to specify options.
        const options = {
            method: updating ? "PATCH" : "POST",
            headers: {
                // Signals that we're about to send json data.
                "Content-Type": "application/json"
            },
            // Converts our javascript object named data into a json string
            // and sends it in the body of our request.
            body: JSON.stringify(data)
        }
        // Send the request.
        const response = await fetch(url, options)
        
        // If response wasn't successful...
        if (response.status !== 201 && response.status !== 200) {
            const data = await response.json()
            alert(data.message)
        }
        // Otherwise, it was successful.
        else {
            // Tell App.jsx we're finished, and to close the modal.
            updateCallback();
        }

        
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="firstName">First Name:</label>
                <input 
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="lastName">Last Name:</label>
                <input 
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)} 
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input 
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <button type="submit">{updating ? "Update" : "Create"}</button>
        </form>
    );
};

export default ContactForm