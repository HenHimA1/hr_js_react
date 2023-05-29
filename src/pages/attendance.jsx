import { useEffect, useState, useContext } from "react";
import { ContextProvider } from "../stores";
import { Link, Navigate } from "react-router-dom";
import OpenStreetMap from "../components/OpenStreetMap";

function Attendance() {
  const { user } = useContext(ContextProvider);
  const [timeData, setTimeData] = useState(new Date());
  const [position, setPosition] = useState({
    latitude: false,
    longitude: false,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleCheckIn = () => {
    console.log(position);
  };
  const handleCheckOut = () => {};
  const handleLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setErrorMessage("");
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      (err) => {
        setErrorMessage(err.message);
        setPosition({ latitude: false, longitude: false });
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  useEffect(() => {
    setInterval(() => {
      setTimeData(new Date());
    }, 1000);
  }, []);

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-center gap-2 items-center bg-gray-100">
      <div className="bg-white flex flex-col gap-2 border rounded-md shadow-md w-full h-full md:h-fit md:max-w-md">
        <div className="flex justify-end items-center p-2">
          <Link className="font-semibold text-gray-700 px-2" to={"/logout"}>
            Logout
          </Link>
        </div>
        <div className="grid place-items-center border-b p-2">
          <span className="font-bold text-4xl text-gray-700">
            {timeData.toLocaleTimeString()}
          </span>
          <span className="text-gray-500">{timeData.toDateString()}</span>
        </div>
        <div className="p-2 grid place-items-center">
          <span className="font-semibold text-xl text-gray-600">
            Working Schedule
          </span>
          <span className="font-semibold text-xl text-gray-600">
            08:00 - 17:00
          </span>
          {position.latitude && (
            <OpenStreetMap
              className="w-full h-96 px-2 py-2 transition transform ease-out origin-top-right duration-500"
              latitude={position.latitude}
              longitude={position.longitude}
            />
          )}
          {errorMessage && (
            <span className="font-semibold text-sm text-pink-600">
              {errorMessage}
            </span>
          )}
          <button
            className="bg-gray-500 text-white my-2 p-1 rounded-sm text-sm font-semibold"
            onClick={handleLocation}
          >
            Get Location
          </button>
        </div>
        <div className="px-4 flex-grow">
          <textarea
            className="outline-none border p-2 w-full h-full resize-none"
            type="text"
            placeholder="notes"
          />
        </div>
        <div className="grid grid-cols-2 gap-2 px-4 p-2">
          <button
            className="p-2 bg-blue-900 text-white rounded-md"
            onClick={handleCheckIn}
          >
            Check In
          </button>
          <button
            className="p-2 bg-blue-900 text-white rounded-md"
            onClick={handleCheckOut}
          >
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Attendance;
