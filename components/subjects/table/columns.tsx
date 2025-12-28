"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Subject } from "@/lib/types"
import { ColumnDef } from "@tanstack/react-table"
import { ArchiveIcon, CalendarPlusIcon, ClockIcon, Edit, ListFilterIcon, MailCheckIcon, MoreHorizontalIcon, TagIcon, Trash2Icon } from "lucide-react"
import { SubjectDialog } from "../SubjectDialog"
import { useState } from "react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { deleteSubjectById } from "@/actions/subjectAction"


export const columns: ColumnDef<Subject>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
     {
        accessorKey: "progress",
        header: "Progress",
        cell: ({ row }) => {
            return <div className="flex items-center gap-x-2"><Progress value={33}/><p>33%</p></div>
        }
    },
    {
        accessorKey: "options",
        header: "",
        cell: ({ row }) => {
            const [isDialogOpen, setIsDialogOpen] = useState(false)

            async function deleteSubject(subjectId:string) {
                await deleteSubjectById(subjectId)
            }

            return <><div className="w-full flex justify-end gap-x-4">
                <Button>
                    <Link href={`/subjects/${row.original.id}/learn`}>Lernen</Link>
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" aria-label="More Options">
                            <MoreHorizontalIcon />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-52">
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <MailCheckIcon />
                                Mark as Read
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <ArchiveIcon />
                                Archive
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <ClockIcon />
                                Snooze
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <CalendarPlusIcon />
                                Add to Calendar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <ListFilterIcon />
                                Add to List
                            </DropdownMenuItem>

                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem onSelect={() => setIsDialogOpen(true)}>
                                <Edit />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem variant="destructive" onSelect={() => deleteSubject(row.original.id)}>
                                <Trash2Icon />
                                Trash
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div><SubjectDialog open={isDialogOpen}
                onOpenChange={setIsDialogOpen} subject={row.original}
                /></>
        },
    }
]