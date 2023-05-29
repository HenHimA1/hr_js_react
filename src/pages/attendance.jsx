import { useEffect, useState, useContext } from "react";
import { ContextProvider } from "../stores";
import { Link, Navigate } from "react-router-dom";

function Attendance() {
  const { user } = useContext(ContextProvider);
  const [timeData, setTimeData] = useState(new Date());

  const handleCheckIn = () => {};

  const handleCheckOut = () => {};

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
      <div className="bg-white flex flex-col gap-2 border p-4 md:p-2 rounded-md shadow-md w-full h-full md:h-fit md:max-w-md">
        <div className="flex justify-end p-2">
          <Link className="font-semibold p-2 text-gray-700" to={"/logout"}>
            Logout
          </Link>
        </div>
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
          <iframe
            className="w-full h-96 p-2"
            src="https://www.openstreetmap.org/export/embed.html?bbox=106.82887941598894%2C-6.17790761456688%2C106.83241993188861%2C-6.17545964057078&amp;layer=mapnik&amp;marker=-6.176683628983706%2C106.83064967393875"
          ></iframe>
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
  );
}

export default Attendance;
