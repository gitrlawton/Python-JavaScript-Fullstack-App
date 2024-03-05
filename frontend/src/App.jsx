import { useState, useEffect } from 'react'
import ContactList from './ContactList'
import ContactForm from './ContactForm'
import './App.css'

function App() {
  // State to store our contacts.
  const [contacts, setContacts] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  // {} is an empty object, used to store the contact we're 
  // currently editing.
  const [currentContact, setCurrentContact] = useState({})

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

  // Function that sets modal state to closed.
  const closeModal = () => {
    setIsModalOpen(false)
    // Since we're closing the modal, we're done working on
    // updating our current contact, so reset current contact 
    // to an empty object.
    setCurrentContact({})
  }

  // Function that sets modal state to open.
  const openCreateModal = () => {
    if (!isModalOpen) {
      setIsModalOpen(true)
    }
  }

  // Function
  const openEditModal = (contact) => {
    // If modal is open, just return.
    if (isModalOpen) {
      return
    }
    else {
      setCurrentContact(contact) // Set current contact to contact.
      setIsModalOpen(true) // Set modal to open and open the modal.
    }
  }

  const onUpdate = () => {
    closeModal()
    fetchContacts()
  }

  return ( 
    <> 
      <ContactList contacts={contacts} updateContact={openEditModal} updateCallback={onUpdate} />
      <button onClick={openCreateModal}>Create New Contact</button>
      { isModalOpen && <div className="modal">
          <div className="modal-content">
            {/*  &times;  generates an X to close modal. */}
            <span className="close" onClick={closeModal}>&times;</span>
            <ContactForm existingContact={currentContact} updateCallback={onUpdate} />
          </div>
        </div>
      }
    </>
  )
}

export default App
