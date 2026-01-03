import { SubjectDTO } from "@/lib/types";

export const DEFAULT_CHILD_SUBJECT: SubjectDTO = {
    id: "c1",
    name: "Wahrscheinlichkeitstheorie",
    color: "#27B000",
    parentId: "1",
    authorId: "",
    relations: [{
        id: "r1", targetId: "1", sourceId: "c1", createdAt: new Date(),
        updatedAt: new Date(),
    }],
    children: [],
    createdAt: new Date(),
    updatedAt: new Date(),
}


export const DEFAULT_SUBJECT: SubjectDTO = {
    id: "1",
    name: "Mathe",
    color: "#27B0F5",
    parentId: null,
    authorId: "",
    children: [DEFAULT_CHILD_SUBJECT],
    relations: [{
        id: "r2", targetId: "1", sourceId: "center", createdAt: new Date(),
        updatedAt: new Date(),
    }],
    createdAt: new Date(),
    updatedAt: new Date(),
}

