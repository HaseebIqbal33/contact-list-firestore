import { CAccordion } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { db, collection, getDocs } from '../../Firebase'
import ContactItem from './ContactItem'

const Contacts = () => {
  const [loading, setLoading] = useState(true)
  const [contacts, setContacts] = useState([])
  useEffect(() => {
    async function getData() {
      const data = await getContacts(db)
      setContacts(data)
      setLoading(false)
    }
    getData()
  }, [])

  async function getContacts(db) {
    return new Promise(async (resolve) => {
      const contacts = collection(db, 'contacts')
      const contactSnapshot = await getDocs(contacts)
      const contactsList = contactSnapshot.docs.map((doc) => {
        const data = doc.data()
        data.id = doc.id
        return data
      })
      resolve(contactsList)
    })
  }

  return (
    <>
      {loading ? (
        <h3>Loading Contacts...</h3>
      ) : (
        <CAccordion>
          {contacts.length > 0 ? (
            contacts.map((item) => (
              <ContactItem
                key={item.id}
                item={item}
                setContacts={setContacts}
                getContacts={getContacts}
                contacts={contacts}
              />
            ))
          ) : (
            <h3>No Contacts Yet</h3>
          )}
        </CAccordion>
      )}
    </>
  )
}

export default Contacts
