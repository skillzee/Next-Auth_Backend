'use client'
import { useEffect, useState } from "react"
import axios from "axios"
import {toast} from "react-hot-toast"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LogInPage() {
  const router = useRouter()
  const [user, setuser] = useState({
    email: "",
    password: "",
  })

  const [buttonDisabled, setButtonDisabled]= useState(false)

  const [loading, setLoading] = useState(false)
  
  const onLogin = async ()=>{
    try {
      setLoading(true)
      const response = await axios.post("/api/users/login", user)
      console.log("Login Success", response.data);
      router.push('/profile')

      
    } catch (error: any) {
      console.log("Signup Failed");
      toast.error(error.message)
      
    }
  }


  useEffect(()=>{
    if(user.email.length > 0 && user.password.length>0){
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true)
    }
  }, [user])
  
  return (
    <div className=" flex flex-col items-center justify-center min-h-screen py-2">
      <h1>
        {loading ? "Processing": "Login"}
      </h1>
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
      onClick={onLogin} 
      className=" p-2 border border-gray-300 rounded-lg mb-4 mt-5"
      disabled={buttonDisabled || loading}
      >
        {buttonDisabled ? "Please fill all the fields": "Login"}
        
      </button>
      <Link href={"/signup"}>Visit Signup Page</Link>
    </div>
  )
}