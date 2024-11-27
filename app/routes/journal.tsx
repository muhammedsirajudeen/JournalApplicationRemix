import { LoaderFunction, redirect } from "@remix-run/node";
import { motion } from "motion/react"
import { useStore } from "~/lib/GlobalProvider";
import cookie from "cookie"
import axiosInstance from "~/lib/axiosInstance";
// import { Button } from "~/components/ui/button";
// import { toast } from "sonner";
import JournalDialog from "~/components/journalDialog";
import { useEffect } from "react";
export const loader: LoaderFunction = async ({ request }) => {
    try {
        const cookies = cookie.parse(request.headers.get("cookie") || "")
        const token = cookies.token || null
        if (token) {
            const response = (await axiosInstance.post('/auth/tokenVerify', {
                token: token
            }))
            if (response.status === 200) {
                return null
            }
        } else {
            return redirect('/')
        }
    } catch (error) {
        console.log(error)
        return redirect('/')
    }
}
//example of server side data mutation
// export function action() {
//     // Simply returning null to verify the action is working
//     console.log('action run')
//     return null; 
// }
export default function Journal() {
    const { setAuth } = useStore()
    useEffect(()=>{
        setAuth(true)
    },[setAuth])
    return (
        <div className="flex items-center justify-center flex-col w-screen">
            <motion.div className="bg-white lg:w-96 flex items-center justify-center lg:h-20 rounded-sm sm:w-48 sm:h-10">
                <motion.h1
                    className="text-secondlargest poppins-regular"
                    initial={{ opacity: 0, x: -100 }}  // Start off-screen to the left
                    animate={{ opacity: 1, x: 0 }}    // End at its normal position with full opacity
                    transition={{ duration: 1 }}      // Duration of the animation
                >
                    JOURNAL.
                </motion.h1>
            </motion.div>
            <JournalDialog />
            {/* <Button onClick={JournalCreator} variant="outline" className="mt-10">Create</Button> */}
        </div>
    )
}