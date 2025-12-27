
import { getAllSubjects } from "../../app/action";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function SubjectTable(){
   const subjects = await getAllSubjects()
    return <DataTable columns={columns} data={subjects} />
}