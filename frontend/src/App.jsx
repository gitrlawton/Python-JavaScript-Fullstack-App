import { useState, useEffect } from 'react'
import ContactList from './ContactList'
import ContactForm from './ContactForm'
import './App.css'

function App() {
  // State to store our contacts.
  const [contacts, setContacts] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  // Function that closes modal.
  const closeModal = () => {
    setIsModalOpen(false)
  }

  // Function that opens modal.
  const openCreateModal = () => {
    if (!isModalOpen) {
      setIsModalOpen(true)
    }
  }

  return ( 
    <> 
      <ContactList contacts={contacts} />
      <button onClick={openCreateModal}>Create New Contact</button>
      { isModalOpen && <div className="modal">
          <div className="modal-content">
            {/*  &times;  generates an X to close modal. */}
            <span className="close" onClick={closeModal}>&times;</span>
            <ContactForm />
          </div>
        </div>
      }
    </>
  )
}

export default App
