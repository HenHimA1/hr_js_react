import { useEffect, useState, useContext } from "react";
import { ContextProvider } from "../stores";
import { Link, Navigate } from "react-router-dom";

function Attendance() {
  const { user } = useContext(ContextProvider)
  const [timeData, setTimeData] = useState(new Date());

  const handleCheckIn = () => { };

  const handleCheckOut = () => { };

  useEffect(() => {
    setInterval(() => {
      setTimeData(new Date());
    }, 1000);
  }, []);

  if (!user) {
    return <Navigate to={"/login"} />
  }

  return (
    <div className="bg-gray-100 w-screen h-screen flex flex-col gap-2">
      <div className="w-full bg-white flex justify-end">
        <Link className="font-semibold p-2 text-gray-700" to={"/logout"}>Logout</Link>
      </div>
      <div className="w-full flex-grow flex items-center justify-center">
        <div className="bg-white border rounded-md shadow-md w-full max-w-lg flex flex-col">
          <div className="grid place-items-center border-b p-4">
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
          </div>
          <div className="p-4 flex-grow">
            <textarea
              className="outline-none border p-2 w-full h-full resize-none"
              type="text"
              placeholder="notes"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 p-4">
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
    </div>
  );
}

export default Attendance;
