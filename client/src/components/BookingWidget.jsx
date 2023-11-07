function BookingWidget({ place }) {
  return (
    <div className="border-2 border-black rounded-xl max-w-[400px] shadow relative lg:top-[-50%] lg:left-[20%] bg-white">
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
        <input
          type="number"
          placeholder="no.of guests"
          min={1}
          max={`${place.maxGuests}`}
          className="bg-transparent outline-none p-2 border shadow rounded-2xl placeholder:px-1"
        />
      </div>

      {/* booking button */}
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
  )
}

export default BookingWidget
