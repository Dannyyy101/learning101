import { getAllSubjects } from "@/actions/subjectAction";
import { Subject } from "@/lib/types";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export async function SubjectTable() {
    const subjects = await getAllSubjects();
    return (
        <div className="w-10/12 py-4">
            <DataTable columns={columns} data={subjects} />
        </div>
    )
}