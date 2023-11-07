import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

const SERVER_URL = import.meta.env.VITE_SERVER_URL

function IndexPage() {
  const [places, setPlaces] = useState([]) // hold all places data

  // fetch all places data from server when we load into index page
  useEffect(() => {
    async function getAllPlaces() {
      const res = await axios.get(`${SERVER_URL}/api/allplaces`)
      setPlaces(res.data)
    }
    getAllPlaces()
  }, [])

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 mt-8">
      {/* Rendering all available places in the index page */}
      {places.length > 0 &&
        places.map((place) => (
          // This route is for rendering all information about the place in a new page
          <Link to={`/place/${place._id}`} key={uuidv4()}>
            <div className="mb-2">
              {place.photos?.[0] && (
                <img
                  src={`${SERVER_URL}/uploads/${place.photos[0]}`}
                  alt="img"
                  className="rounded-xl object-cover aspect-square"
                />
              )}
            </div>
            <h2 className="font-bold truncate">{place.title}</h2>
            <h3 className="text-gray-500">{place.address}</h3>
            <p className="mt-1">
              <span className="font-medium">${place.price}</span> night
            </p>
          </Link>
        ))}
    </div>
  )
}

export default IndexPage
