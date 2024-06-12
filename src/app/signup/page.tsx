'use client'
import { useEffect, useState } from "react"
import axios from "axios"
import {toast} from "react-hot-toast"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function SignupPage() {
  const router = useRouter()
  const [user, setuser] = useState({
    email: "",
    password: "",
    username: ""
  })

  const [buttonDisabled, setButtonDisabled]= useState(false)

  const [loading, setLoading] = useState(false)
  
  const onSignup = async ()=>{
    try {
      setLoading(true)
      const response = await axios.post("/api/users/signup", user)
      console.log("Signup Success", response.data);
      router.push('/login')

      
    } catch (error: any) {
      console.log("Signup Failed");
      toast.error(error.message)
      
    }
  }


  useEffect(()=>{
    if(user.email.length > 0 && user.password.length>0 && user.username.length>0){
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true)
    }
  }, [user])
  
  return (
    <div className=" flex flex-col items-center justify-center min-h-screen py-2">
      <h1>
        {loading ? "Processing": "Signup"}
      </h1>
      <label htmlFor="username">Username</label>
      <input
      className="p-2 border border-gray-300 rounded-md text-black"
      id="username"
      value={user.username}
      onChange={(e)=>setuser({...user, username:e.target.value})}
      placeholder="username"
      type="text" />
      <label htmlFor="username">Email</label>
      <input
      className="p-2 border border-gray-300 rounded-md text-black"
      id="email"
      value={user.email}
      onChange={(e)=>setuser({...user, email:e.target.value})}
      placeholder="Email"
      type="text" />
      <label htmlFor="username">Password</label>
      <input
      className="p-2 border border-gray-300 rounded-md text-black"
      id="password"
      value={user.password}
      onChange={(e)=>setuser({...user, password:e.target.value})}
      placeholder="Password"
      type="password" />
      <button
      onClick={onSignup} 
      className=" p-2 border border-gray-300 rounded-lg mb-4 mt-5"
      disabled={buttonDisabled || loading}
      >
        {buttonDisabled ? "Please fill all the fields": "Signup"}
        
      </button>
      <Link href={"/login"}>Visit Login Page</Link>
    </div>
  )
}