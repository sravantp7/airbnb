import { useState, useEffect } from 'react'
import axios from 'axios'

const SERVER_URL = import.meta.env.VITE_SERVER_URL

function BookingsPage() {
  const [bookings, setBookings] = useState([])

  // this will fetch all the bookings for the logged in user
  useEffect(() => {
    async function fetchBookings() {
      const res = await axios.get(`${SERVER_URL}/api/bookings`)
      console.log(res.data)
      setBookings(res.data)
    }

    fetchBookings()
  }, [])

  return (
    <div>
      <div>
        {bookings?.length > 0 &&
          bookings.map((booking) => <div>{booking.price}</div>)}
      </div>
    </div>
  )
}

export default BookingsPage
