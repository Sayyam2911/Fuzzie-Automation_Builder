'use client';
import React, {useContext, useEffect} from "react";
import exp from "node:constants";

interface ModalProviderProps {
    children: React.ReactNode;
}

export type ModalData = {

}

export type ModalContextType = {
    data: ModalData;
    isOpen : boolean,
    setOpen : (modal : React.ReactNode, fetchData ?: () => Promise<any>) => void,
    setClose : () => void,
}

export const ModalContext = React.createContext<ModalContextType>({
    data : {},
    isOpen : false,
    setOpen : (modal : React.ReactNode, fetchData ?: () => Promise<any>) => {},
    setClose : () => {},
});

const ModalProvider : React.FC<ModalProviderProps> = ({children}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [data, setData] = React.useState<ModalData>({});
    const [showingModal, setShowingModal] = React.useState<React.ReactNode | null>(null);
    const [isMounted, setIsMounted] = React.useState(false);

    useEffect(() => {
        setIsMounted(true)
    },[])

    const setOpen = async(modal : React.ReactNode, fetchData ?: () => Promise<any>) => {
        if(modal){
            if(fetchData){
                setData({...data, ...(await fetchData())} || {})
            }
            setShowingModal(modal);
            setIsOpen(true);
        }
    }

    const setClose = () => {
        setIsOpen(false);
        setData({});
    }

    if(!isMounted) return null;

    return (
        <ModalContext.Provider value={{
            data,
            setClose,
            setOpen,
            isOpen
        }}>
            {children}
            {showingModal}
        </ModalContext.Provider>
    )
}

export const useModal = () =>{
    const context = useContext(ModalContext)
    if(!context){
        throw new Error ('useModal must be used within the modal provider');
    }
    return context;
}

export default ModalProvider