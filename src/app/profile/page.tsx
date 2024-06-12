'use client'
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast, { Toast } from "react-hot-toast"


export default function ProfilePage() {
    const router = useRouter()
    const [data, setdata] = useState("nothing")

    const getUserDetails = async () =>{
        const res = await axios.post("/api/users/me")
        console.log(res.data);
        setdata(res.data.data._id)
        
    }

    const logout = async () =>{
        try {
            await axios.get('/api/users/logout')
            toast.success("Logout Success")
            router.push("/login")
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message)
            
            
        }
    }
  return (
    <div className=" flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Profile Page</h1>
        <hr />
        <h2>
            {data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}
        </h2>
        <hr />
        <button
        className=" rounded bg-red-500 font-bold text-white"
         onClick={logout}>Logout</button>
        <button
        className=" rounded mt-10 bg-blue-500 font-bold text-white"
         onClick={getUserDetails}>Details</button>
    </div>
  )
}

