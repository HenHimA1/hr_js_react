import { useContext, useState } from "react";
import { ContextProvider } from "../stores";
import { Navigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("")
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
          loginUser(res.data.token)
        }
        else {
          throw new Error(res.message)
        }
      }).catch(err => setErrorMessage(err.message));
  };

  const handleChange = (e) => {
    setFormData((oldFormData) => ({
      ...oldFormData,
      [e.target.name]: e.target.value,
    }));
  };

  if (user) {
    return <Navigate to={"/"} />
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-center gap-2 items-center bg-gray-100">
      <form className="bg-white border p-2 rounded-md shadow-md w-full max-w-xs" onSubmit={handleSubmit}>
        <div className="p-2 grid gap-2">
          <label className="font-semibold text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            className="border p-1 rounded-sm text-gray-700 outline-none"
            name="email"
            type="email"
            onChange={handleChange}
          />
        </div>
        <div className="p-2 grid gap-2">
          <label className="font-semibold text-gray-700" htmlFor="">
            Password
          </label>
          <input
            className="border p-1 rounded-sm text-gray-700 outline-none"
            name="password"
            type="password"
            onChange={handleChange}
          />
        </div>
        <div className="p-2 flex justify-end">
          <button
            className="bg-blue-800 text-white p-2 rounded-md font-semibold"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
      {errorMessage &&
        <div className="bg-pink-800 border p-2 rounded-md shadow-md w-full max-w-xs">
          <label className="text-white">{errorMessage}</label>
        </div>
      }
    </div>
  );
}

export default Login;
