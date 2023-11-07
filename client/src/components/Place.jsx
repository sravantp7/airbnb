import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const SERVER_URL = import.meta.env.VITE_SERVER_URL

function Place() {
  const { id } = useParams() // getting the id of the place
  const [place, setPlace] = useState({})

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

  return (
    <div className="mt-4 bg-gray-100 py-6 px-8">
      {place && (
        <div>
          <h1 className="text-2xl mb-2 font-medium">{place.title}</h1>
          <div className="flex items-center gap-2">
            <p className="flex items-center gap-1">
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
            <p className="text-sm font-medium underline">100 reviews</p>
            <a
              href={`https://maps.google.com/?q=${place.address}`}
              target="_blank"
              className="underline text-sm font-medium"
            >
              {place.address}
            </a>
          </div>
          <div className="grid gap-2 grid-cols-[2fr_1fr] mt-4">
            <div>
              {place.photos?.[0] && (
                <img
                  src={`${SERVER_URL}/uploads/${place.photos[0]}`}
                  alt="img"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Place
