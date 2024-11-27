import  { JournalEntry } from "~/routes/journal";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "~/components/ui/card"
import { motion} from "motion/react"
//   const coloredDivs=["bg-white","bg-gray-500","bg-blue-400","bg-yellow-300"] as const
import { Trash } from "lucide-react";
import { toast } from "sonner";
import axiosInstance from "~/lib/axiosInstance";
import { useStore } from "~/lib/GlobalProvider";
import { Dispatch, SetStateAction } from "react";
export default function JournalCard({journalEntry,setOpen}:{journalEntry:JournalEntry,setOpen:Dispatch<SetStateAction<boolean>>}){
    const {setJournals,setUpdateJournal,setUpdate}=useStore()
    const deleteHandler=async (id:string)=>{
        try{
            const response=(await axiosInstance.delete(`/journal/delete/${id}`))
            if(response.status===200){
                toast.success("Deleted successfully")
                setJournals((prev)=>{
                    return prev.filter(d=>d.id!==id)
                })
            }
        }catch(error){
            console.log(error)
            toast.error("Please try again")
        }
    }
    return(
        <motion.div
        key={journalEntry.id}
        initial={{ opacity: 0 }} // Start with an invisible card
        animate={{ opacity: 1 }} // Fade the card to full visibility
        exit={{ opacity: 0 }} // Fade out the card when it's removed
        transition={{ duration: 1 }} // Duration of the fade-in effect
        onClick={()=>{
            setOpen(true)
            setUpdateJournal({journal:journalEntry.journal,color:journalEntry.color,id:journalEntry.id})
            setUpdate(true)
        }}
      >        
        <Card className={`m-5 lg:min-w-72 lg:max-w-72  sm:min-w-36 ${journalEntry.color} ${(journalEntry.color==="bg-blue-400"|| journalEntry.color==="bg-gray-500")&&"text-white"} `} >
        <CardHeader>
            <CardTitle>{journalEntry.email}</CardTitle>
            <CardDescription className={`${(journalEntry.color==="bg-blue-400"|| journalEntry.color==="bg-gray-500")&&"text-white"}`} >{journalEntry.date}</CardDescription>
        </CardHeader>
        <CardContent>
        <div className="w-full h-auto break-words overflow-hidden">{journalEntry.journal}</div>
        </CardContent>
        <CardFooter>
            <Trash onClick={(e)=>{
                e.preventDefault()
                e.stopPropagation()
                deleteHandler(journalEntry.id)}} className="h-3 w-3" />
            {/* <p>Gen</p> */}
        </CardFooter>
        </Card>
        </motion.div>

    )
}