/* Component for rendering our contacts. */

import React from "react"

// Pass it our contacts, as well as functions to perform some operations
// Whenever we perform an update, call updateCallback().  Whenever we want 
// to update a contact, call updateContact().
const ContactList = ({ contacts, updateContact, updateCallback }) => {
    // Function to delete contact.  Pass it the contact's id.
    const onDelete = async (id) => {
        try {
            const options = {
                method: "DELETE"
            }
            // Send request to delete contact.
            const response = await fetch(`http://127.0.0.1:5000/delete_contact/${id}`, options)
            // If response status is successful...
            if (response.status === 200) {
                // Tell our App.jsx to close the modal.
                updateCallback()
            }
            // Otherwise there was an error.
            else {
                console.error("Failed to delete.")
            }
        }
        catch (error) {
            alert(error)
        }
    }

    return <div>
        <h2>Contacts</h2>
        <table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            {/* Dynamically rendered based off the list of contacts
            we're passing as a prop. */}
            <tbody>
                {/* For each contact in the contacts list, 
                    create a row with a key of contact id 
                */}
                {contacts.map((contact) => (
                    <tr key={contact.id}>
                        <td>{contact.firstName}</td>
                        <td>{contact.lastName}</td>
                        <td>{contact.email}</td>
                        <td>
                            {/* When button is clicked, generate a function 
                            to call updateContact and pass it the contact
                            we want to update. */}
                            <button onClick={() => updateContact(contact)}>Update</button>
                            <button onClick={() => onDelete(contact.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}

export default ContactList