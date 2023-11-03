import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const SERVER_URL = import.meta.env.VITE_SERVER_URL

function PlacesPage() {
  const { action } = useParams()

  // states
  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [addedPhotos, setAddedPhotos] = useState([])
  const [photoLink, setPhotoLink] = useState('')
  const [description, setDescription] = useState('')
  const [perks, setPerks] = useState([])
  const [extraInfo, setExtraInfo] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [maxGuests, setMaxGuests] = useState(1)

  function handleSubmit(e) {
    e.preventDefault()
  }

  // function that sends the image url to server
  async function addPhotoByLink(e) {
    e.preventDefault()

    if (!photoLink) return

    try {
      // destructuring data from res and renaming it into filename
      const { data: filename } = await axios.post(
        `${SERVER_URL}/api/upload-image-link`,
        {
          imageURL: photoLink,
        }
      )
      // storing filename inside array
      setAddedPhotos((prev) => [...prev, filename])
    } catch (err) {
      console.error(err.message)
    } finally {
      setPhotoLink('')
    }
  }

  // function for uploading files from device
  async function uploadPhoto(e) {
    try {
      const files = e.target.files
      const data = new FormData()

      for (let file of files) {
        data.append('photos', file)
      }

      const { data: filenames } = await axios.post(
        `${SERVER_URL}/api/uploads`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      // adding file names which got by uploading from device to state for rendering
      setAddedPhotos((prev) => [...prev, ...filenames])
    } catch (err) {
      console.error(err.message)
    }
  }

  // function used to add selected perks to state
  function handlePerks(e) {
    const { checked, name } = e.target
    if (checked) {
      setPerks((prev) => [...prev, name])
    } else {
      // removing unselected perks by filtering through the array
      setPerks((prev) => prev.filter((perk) => perk !== name))
    }
  }

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
          <form onSubmit={handleSubmit}>
            <label htmlFor="title" className="font-bold">
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="title, eg: My lovely apt"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="address" className="font-bold">
              Address
            </label>
            <input
              type="text"
              id="address"
              placeholder="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <p className="font-bold">Photos</p>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="add image using link..."
                value={photoLink}
                onChange={(e) => setPhotoLink(e.target.value)}
              />
              <button className="px-4 rounded-lg" onClick={addPhotoByLink}>
                Add&nbsp;photo
              </button>
            </div>
            <p className="text-gray-400">Upload image from device...</p>
            <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {/* Rendering uploaded images */}
              {addedPhotos.length > 0 &&
                addedPhotos.map((link) => (
                  <div key={link} className="h-32 flex">
                    <img
                      src={`${SERVER_URL}/uploads/${link}`}
                      alt="img"
                      className="rounded-2xl w-full object-cover"
                    />
                  </div>
                ))}

              <label className="border bg-transparent rounded-2xl p-8 text-2xl flex justify-center items-center gap-1 cursor-pointer">
                {/* select file from the device */}
                <input
                  type="file"
                  className="hidden"
                  onChange={uploadPhoto}
                  multiple
                />
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
              </label>
            </div>
            <div className="mt-2 font-bold">
              <label htmlFor="description">Description</label>
              <textarea
                className="block border px-2 py-1 mt-1 font-normal rounded-lg"
                id="description"
                cols="50"
                rows="10"
                placeholder="description here..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
                  <input
                    type="checkbox"
                    name="wifi"
                    id="wifi"
                    onChange={handlePerks}
                  />
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
                  <input
                    type="checkbox"
                    name="parking"
                    id="free-parking"
                    onChange={handlePerks}
                  />
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
                  <input
                    type="checkbox"
                    id="pets"
                    name="pets"
                    onChange={handlePerks}
                  />
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
                  <input
                    type="checkbox"
                    id="tv"
                    name="tv"
                    onChange={handlePerks}
                  />
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
                  <input
                    type="checkbox"
                    id="private-entrance"
                    name="entrance"
                    onChange={handlePerks}
                  />
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
              <textarea
                className="border rounded-lg"
                cols="50"
                rows="10"
                value={extraInfo}
                onChange={(e) => setExtraInfo(e.target.value)}
              />
            </div>
            <p className="font-bold">Check In & Out time</p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
              <div>
                <label htmlFor="checkin">Check In</label>
                <input
                  type="text"
                  id="checkin"
                  placeholder="14:00"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="checkout">Check Out</label>
                <input
                  type="text"
                  id="checkout"
                  placeholder="22:00"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="guests">Max No.of Guests</label>
                <input
                  type="text"
                  id="guests"
                  placeholder="2"
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(e.target.value)}
                />
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
