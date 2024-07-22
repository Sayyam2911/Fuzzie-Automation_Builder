'use client';
import {usePathname} from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {Separator} from "@/components/ui/separator";
import {menuOptions} from "@/lib/constant";
import {clsx} from "clsx";
import {Database, GitBranch, LucideMousePointerClick, UploadIcon} from "lucide-react";

type Props = {

}

const MenuOptions = (props : Props) => {
    const pathName = usePathname()
    return (
        <nav className={"dark:bg-black h-screen overflow-scroll  justify-between flex items-center flex-col  gap-10 py-6 px-2"}>
            <div className={"flex items-center justify-center flex-col gap-6"}>
                <Link className={"flex font-bold flex-row"} href={"/"}>
                    Fu
                    <Image
                        src={"/fuzzieLogo.png"}
                        width={15}
                        height={15}
                        alt={"Fuzzie Logo"}
                        className={"shadow-sm"}
                    />
                    zie
                </Link>
                <TooltipProvider>
                    {menuOptions.map((menuItem) => (
                        <ul key={menuItem.name}>
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger>
                                    <li>
                                        <Link href={menuItem.href} className={clsx(
                                            'group h-5 w-5 flex items-center justify-center  scale-[1.5] rounded-lg p-[0.5px] cursor-pointer',
                                            {
                                                'dark:bg-[#2F006B] bg-[#EEE0FF] ':
                                                    pathName === menuItem.href,
                                            }
                                        )}>
                                            <menuItem.Component
                                                selected={pathName === menuItem.href}
                                            />
                                        </Link>
                                    </li>
                                </TooltipTrigger>
                                <TooltipContent className={"bg-black/10 backdrop-blur-xl ml-2"} side={"right"}>
                                    <p>{menuItem.name}</p>
                                </TooltipContent>
                            </Tooltip>
                        </ul>
                    ))}
                </TooltipProvider>
                <Separator/>
                <div
                    className={"flex items-center flex-col gap-9 dark:bg-[#353346]/30 py-4 px-2 rounded-full h-56 overflow-scroll border-[1px]"}>
                    <div
                        className={"relative dark:bg-[#353346]/70 p-1 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-[#353346]"}>
                        <LucideMousePointerClick
                            className="dark:text-white"
                            size={18}
                        />
                        <div
                            className={"border-l-2 border-muted-foreground/50 h-6 absolute left-1/2 transform translate-x-[-50%] -bottom-[30px]"}/>
                    </div>
                    <div
                        className={"relative dark:bg-[#353346]/70 p-1 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-[#353346]"}>
                        <GitBranch
                            className="dark:text-white"
                            size={18}
                        />
                        <div
                            className={"border-l-2 border-muted-foreground/50 h-6 absolute left-1/2 transform translate-x-[-50%] -bottom-[30px]"}/>
                    </div>
                    <div
                        className={"relative dark:bg-[#353346]/70 p-1 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-[#353346]"}>
                        <Database
                            className="dark:text-white"
                            size={18}
                        />
                        <div
                            className={"border-l-2 border-muted-foreground/50 h-6 absolute left-1/2 transform translate-x-[-50%] -bottom-[30px]"}/>
                    </div>
                    <div
                        className={"relative dark:bg-[#353346]/70 p-1 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-[#353346]"}>
                        <UploadIcon
                            className="dark:text-white"
                            size={18}
                        />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default MenuOptions