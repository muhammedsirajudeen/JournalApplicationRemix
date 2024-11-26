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
        message: "Invalid email format.", // Ensures a valid email format
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
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })
    const navigate=useNavigate()

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        if(!isLogin){
            try{
                const response=(
                    await axiosInstance.post('/auth/create',
                        {
                            email:values.email,
                            password:values.password
                        }
                    )
                )
                console.log(response.status)
                if(response.status===200){
                    toast.success("User Created Successfully")
                    setTimeout(()=>{
                        navigate('/journal')
                    },500)
                }
            }catch(error){
                console.log(error)
                toast.error("User Already Exists")

            }
        }
    }
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
