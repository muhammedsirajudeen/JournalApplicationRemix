import { Home, Book, Settings, LogOut } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "../components/ui/sidebar"
import { useStore } from "~/lib/GlobalProvider"
import { clearAllCookies } from "~/lib/utils"
import { useNavigate } from "@remix-run/react"
import { toast } from "sonner"

// Menu items.
const items = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "Settings",
        url: "/settings",
        icon: Settings,
    },
    {
        title: "Journal",
        url: "/journal",
        icon: Book,
    },
    {
        title:"Logout",
        url:"#",
        icon:LogOut
    }
]

export function AppSidebar() {
    const {authenticated}=useStore()
    const navigate=useNavigate()
    const logoutHandler=()=>{
        clearAllCookies()
        toast.success('Logged out successfully')
        setTimeout(()=>navigate('/'),1000)
    }
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Personal Journal</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => 
                            {
                                
                                return(
                                    <SidebarMenuItem key={item.title} className={`${(item.title==="Logout" && !authenticated) && "hidden"}`} >
                                    <SidebarMenuButton asChild>
                                        {
                                            item.title==="Logout" ?
                                            <button onClick={logoutHandler} >
                                                <item.icon/>
                                                <span>{item.title}</span>
                                            </button>
                                            :
                                            <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                        }

                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                                )
                            }
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
