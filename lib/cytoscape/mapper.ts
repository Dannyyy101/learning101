import { GraphEdge, GraphElement, NodeType, SubjectDTO, SubjectRelationDTO } from "../types";
import { GraphNode } from "../zod/graphSchema";

interface Node {
    data: {
        id: string,
        label: string,
        type: NodeType,
        color: string,
        children?: NodeWithChildren[] // allow children property
    }
}

interface Edge {
    data: { source: string, target: string }
}

interface NodeWithChildren extends Node {
    children: Node[]
}

const generateEdges = (relations: SubjectRelationDTO[]): GraphEdge[] => {
    return relations.map((r) => ({
        data: { source: r.sourceId, target: r.targetId },
    }));
};

export const mapToNode = (subject: SubjectDTO): GraphElement[] => {
    const childElements = subject.children.flatMap((c) => mapToNode(c as any));

    const node: GraphNode = {
        data: {
            id: subject.id,
            label: subject.name,
            type: subject.parentId === null ? "PARENT" : "CHILD",
            color: subject.color,
            children: childElements,
            href: subject.parentId === null ? undefined : subject.id
        },
    };

    const edges = generateEdges(subject.relations);

    return [node, ...edges];
};