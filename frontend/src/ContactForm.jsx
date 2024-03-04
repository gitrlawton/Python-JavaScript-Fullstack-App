import {useState} from "react"

const ContactForm = ({}) => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")

    const onSubmit = async (e) => {
        // Do not refresh the page automatically.
        e.preventDefault()

        // Javascript object.
        const data = {
            firstName,
            lastName,
            email
        }

        // Specifying URL endpoint for adding new contact information (the
        // endpoint we set up to receive POST requests in our backend.)
        const url = "http://127.0.0.1:5000/create_contact"
        // When you're doing something other than a GET request, you need 
        // to specify options.
        const options = {
            method: "POST",
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
            <button type="submit">Create Contact</button>
        </form>
    );
};

export default ContactForm