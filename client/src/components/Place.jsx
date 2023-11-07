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
              className="underline text-sm font-medium"
            >
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
        </div>
      )}
    </div>
  )
}

export default Place
