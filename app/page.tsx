import { getAllSubjects } from "@/actions/subjectAction";
import { auth } from "@/auth";
import { SubjectDialog } from "@/components/subjects/SubjectDialog";
import { SubjectTable } from "@/components/subjects/table/SubjectTable";


export default async function Home() {
  return (
    <div className="w-screen min-h-screen flex justify-center items-center ">
      <section className="w-full h-5/6 flex flex-col items-center">
        <div className="w-10/12 flex justify-end">
          <SubjectDialog />
        </div>
        <SubjectTable />
      </section>
    </div>
  );
}
