'use server';
import {auth} from "@clerk/nextjs/server";
import {db} from "@/lib/db";

export const getGoogleListener = async () => {
    const {userId} = auth()
    if(userId){
        const listener = await db.user.findUnique({
            where : {
                clerkId : userId
            },
            select : {
                googleResourceId : true
            }
        })
        if(listener) return listener
    }
}