"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "@remix-run/react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "~/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import axiosInstance from "~/lib/axiosInstance"
import { toast } from "sonner"

const formSchema = z.object({
    email: z.string()
      .min(2, {
        message: "Email must be at least 2 characters.",
      })
      .email({
        message: "Invalid email format.",
      }),
  
    password: z.string()
      .min(6, {
        message: "Password must be at least 6 characters.",
      })
      .regex(/[a-zA-Z]/, {
        message: "Password must contain at least one letter.",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one number.",
      })
  });

export function ProfileForm(
    {
        isLogin
    }
    :
    {
        isLogin:boolean
    }
) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })
    const navigate=useNavigate()

    async function onSubmit(values: z.infer<typeof formSchema>) {
            try{
                const url=isLogin ? '/auth/verify' : 'auth/create'
                const response=(
                    await axiosInstance.post(url,
                        {
                            email:values.email,
                            password:values.password
                        }
                    )
                )
                console.log(response.status)
                if(response.status===200){
                    if(isLogin){
                        toast.success("User signed  in Successfully")
                    }else{
                        toast.success("User Created Successfully")
                    }
                    window.localStorage.setItem("token",response.data.token)
                    document.cookie = `token=${response.data.token}; path=/; max-age=3600; secure; samesite=strict`;

                    setTimeout(()=>{
                        navigate('/journal')
                    },500)
                }
            }catch(error){
                console.log(error)
                if(isLogin){
                    toast.error("User verification failed")
                }else{
                    toast.error("User Already Exists")
                }

            }
        }
    // }
    return (
        <Form  {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="enter your email" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="enter your password" {...field} />
                            </FormControl>
                            <FormDescription>
                                Enter Your Password.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">
                    {
                        isLogin ? "Login" : "Create Account"
                    }
                </Button>
                {isLogin &&
                <Link to="/signup">
                    <Button className="ml-6" type="submit" variant="outline">Signup</Button>
                </Link>

                }
            </form>
        </Form>
    )
}
