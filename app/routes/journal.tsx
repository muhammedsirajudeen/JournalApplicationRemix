import { LoaderFunction , redirect} from "@remix-run/node";
import { motion } from "motion/react"
import { useEffect, useState } from "react";
import { useStore } from "~/lib/GlobalProvider";
import cookie from "cookie"
import axiosInstance from "~/lib/axiosInstance";
export const loader:LoaderFunction = async ({request})=>{
    try{
      const cookies=cookie.parse(request.headers.get("cookie")||"")
      const token=cookies.token || null
      if(token){
        const response=(await axiosInstance.post('/auth/tokenVerify',{
          token:token
        }))
        if(response.status===200){
          return null
        }
      }else{
        return redirect('/')
      }
    }catch(error){
      console.log(error)
      return redirect('/')
    }
  }
export default function Journal() {
    const {setAuth}=useStore()
    setAuth(true)
    const [windowWidth, setWindowWidth] = useState(0);
    useEffect(() => {
        if (typeof window !== "undefined") {
            setWindowWidth(window.innerWidth);
            const handleResize = () => {
                setWindowWidth(window.innerWidth);
            };
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);
    let widthValue = 0;
    if (windowWidth < 1000) {
        widthValue = 200;
    } else if (windowWidth < 1024) {
        widthValue = 400;
    } else {
        widthValue = 500;
    }
    return (
        <div className="flex items-center justify-center flex-col w-screen">
            <motion.div className="bg-black lg:w-96 flex items-center justify-center lg:h-20 rounded-sm sm:w-48 sm:h-10"
                initial={{ width: 0 }}
                animate={{ width: widthValue }}
                transition={{ delay: 0.5, duration: 1 }}
            >
                <motion.h1 className="text-white text-3xl poppins-regular"  >
                    JOURNAL.
                </motion.h1>

            </motion.div>
        </div>
    )
}