import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CToast,
  CToastBody,
  CToaster,
  CToastHeader,
} from '@coreui/react'
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { db, collection, addDoc } from '../../Firebase'

const AddContact = () => {
  const [toast, addToast] = useState(0)
  const toaster = useRef()
  const { register, handleSubmit } = useForm()
  const onSubmit = (formData) => {
    addData(formData)
  }

  const addData = async (data) => {
    try {
      const ref = await addDoc(collection(db, 'contacts'), data)
      console.log('Contact Added with ID = ' + ref.id)
      addToast(sendAlert('green', 'Success', 'Contact Added'))
    } catch (e) {
      addToast(sendAlert('red', 'Error', 'Error: ' + e.message))
    }
  }

  const sendAlert = (color, type, message) => {
    return (
      <CToast autohide={false} visible={true}>
        <CToastHeader closeButton>
          <svg
            className="rounded me-2"
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
            role="img"
          >
            <rect width="100%" height="100%" fill={color}></rect>
          </svg>
          <strong className="me-auto">{type}</strong>
        </CToastHeader>
        <CToastBody>{message}</CToastBody>
      </CToast>
    )
  }

  return (
    <>
      <h4>Add Contact Details</h4>
      <CForm onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <CFormLabel>First Name</CFormLabel>
          <CFormInput placeholder="First Name" {...register('firstName')} required />
        </div>
        <div className="mb-3">
          <CFormLabel>Last Name</CFormLabel>
          <CFormInput placeholder="Last Name" {...register('lastName')} required />
        </div>
        <div className="mb-3">
          <CFormLabel>Email address</CFormLabel>
          <CFormInput placeholder="name@example.com" {...register('email')} type="email" required />
        </div>
        <div className="mb-3">
          <CFormLabel>Phone Number</CFormLabel>
          <CFormInput placeholder="+1 132 456 7856" {...register('phoneNumber')} required />
        </div>
        <div className="mb-3">
          <CFormLabel>Address</CFormLabel>
          <CFormTextarea
            rows="3"
            placeholder="Address Here...!"
            {...register('address')}
          ></CFormTextarea>
        </div>

        <div className="mb-3">
          <CCol xs={12}>
            <CButton color="primary" type="submit">
              Submit
            </CButton>
          </CCol>
        </div>
      </CForm>
      <CToaster ref={toaster} push={toast} placement="top-end" />
    </>
  )
}

export default AddContact
