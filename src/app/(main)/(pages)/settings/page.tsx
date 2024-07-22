import React from 'react'
import ProfileForm from "@/components/forms/profile-form";

const Settings = () => {
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
            <ProfileForm />
        </div>
    )
}

export default Settings