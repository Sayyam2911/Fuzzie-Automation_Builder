'use client';

import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {useModal} from "@/providers/modal-provider";
import CustomModal from "@/components/global/custom-modal";
import WorkflowForm from "@/components/forms/workflow-form";

type WorkflowButtonProps = {

}

const WorkflowButton = (props : WorkflowButtonProps) => {
    const {setOpen,setClose} = useModal()
    const handleClick = () => {
        setOpen(
            <CustomModal
                title={'Create A Workflow Automation'}
                subheading={'Workflows are a powerful way to automate your tasks'}
            >
                <WorkflowForm />
            </CustomModal>
        )
    }

    return <Button size={'icon'} onClick={handleClick}>
        <Plus />
    </Button>
}

export default WorkflowButton