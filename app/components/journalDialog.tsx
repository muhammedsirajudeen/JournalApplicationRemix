import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog"
import { Button } from "./ui/button"
import { Book } from "lucide-react"
import { motion } from "motion/react"
import { Form } from "@remix-run/react"
import { FormEvent, useEffect, useState } from "react"
import { toast } from "sonner"
import axiosInstance from "~/lib/axiosInstance"

const coloredDivs=["bg-white","bg-gray-500","bg-blue-400","bg-yellow-300"] as const

type color=typeof coloredDivs[number]


export default function JournalDialog() {
    const [color,setColor]=useState<color>("bg-white")
    const incrementer=0.2
    const formHandler=async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        
        const formData=new FormData(e.target as HTMLFormElement)
        const journal=formData.get('journal') as string
        if(journal.length<10 || journal.trim()===''){
            toast.error("Please enter something")
            return
        }
        try{
            const response=(
                await axiosInstance.post('/journal/create'
                    ,
                    {
                        journal:journal,
                        color:color,
                    }
                )
            )
            if(response.status===200){
                toast.success('journal added successfully')
            }
        }catch(error){
            toast.error('Error adding journal')
        }

    }
    const [mounted,setMounted]=useState(false)
    useEffect(()=>{
        setMounted(true)
    },[])
    const colorHandler=(color:color)=>{
        setColor(color)
    }
    if(!mounted) return <></>
    return (
        <Dialog>
            <DialogTrigger>
                {/* <Button variant="outline" className="mt-10 flex items-center justify-center" > */}
                <div className=" flex items-center justify-evenly w-16 border border-gray-200 rounded-lg poppins-regular p-1 mt-6">
                    <p className="text-xs" >Create</p>
                    <Book className="text-xs w-4" />
                </div>
                {/* </Button> */}
            </DialogTrigger>
            <DialogContent >
                <DialogHeader>
                    <DialogTitle>JOURNAL</DialogTitle>
                    <DialogDescription className="text-xs" >
                            Journals are synced across server..
                    </DialogDescription>
                </DialogHeader>
                <div className="h-96 w-full flex items-center justify-center " >
                    <Form onSubmit={formHandler} className="flex flex-col items-center justify-center min-w-full" >
                        <div className="flex" >
                            <textarea id="journal" name="journal" className="bg-white w-80 h-80 mt-10 border border-gray-300 rounded-xl transition-all duration-1 " />
                        </div>
                        <Button type="submit" className="mt-12" >Submit</Button>
                    </Form>
                </div>
                <div className="flex space-x-2">
                    {
                        coloredDivs.map((coloredDiv,index)=>{
                            return(
                                <motion.button
                                onClick={()=>colorHandler(coloredDiv)}
                                key={index}
                                className={`h-6 w-6 ${coloredDiv}    border-2 border-gray-200 ${coloredDiv===color&&"border-black "} rounded-full`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: incrementer+0.1 }} 
                            ></motion.button>
                            )
                        })
                    }
      
                </div>
            </DialogContent>
        </Dialog>
    )
}