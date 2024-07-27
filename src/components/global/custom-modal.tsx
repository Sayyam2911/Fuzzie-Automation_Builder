import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import React from "react";
import {useModal} from "@/providers/modal-provider";
import {Button} from "@/components/ui/button";


type CustomModalProps = {
    title : string,
    subheading : string,
    children : React.ReactNode
    defaultOpen ?: boolean
}

const CustomModal = ({title,subheading,children,defaultOpen} : CustomModalProps) => {
    const {isOpen,setClose} = useModal()
    const handleClose = () => setClose()
    return <Drawer open={isOpen} onClose={handleClose}>
        <DrawerContent>
            <DrawerHeader>
                <DrawerTitle className={'text-center'}>
                    {title}
                </DrawerTitle>
                <DrawerDescription className={'text-center flex flex-col items-center gap-4 h-72 overflow-scroll'}>
                    {subheading}
                    {children}
                </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter className={'flex flex-col gap-4 bg-background border-t-[1px] border-t-muted'}>
                <DrawerClose>
                    <Button variant={'ghost'} className={'w-full'} onClick={handleClose}>Close</Button>
                </DrawerClose>
            </DrawerFooter>
        </DrawerContent>
    </Drawer>
}

export default CustomModal