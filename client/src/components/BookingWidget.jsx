import { useEffect, useState } from 'react'
import { differenceInCalendarDays } from 'date-fns'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { useUserContext } from '../context/UserContext'

const SERVER_URL = import.meta.env.VITE_SERVER_URL

function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [noOfGuests, setNoOfGuests] = useState('')
  const [bookedDays, setBookedDays] = useState(0)
  const [showForm, setShowForm] = useState(false)
  const [redirect, setRedirect] = useState(false)

  const { user } = useUserContext()

  // states for user details
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  async function bookPlace() {
    const totalPrice = place.price * bookedDays

    if (!(name && email && phone)) {
      alert('Please provide your details')
      return
    }
    // checking if all characters are number or not
    if (isNaN(phone)) {
      alert('Please provide valid phone number')
      return
    }

    // book place (send request to backend)
    try {
      const res = await axios.post(`${SERVER_URL}/api/bookings`, {
        place: place._id,
        checkIn,
        checkOut,
        noOfGuests,
        name,
        email,
        phone,
        price: totalPrice,
      })

      if (!res.data) {
        alert('Please Login')
        return
      } else {
        alert('Successfully Booked')
        setRedirect(true)
      }
    } catch (err) {
      console.error(err.message)
    }
  }

  // used to auto populate user inthe booking form
  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
    }
  }, [user])

  useEffect(() => {
    if (checkIn && checkOut) {
      if (checkOut <= checkIn) {
        setCheckOut('')
        alert(`You can't set same / past date as checkout date`)
        return
      }
      setBookedDays(
        differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
      )
    }
  }, [checkIn, checkOut])

  // redirecting to my bookings section after successfully booked a place
  if (redirect) {
    return <Navigate to={'/account/bookings'} />
  }

  return (
    <div className="border-2 border-black rounded-xl max-w-[400px] shadow relative lg:top-[-40%] lg:left-[15%] bg-white">
      <div id="top" className="flex justify-between p-4">
        <div className="text-lg">
          <span className="font-medium">${place.price} </span>night
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
            <p>4.6</p>
          </div>
          <div className="text-gray-500">101 reviews</div>
        </div>
      </div>

      {/* inputs */}
      <div className="mx-2 flex flex-col gap-2 px-8">
        <div className="flex gap-2 justify-evenly border shadow p-2 rounded-2xl">
          <label htmlFor="checkin" className="font-medium">
            CheckIn&nbsp;&nbsp;&nbsp;
          </label>
          <input
            type="date"
            id="checkin"
            className="bg-transparent"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            disabled={showForm}
          />
        </div>
        <div className="flex gap-2 justify-evenly border shadow p-2 rounded-2xl">
          <label htmlFor="checkout" className="font-medium">
            CheckOut
          </label>
          <input
            type="date"
            id="checkout"
            className="bg-transparent"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            disabled={showForm}
          />
        </div>

        {/* guests */}
        <input
          type="number"
          placeholder={`No.of Guests (max : ${place.maxGuests})`}
          min={1}
          max={`${place.maxGuests}`}
          className="bg-transparent outline-none p-2 border shadow rounded-2xl placeholder:px-1"
          value={noOfGuests}
          onChange={(e) => setNoOfGuests(e.target.value)}
          disabled={showForm}
        />
      </div>

      {/* booking button */}
      <div className="max-w-[300px] mx-auto my-2 px-2">
        <button
          className="primary"
          onClick={() => {
            if (
              !(checkIn && checkOut && noOfGuests) ||
              noOfGuests > place.maxGuests
            ) {
              alert('Please provide valid details')
              return
            } else {
              setShowForm(!showForm)
            }
          }}
        >
          {!showForm ? 'Confirm' : 'Edit'}
        </button>
      </div>

      {!showForm && (
        <div className="grid grid-cols-2 mx-8 my-4 text-gray-500">
          <div>
            <p>
              ${place.price} x {bookedDays} night
            </p>
            <p>Cleaning fee</p>
            <p>Service Fee</p>
            <p>Offer Price</p>
          </div>
          <div className="text-right">
            <p>${place.price * bookedDays}</p>
            <p>{checkIn && checkOut ? '$20' : '$0'}</p>
            <p>{checkIn && checkOut ? '$40' : '$0'}</p>
            <p>{checkIn && checkOut ? '- $60' : '$0'}</p>
          </div>
        </div>
      )}

      {showForm && (
        <div>
          <div className="flex items-center gap-2 px-10">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 px-10">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 px-10">
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="max-w-[300px] mx-auto my-4 px-2">
            <button className="primary" onClick={bookPlace}>
              Book Place
            </button>
          </div>
        </div>
      )}

      <div className="w-[90%] mx-auto border-2 border-black mb-4"></div>
      <div className="w-[200px] mx-auto text-center mb-3 font-medium text-xl">
        Total : ${place.price * bookedDays}
      </div>
    </div>
  )
}

export default BookingWidget
