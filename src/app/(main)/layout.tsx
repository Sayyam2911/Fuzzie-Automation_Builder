import React from 'react';

type Props = {
    children: React.ReactNode;
}
const Layout = ({children}: Props) =>{
    return(
        <div className={"flex overflow-hidden h-screen"}>
            <div className={"w-full"}>
                {children}
            </div>
        </div>
    )
}

export default Layout;