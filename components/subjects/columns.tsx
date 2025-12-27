"use client"

import { Subject } from "@/generated/prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "../ui/button"
import { Pencil } from "lucide-react"
import Link from "next/link"


export const columns: ColumnDef<Subject>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
 {
  id: "actions",
  header: () => <div className="w-full flex justify-end"></div>,
  cell: ({ row }) => {
    const subject = row.original
    return (
      <div className="flex justify-end">
         <Button asChild size="sm">
            <Link href={`/subjects/${subject.id}`}>
              Learn
            </Link>
          </Button>
      </div>
    )
  },
},
]