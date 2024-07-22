'use client';
import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import EditUserProfileSchema from "@/lib/types";
import {z} from "zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";

const ProfileForm = () => {
    const [isLoading,setIsLoading] = useState(false)
    const form = useForm<z.infer<typeof EditUserProfileSchema>>({
        mode : 'onChange',
        resolver : zodResolver(EditUserProfileSchema),
        defaultValues : {
            name : '',
            email : '',
        },
    })
    return <Form {...form}>
        <form className={"flex flex-col px-5"} onSubmit={() => {
        }}>
            <FormField disabled={isLoading} control={form.control} name={"name"}
                       render={({field}) => (
                           <FormItem>
                               <FormLabel className={"text-md"}>
                                   UserName
                               </FormLabel>
                               <FormControl>
                                   <Input placeholder={"Name"} {...field} className={"w-[50%]"}/>
                               </FormControl>
                               <FormMessage/>
                           </FormItem>
                       )}
            />
        </form>
        <form className={"flex flex-col px-5"} onSubmit={() => {
        }}>
            <FormField disabled={isLoading} control={form.control} name={"email"}
                       render={({field}) => (
                           <FormItem>
                               <FormLabel className={"text-md"}>
                                   Email
                               </FormLabel>
                               <FormControl>
                                   <Input placeholder={"Email"} type={"email"} className={"w-[50%]"}
                                          {...field}/>
                               </FormControl>
                               <FormMessage/>
                           </FormItem>
                       )}
            />
        </form>
        <Button type={"submit"}
            className={"self-start hover:bg-black hover:text-white mx-5 my-0."}
        >
            {isLoading ? (<><Loader2 className={"mr-2 h-4 w-4 animate-spin"}/>Saving</>) :
                ("Save User Settings")}
        </Button>
    </Form>
}

export default ProfileForm