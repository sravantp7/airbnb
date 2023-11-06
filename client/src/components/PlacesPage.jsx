import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid' // for generating unique key values

const SERVER_URL = import.meta.env.VITE_SERVER_URL

function PlacesPage() {
  const { action } = useParams()
  const { id } = useParams()

  // states
  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [addedPhotos, setAddedPhotos] = useState([])
  const [photoLink, setPhotoLink] = useState('') // used to hold the image link
  const [description, setDescription] = useState('')
  const [perks, setPerks] = useState([])
  const [extraInfo, setExtraInfo] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [maxGuests, setMaxGuests] = useState(1)
  const [places, setPlaces] = useState([]) // for holding added places by the user when loading in

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

  // function for adding new place / updating existing place
  // an existing place loads to th form when we have an id with it
  // so if id there then update the content else add new place to the db
  async function savePlace(e) {
    e.preventDefault()
    const data = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    }

    if (id) {
      data.id = id // if id available then adding it with the data object
      // update the existing place details (PUT)
      await axios.put(`${SERVER_URL}/api/places`, data)
    } else {
      // add new place to the db
      // sending place data to the server
      await axios.post(`${SERVER_URL}/api/places`, data)
    }
  }

  console.log(addedPhotos)

  async function removePhoto(e, filename) {
    console.log(filename)
    setAddedPhotos((prev) => prev.filter((file) => file != filename))
  }

  // when clicking on a specific place it will send a request to server with id to get its all details
  // this will loads the details of the place to the form, from there we can edit the content of it
  useEffect(() => {
    async function fetchPlaceById() {
      const { data } = await axios.get(`${SERVER_URL}/api/places/${id}`) // here id will be send as query params
      setTitle(data.title)
      setAddress(data.address)
      setAddedPhotos(data.photos)
      setDescription(data.description)
      setPerks(data.perks)
      setExtraInfo(data.extraInfo)
      setCheckIn(data.checkIn)
      setCheckOut(data.checkOut)
      setMaxGuests(data.maxGuests)
    }
    if (id != undefined) {
      fetchPlaceById()
    }
  }, [id])

  // used to load all places which was added by the user when loading into the accommodation page
  useEffect(() => {
    async function loadPlaces() {
      const { data: placeData } = await axios.get(`${SERVER_URL}/api/places`)
      setPlaces(placeData)
    }
    loadPlaces()
  }, [])

  return (
    <div>
      {action !== 'new' && (
        <>
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

          {/* Render already added places */}
          <div className="mt-4">
            {places.length > 0 &&
              places.map((place) => (
                <Link to={`/account/places/new/${place._id}`} key={uuidv4()}>
                  <div className="border p-4 rounded-2xl flex gap-3 cursor-pointer">
                    <div className="w-32 bg-gray-300 rounded-xl">
                      {place.photos.length > 0 && (
                        <img
                          // using static file access
                          src={`${SERVER_URL}/uploads/${place.photos[0]}`}
                          alt={place.title}
                          className="rounded-xl"
                        />
                      )}
                    </div>
                    <div className="grow-0 shrink">
                      <h2 className="text-xl font-bold">{place.title}</h2>
                      <p className="text-md mt-3">{place.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </>
      )}

      {action === 'new' && (
        <div className="">
          <form onSubmit={savePlace}>
            <label htmlFor="title" className="font-bold">
              Title
            </label>
            <input
              type="text"
              id="title"
              required
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
              required
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
                  <div key={link} className="h-32 flex relative">
                    <img
                      // accessing static files
                      src={`${SERVER_URL}/uploads/${link}`}
                      alt="img"
                      className="rounded-2xl w-full object-cover"
                    />

                    {/* adding trash can icon for removing added photos */}
                    <button
                      onClick={(e) => removePhoto(e, link)}
                      className="absolute bottom-1 right-1 cursor-pointer bg-black p-1 bg-opacity-50 rounded-xl"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                ))}

              <label className="border bg-transparent rounded-2xl p-8 text-2xl flex justify-center items-center gap-1 cursor-pointer">
                {/* select file from the device */}
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={uploadPhoto}
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
                    checked={perks.includes('wifi')}
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
                    checked={perks.includes('parking')}
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
                    checked={perks.includes('pets')}
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
                    checked={perks.includes('tv')}
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
                    checked={perks.includes('entrance')}
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
                className="border rounded-lg px-2 py-1"
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
