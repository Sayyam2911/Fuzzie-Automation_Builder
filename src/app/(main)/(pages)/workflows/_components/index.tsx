import Workflow from './workflow'
import {onGetWorkflow} from "@/app/(main)/(pages)/workflows/_actions/workflow-connections";

const Workflows = async () => {
    const workflows = await onGetWorkflow()
    return <div className={"relative flex flex-col gap-2"}>
        <section className={'flex flex-col gap-4 px-4'}>
            {workflows?.length ?
                workflows.map((flow) => (
                    <Workflow key={flow.id} {...flow}/>
                )) : <div className={'mt-36 flex items-center justify-center text-muted-foreground text-xl'}>
                    No Workflows
                </div>
            }
        </section>
    </div>
}

export default Workflows