import { useContext, useState } from "react";
import { ContextProvider } from "../stores";
import { Navigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
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
      .then((res) => loginUser(res.data.token));
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
    <div className="w-screen h-screen flex justify-center items-center">
      <form className="border p-2 rounded-md" onSubmit={handleSubmit}>
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
    </div>
  );
}

export default Login;
