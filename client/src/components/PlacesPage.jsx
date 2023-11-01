import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

function PlacesPage() {
  const { action } = useParams()

  return (
    <div>
      {action !== 'new' && (
        <div className="text-center mt-8">
          <Link
            to={'/account/places/new'}
            className="bg-primary text-white px-4 py-2 rounded-full inline-flex gap-2"
          >
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new place
          </Link>
        </div>
      )}
      {action === 'new' && (
        <div className="max-w-lg mx-auto mt-10 border p-2">
          <form>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              placeholder="title, eg: My lovely apt"
            />
            <label htmlFor="address">Address</label>
            <input type="text" id="address" placeholder="address" />
          </form>
        </div>
      )}
    </div>
  )
}

export default PlacesPage
