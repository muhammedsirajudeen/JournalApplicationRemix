import { json, LoaderFunction, redirect } from "@remix-run/node";
import { AnimatePresence, motion } from "motion/react"
import { useStore } from "~/lib/GlobalProvider";
import cookie from "cookie"
import axiosInstance from "~/lib/axiosInstance";
import JournalDialog, { color } from "~/components/journalDialog";
import { Fragment, useEffect, useRef, useState } from "react";
import { useLoaderData } from "@remix-run/react";
import JournalCard from "~/components/JournalCard";
export const loader: LoaderFunction = async ({ request }) => {
    console.log('action')
    try {
        const cookies = cookie.parse(request.headers.get("cookie") || "")
        const token = cookies.token || null
        if (token) {
            const response = (await axiosInstance.post('/auth/tokenVerify', {
                token: token
            }))
            if (response.status === 200) {
                const response = (await axiosInstance.post('/journal/get',
                    {
                        token: token
                    }
                ))
                console.log(response.data)
                return json({ journals: response.data.journals })
            }
        } else {
            return redirect('/')
        }
    } catch (error) {
        console.log(error)
        return redirect('/')
    }
}


export interface JournalEntry {
    id: string
    journal: string
    date: string
    email: string
    color: color
}
interface JournalLoader {
    journals: JournalEntry[]
}
export default function Journal() {
    const { setAuth, journals, setJournals } = useStore()
    const renderCount = useRef<number>(0)
    const JournalData = useLoaderData() as JournalLoader
    const [open,setOpen]=useState<boolean>(false)
    useEffect(() => {
        if (renderCount.current === 0) {
            if (JournalData) {
                setJournals(JournalData.journals)
            }
        }
        renderCount.current++
        setAuth(true)
    }, [JournalData, setAuth, setJournals])
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
            <JournalDialog open={open} setOpen={setOpen} />
            <AnimatePresence>
                <div className="flex w-full items-center justify-evenly flex-wrap">
                    {journals.map((journal) => (
                        <Fragment key={journal.id}>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >

                                <JournalCard setOpen={setOpen} journalEntry={journal} />
                            </motion.div>
                        </Fragment>
                    ))}
                </div>
            </AnimatePresence>
        </div>
    )
}