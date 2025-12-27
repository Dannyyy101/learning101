import { DialogDemo } from "@/components/subjects/createSubjectDialog";
import SubjectTable from "@/components/subjects/subjectsTable";


export default function Home() {
  return (
    <div className="w-screen h-screen flex justify-center">
      <section className="w-2/3 mt-32 flex flex-col gap-8">
        <div className="flex w-full justify-end">
          <DialogDemo />
        </div>
        <SubjectTable />
      </section>
    </div>
  );
}
