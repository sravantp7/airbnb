import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const SERVER_URL = import.meta.env.VITE_SERVER_URL

function Place() {
  const { id } = useParams() // getting the id of the place
  const [place, setPlace] = useState({})
  const [showAllPhotos, setShowAllPhotos] = useState(false)

  useEffect(() => {
    if (!id) {
      return
    }
    async function fetchPlaceDetails() {
      // fetching place details using id
      const { data: placeData } = await axios.get(
        `${SERVER_URL}/api/places/${id}`
      )
      setPlace(placeData)
    }

    fetchPlaceDetails()
  }, [id])

  // rendering all photos
  if (showAllPhotos) {
    return (
      <div className="min-w-full min-h-screen bg-white relative">
        <button
          className="absolute right-[20%] top-6 rounded-full p-2"
          onClick={() => setShowAllPhotos(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className="mt-20 flex flex-col gap-4 items-center">
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              <img
                key={photo}
                src={`${SERVER_URL}/uploads/${photo}`}
                className="w-[50%]"
              />
            ))}
        </div>
      </div>
    )
  }

  return (
    <div className="mt-4 bg-gray-100 py-6 px-8">
      {place && (
        <div>
          <h1 className="text-2xl mb-2 font-medium">{place.title}</h1>
          <div className="flex items-center gap-2">
            <p className="flex items-center gap-1 text-sm font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
              4.6
            </p>
            <p className="text-sm font-medium underline">101 reviews</p>
            <a
              href={`https://maps.google.com/?q=${place.address}`}
              target="_blank"
              className="underline text-sm font-medium flex items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>

              {place.address}
            </a>
          </div>

          {/* Photos */}
          <div className="grid gap-2 grid-cols-[2fr_1fr] mt-4">
            <div>
              {place.photos?.[0] && (
                <img
                  src={`${SERVER_URL}/uploads/${place.photos[0]}`}
                  alt="img"
                />
              )}
            </div>
            <div className="grid gap-2 relative">
              <div>
                {place.photos?.[1] && (
                  <img
                    src={`${SERVER_URL}/uploads/${place.photos[1]}`}
                    alt="img"
                  />
                )}
              </div>
              <div>
                {place.photos?.[2] && (
                  <img
                    src={`${SERVER_URL}/uploads/${place.photos[2]}`}
                    alt="img"
                  />
                )}
              </div>
              <button
                className="absolute bottom-2 right-2 px-3 py-1 rounded-2xl bg-gray-200 cursor-pointer flex gap-1 shadow"
                onClick={() => setShowAllPhotos(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M18.75 12.75h1.5a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5zM12 6a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 6zM12 18a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 18zM3.75 6.75h1.5a.75.75 0 100-1.5h-1.5a.75.75 0 000 1.5zM5.25 18.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 010 1.5zM3 12a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 013 12zM9 3.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM12.75 12a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0zM9 15.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                </svg>
                <span>Show all photos</span>
              </button>
            </div>
          </div>
          <div className="my-4">
            <h2 className="font-medium underline text-xl mb-2">Description</h2>
            {place.description}
          </div>
          <hr className="w-[50%] mb-4" />
          <div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
                />
              </svg>

              <div>
                <p className="font-medium text-xl">Great for remote works</p>
                <p className="text-sm text-gray-500">
                  Fast wifi at 95 Mbps, plus a dedicated workspace in a common
                  area.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
              </svg>

              <div>
                <p className="font-medium text-xl">Self check-in</p>
                <p className="text-sm text-gray-500">
                  Check yourself in with the keypad.
                </p>
              </div>
            </div>
          </div>
          <hr className="w-[50%] my-4" />
          <p className="font-medium text-xl mb-2">Extra details</p>
          <div className="grid grid-cols-2 relative">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  Check In : {place.checkIn} <span>(24 Hours)</span>
                </div>
              </div>
              <div className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  Check Out : {place.checkOut} <span>(24 Hours)</span>
                </div>
              </div>
              <div className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
                <div>Max No.of Guests : {place.maxGuests}</div>
              </div>
            </div>

            {/* booking box */}
            <div className="border-2 border-black rounded-xl max-w-[400px] shadow relative lg:top-[-50%] lg:left-[20%]">
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
                  <input type="date" className="bg-transparent" />
                </div>
                <div className="flex gap-2 justify-evenly border shadow p-2 rounded-2xl">
                  <label htmlFor="checkout" className="font-medium">
                    CheckOut
                  </label>
                  <input type="date" className="bg-transparent" />
                </div>
                {/* guests */}
                {/* <div className="border shadow p-2 rounded-2xl"> */}
                <input
                  type="number"
                  placeholder="no.of guests"
                  min={1}
                  max={`${place.maxGuests}`}
                  className="bg-transparent outline-none p-2 border shadow rounded-2xl placeholder:px-1"
                />
                {/* </div> */}
              </div>

              <div className="max-w-[300px] mx-auto my-2">
                <button className="primary">Book this place</button>
              </div>
              <div className="grid grid-cols-2 mx-8 my-4 text-gray-500">
                <div>
                  <p>${place.price} x 1 night</p>
                  <p>Cleaning fee</p>
                  <p>Service Fee</p>
                  <p>Offer Price</p>
                </div>
                <div className="text-right">
                  <p>${place.price}</p>
                  <p>$20</p>
                  <p>$40</p>
                  <p>${place.price}</p>
                </div>
              </div>
              <div className="w-[90%] mx-auto border-2 border-black mb-4"></div>
              <div className="w-[200px] mx-auto text-center mb-3 font-medium text-xl">
                Total : ${place.price}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Place
