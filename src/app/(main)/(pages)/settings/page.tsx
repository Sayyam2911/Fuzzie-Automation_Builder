import React from 'react'
import ProfileForm from "@/components/forms/profile-form";
import ProfilePicture from "@/app/(main)/(pages)/settings/_components/profile-picture";
import {db} from "@/lib/db";

const Settings = () => {

    // const removeProfileImage = async() => {
    //     'use server';
    //     const response = await db.user.update({
    //         where : {
    //             clerkId : authUser.id,
    //         },
    //         data : {
    //             profileImage : '',
    //         }
    //     })
    //     return response
    // }

    return (
        <div className="flex flex-col gap-4 relative">
            <h1 className="text-2xl sticky top-0 z-[10] p-4 bg-background/50 backdrop-blur-lg flex items-center border-b">
                Settings
            </h1>
            <div className={"flex flex-col gap-2 p-5"}>
                <div>
                    <h2 className={"text-lg font-bold"}>User Profile</h2>
                    <p className={"text-base text-white/50"}>
                        Add or Update Your Information
                    </p>
                </div>
            </div>
            {/*<ProfilePicture*/}
            {/*    onDelete = {removeProfileImage}*/}
            {/*    // userImage = {user?.profileImage || ''}*/}
            {/*    // onUpload = {uploadProfileImage}*/}
            {/*/>*/}
            <ProfileForm />
        </div>
    )
}

export default Settings