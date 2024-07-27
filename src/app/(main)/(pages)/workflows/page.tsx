import React from "react";
import WorkflowButton from "@/app/(main)/(pages)/workflows/_components/workflow-button";

type props = {

}

const Workflows = (props: props) => {
    return <div className="flex flex-col gap-4 relative">
        <h1 className="text-2xl sticky top-0 z-[10] p-3.5 bg-background/50 backdrop-blur-lg flex items-center border-b justify-between">
            Workflows
            <WorkflowButton />
        </h1>
    </div>
}

export default Workflows