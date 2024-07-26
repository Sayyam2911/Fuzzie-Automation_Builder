import React from "react";
import {CONNECTIONS} from "@/lib/constant";
import ConnectionCard from "@/app/(main)/(pages)/connections/_components/connection-card";

type ConnectionsProps = {
    searchParams ?: {[key : string] : string | undefined}
}

const Connections = (props : ConnectionsProps) => {
    return <div className="flex flex-col gap-4 relative">
        <h1 className="text-2xl sticky top-0 z-[10] p-3.5 bg-background/50 backdrop-blur-lg flex items-center border-b">
            Connections
        </h1>
        <div className={"relative flex flex-col gap-6"}>
            <section className={"flex gap-5 py-3 px-4 text-muted-foreground flex-wrap"}>
                Connect all your apps directly from here. You may need to connect
                these apps regularly to refresh verification
                {CONNECTIONS.map((connection, index) => {
                    return <ConnectionCard title={connection.title}
                                           icon={connection.image}
                                           description={connection.description}
                                           key={connection.title}
                                           type={connection.title}
                                           connected={{}}
                    />
                })}
            </section>
        </div>
    </div>
}

export default Connections