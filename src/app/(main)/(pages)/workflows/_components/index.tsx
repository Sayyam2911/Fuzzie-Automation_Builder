import Workflow from "@/app/(main)/(pages)/workflows/_components/workflow";

type Props = {

}

const Workflows = (props : Props) => {
    return <div className={"relative flex flex-col gap-2"}>
        <section className={'flex flex-col gap-4 px-4'}>
            <Workflow name={"Automation Workflow"} description={"Testing Workflow"} id={"hfrufhueri9r480"} published={true}/>
        </section>
    </div>
}

export default Workflows