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
        <div className="">
          <form>
            <label htmlFor="title" className="font-bold">
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="title, eg: My lovely apt"
            />
            <label htmlFor="address" className="font-bold">
              Address
            </label>
            <input type="text" id="address" placeholder="address" />
            <p className="font-bold">Photos</p>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="add image using link..."
                className=""
              />
              <button className="px-4 rounded-lg">Add&nbsp;photo</button>
            </div>
            <p className="text-gray-400">Upload image from device...</p>
            <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              <button className="border bg-transparent rounded-2xl p-8 text-2xl flex justify-center items-center gap-1">
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
                    d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
                  />
                </svg>
                <span>Upload</span>
              </button>
            </div>
            <div className="mt-2 font-bold">
              <label htmlFor="description">Description</label>
              <textarea
                className="block border px-2 py-1 mt-1 font-normal rounded-lg"
                id="description"
                cols="50"
                rows="10"
                placeholder="description here..."
              ></textarea>
            </div>
            <div>
              <h3 className="mt-3 mb-2 font-bold">Perks</h3>
              <p className="text-gray-500 mb-2">
                Select all the perks of your place
              </p>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                <label
                  htmlFor="wifi"
                  className="border shadow rounded-lg p-4 flex justify-start items-center gap-2 cursor-pointer"
                >
                  <input type="checkbox" id="wifi" />
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
                      d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
                    />
                  </svg>
                  <span>Wifi</span>
                </label>
                <label
                  htmlFor="free-parking"
                  className="border shadow rounded-lg p-4 flex justify-start items-center gap-2 cursor-pointer"
                >
                  <input type="checkbox" id="free-parking" />
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
                      d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                    />
                  </svg>
                  <span>Free Parking</span>
                </label>
                <label
                  htmlFor="pets"
                  className="border shadow rounded-lg p-4 flex justify-start items-center gap-2 cursor-pointer"
                >
                  <input type="checkbox" id="pets" />
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
                      d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                    />
                  </svg>
                  <span>Pets</span>
                </label>
                <label
                  htmlFor="tv"
                  className="border shadow rounded-lg p-4 flex justify-start items-center gap-2 cursor-pointer"
                >
                  <input type="checkbox" id="tv" />
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
                      d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
                    />
                  </svg>
                  <span>TV</span>
                </label>
                <label
                  htmlFor="private-entrance"
                  className="border shadow rounded-lg p-4 flex justify-start items-center gap-2 cursor-pointer"
                >
                  <input type="checkbox" id="private-entrance" />
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
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                    />
                  </svg>
                  <span>Private Entrance</span>
                </label>
              </div>
            </div>
            <div className="mt-4">
              <p className="font-bold">Extra Info</p>
              <p className="text-gray-500">House rules, etc..</p>
              <textarea className="border rounded-lg" cols="50" rows="10" />
            </div>
            <p className="font-bold">Check In & Out time</p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
              <div>
                <label htmlFor="checkin">Check In</label>
                <input type="text" id="checkin" placeholder="14:00" />
              </div>
              <div>
                <label htmlFor="checkout">Check Out</label>
                <input type="text" id="checkout" placeholder="22:00" />
              </div>
              <div>
                <label htmlFor="guests">Max No.of Guests</label>
                <input type="text" id="guests" placeholder="2" />
              </div>
            </div>
            <button className="primary">Save</button>
          </form>
        </div>
      )}
    </div>
  )
}

export default PlacesPage
