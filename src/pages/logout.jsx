import { useContext, useEffect } from 'react'
import { ContextProvider } from '../stores'
import { Navigate } from 'react-router-dom'

function Logout() {
    const { logoutUser } = useContext(ContextProvider)

    useEffect(() => { logoutUser() })

    return <Navigate to={"/login"} />
}

export default Logout