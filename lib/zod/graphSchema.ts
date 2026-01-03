import * as z from "zod"

export const NodeTypeSchema = z.enum(["PARENT", "CHILD"]);

export const EdgeSchema = z.object({
  data: z.object({
    source: z.string(),
    target: z.string(),
  }),
});

export type GraphNode = {
  data: {
    id: string;
    label: string;
    type: z.infer<typeof NodeTypeSchema>;
    color: string;
    href? :string;
    children?: (GraphNode | z.infer<typeof EdgeSchema>)[];
  };
};

export const NodeSchema: z.ZodType<GraphNode> = z.object({
  data: z.object({
    id: z.string(),
    label: z.string(),
    type: NodeTypeSchema,
    color: z.string(),
    href: z.string().optional(),
    children: z.lazy(() => z.array(z.union([NodeSchema, EdgeSchema])).optional()),
  }),
});