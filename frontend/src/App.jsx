import { useState, useEffect } from 'react'
import ContactList from './ContactList'
import './App.css'

function App() {
  // State to store our contacts.
  const [contacts, setContacts] = useState([])

  // As soon as this component renders, it calls fetchContacts to
  // get the contacts, which saves them in the state.
  useEffect(() => {
    fetchContacts()
  }, [])

  // Async because we want it to wait a second to fetch the contacts.
  const fetchContacts = async () => {
    // Send a GET request to the backend to get the contacts.
    const response = await fetch("http://127.0.0.1:5000/contacts")
    // Data from the backend in json form.
    const data = await response.json()

    setContacts(data.contacts)
  }

  return <ContactList contacts={contacts} />

}

export default App
