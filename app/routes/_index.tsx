import { LoaderFunction, MetaFunction,redirect } from "@remix-run/node";
import {  Link } from "@remix-run/react";
import { AnimatePresence, motion } from "motion/react";
import ResponsiveMotionDiv from "~/components/animatedBox";

import cookie from "cookie"
import axiosInstance from "~/lib/axiosInstance";
export const meta: MetaFunction = () => {
  return [
    { title: "Personal Journal Application" },
    { name: "description", content: "Write your journal automatically synced" },
  ];
};

export const loader:LoaderFunction = async ({request})=>{
  try{
    const cookies=cookie.parse(request.headers.get("cookie")||"")
    const token=cookies.token || null
    if(token){
      const response=(await axiosInstance.post('/auth/tokenVerify',{
        token:token
      }))
      if(response.status===200){
        return redirect('/journal')
      }
    }else{
      return null
    }
  }catch(error){
    console.log(error)
    return null
  }
}

export default function Index() {

  return (
    <div className="flex h-screen items-center justify-start canvas-container flex-col sm:ml-10 sm:mt-40 lg:ml-center ">
    <div className=" flex items-end justify-center" >
      <ResponsiveMotionDiv/>
    </div>
      <AnimatePresence>
        <motion.h1
          className="font-bold lg:text-largest sm:text-3xl poppins-regular mt-20"
          initial={{ opacity: 0, x: -100 }}  // Start off-screen (left) with 0 opacity
          animate={{ opacity: 1, x: 0 }}     // End with full opacity and at normal position
          transition={{ duration: 1 }}        // Set the duration of the animation
        >
          PERSONAL JOURNAL.
        </motion.h1>      </AnimatePresence>
        
            <Link to="/authentication">
              <button className="absolute top-0 right-2 bg-black rounded-sm text-white text-sm p-1 mt-2 poppins-regular flex items-center justify-center" >signin</button>
            </Link>
        
    </div>
  );
}

