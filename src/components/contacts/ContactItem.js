import React, { useEffect, useState } from 'react'
import { CAccordionBody, CAccordionHeader, CAccordionItem, CButton } from '@coreui/react'
import { db, deleteDoc, doc, updateDoc } from '../../Firebase'

const ContactItem = ({ item, setContacts, contacts }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')

  useEffect(() => {
    setFirstName(item.firstName)
    setLastName(item.lastName)
    setEmail(item.email)
    setPhoneNumber(item.phoneNumber)
    setAddress(item.address)
  }, [item])

  const updateContact = async (id) => {
    const ref = doc(db, 'contacts', id)
    const contact = {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
    }
    await updateDoc(ref, contact)
    contacts[contacts.findIndex((item) => item.id === id)].firstName = contact.firstName
    contacts[contacts.findIndex((item) => item.id === id)].lastName = contact.lastName
    setIsEditing(false)
  }

  const deleteContact = async (id) => {
    await deleteDoc(doc(db, 'contacts', id))
    setContacts(contacts.filter((item) => item.id !== id))
  }

  return (
    <CAccordionItem key={item.id}>
      <CAccordionHeader>
        {item.firstName} {item.lastName}
      </CAccordionHeader>
      <CAccordionBody>
        <div>
          <strong>First Name: &nbsp;</strong>
          {isEditing ? (
            <input defaultValue={firstName} onChange={(e) => setFirstName(e.target.value)} />
          ) : (
            firstName
          )}
        </div>
        <div>
          <strong>Last Name: &nbsp;</strong>
          {isEditing ? (
            <input defaultValue={lastName} onChange={(e) => setLastName(e.target.value)} />
          ) : (
            lastName
          )}
        </div>
        <div>
          <strong>Email: &nbsp;</strong>
          {isEditing ? (
            <input defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
          ) : (
            email
          )}
        </div>
        <div>
          <strong>Phone: &nbsp;</strong>
          {isEditing ? (
            <input defaultValue={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          ) : (
            phoneNumber
          )}
        </div>
        <div className="mb-3">
          <strong>Address: &nbsp;</strong>
          {isEditing ? (
            <input defaultValue={address} onChange={(e) => setAddress(e.target.value)} />
          ) : (
            address
          )}
        </div>

        {isEditing ? (
          <CButton color="success" onClick={() => updateContact(item.id)}>
            Submit
          </CButton>
        ) : (
          <div>
            <CButton color="success" onClick={() => setIsEditing(true)}>
              Edit
            </CButton>
            &nbsp; &nbsp;
            <CButton color="danger" onClick={() => deleteContact(item.id)}>
              Delete
            </CButton>
          </div>
        )}
      </CAccordionBody>
    </CAccordionItem>
  )
}

export default ContactItem
