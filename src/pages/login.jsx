import { useContext, useState } from "react";
import { ContextProvider } from "../stores";
import { Link, Navigate } from "react-router-dom";
import Icon from "../assets/icon.svg";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const { loginUser, user } = useContext(ContextProvider);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://203.175.11.198/api/v1/login", {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.data?.token) {
          loginUser(res.data.token);
        } else {
          throw new Error(res.message);
        }
      })
      .catch((err) => setErrorMessage(err.message));
  };

  const handleChange = (e) => {
    setFormData((oldFormData) => ({
      ...oldFormData,
      [e.target.name]: e.target.value,
    }));
  };

  if (user) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-center gap-2 items-center bg-gray-100">
      <form
        className="bg-white flex flex-col gap-2 border p-4 md:p-2 rounded-md shadow-md w-full h-full md:h-fit md:max-w-md"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col justify-center items-center py-2">
          <h1 className="font-bold text-4xl text-orange-300">MY PRESENSI</h1>
          <span className="text-xs">Manage your work, manage your life</span>
        </div>
        <div className="flex justify-center p-2">
          <img src={Icon} alt="Icon" />
        </div>
        <div className="p-2 grid gap-2">
          <label
            className="font-bold px-4 text-gray-700 text-xs"
            htmlFor="email"
          >
            Email :
          </label>
          <input
            className="border px-4 py-2 rounded-2xl bg-gray-300 outline-none"
            name="email"
            type="email"
            placeholder="sample@mail.com"
            onChange={handleChange}
          />
        </div>
        <div className="p-2 grid gap-2">
          <div className="px-4 flex justify-between">
            <label
              className="font-bold text-gray-700 text-xs"
              htmlFor="password"
            >
              Password :
            </label>
            <Link className="font-bold text-blue-700 text-xs" to="#">Forgot password?</Link>
          </div>
          <input
            className="border px-4 py-2 rounded-2xl bg-gray-300 outline-none"
            name="password"
            type="password"
            placeholder="***********"
            onChange={handleChange}
          />
        </div>
        <div className="p-2 mt-4 flex justify-between items-center">
          <button
            className="bg-blue-800 text-white p-2 rounded-2xl font-semibold border w-full"
            type="submit"
          >
            Login
          </button>
        </div>
        <div className="px-4 py-2">
          <a className="text-blue-800 hover:text-blue-700" href="/docs">
            Dokumentasi API
          </a>
        </div>
      </form>
      {errorMessage && (
        <div className="bg-pink-800 border p-2 rounded-md shadow-md w-full max-w-xs">
          <label className="text-white">{errorMessage}</label>
        </div>
      )}
    </div>
  );
}

export default Login;
