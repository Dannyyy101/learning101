'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Subject } from "@/lib/types"
import { Field, FieldError, FieldGroup, FieldLabel, FieldSeparator } from "../ui/field"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { Card } from "../ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Code, ListChecks, Plus, Type, X } from "lucide-react"
import { ExerciseType } from "@/prisma/generated/prisma/enums"
import { createSubjectSchema } from "@/lib/zod/subjectSchema"
import { createNewSubject, updateSubjectById } from "@/actions/subjectAction"
import { ScrollArea } from "../ui/scroll-area"


export function SubjectDialog({ open: controlledOpen,
    onOpenChange: setControlledOpen, subject }: { open?: boolean, onOpenChange?: (b: boolean) => void, subject?: Subject, }) {

    const isCreate = !subject

    const [internalOpen, setInternalOpen] = useState(false)

    const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen
    const onOpenChange = setControlledOpen !== undefined ? setControlledOpen : setInternalOpen

    const form = useForm<z.infer<typeof createSubjectSchema>>({
        resolver: zodResolver(createSubjectSchema),
        defaultValues: {
            name: "",
            exercises: []
        },
    })

    console.log("Form Errors:", form.formState.errors);

    useEffect(() => {
        if (isOpen) {
            if (subject) {
                form.reset({ name: subject.name, exercises: subject.exercises || [] })
            } else {
                form.reset({ name: "", exercises: [] })
            }
        }
    }, [subject, isOpen, form])

    const { fields, prepend, remove } = useFieldArray({
        control: form.control,
        name: "exercises",
    })



    const addQuestion = (type: ExerciseType) => {
        if (type === ExerciseType.TEXT_INPUT) {
            prepend({ question: "", answer: "", type })
        } else if (type === ExerciseType.MULTIPLE_CHOICE) {
            prepend({ question: "", answer: { options: [], solution: "" }, type })
        }

    }

    async function onSubmit(data: z.infer<typeof createSubjectSchema>) {
        if (isCreate) {
            await createNewSubject(data)
        } else {
            await updateSubjectById(subject.id, data)
        }

        onOpenChange(false);
        form.reset();
    }


    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>

            <DialogTrigger asChild className={`${!isCreate && "hidden"}`}>
                <Button variant="outline">{isCreate ? "Create" : "Edit"} Subject</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] sm:h-[600px]">
                <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>{isCreate ? "Create" : "Edit"} Subject</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <FieldGroup>
                                <Controller
                                    name="name"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                                            <Input
                                                {...field}
                                                id={field.name}
                                                aria-invalid={fieldState.invalid}
                                                autoComplete="off"
                                            />
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />
                            </FieldGroup>
                            <FieldSeparator />
                            {/* Scrollable area for exercises */}
                            <ScrollArea className="h-80 overflow-y-auto" >
                                <FieldGroup>
                                    {fields.map((field, index) => (
                                        <Card className="p-2" key={`exercise-card-${index}`}>
                                            <Button
                                                className="hover:bg-transparent ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-0 right-0 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => remove(index)}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                            <div className="flex gap-x-2" key={field.id}>
                                                <Controller
                                                    name={`exercises.${index}.question`}
                                                    control={form.control}
                                                    render={({ field, fieldState }) => (
                                                        <Field data-invalid={fieldState.invalid}>
                                                            <FieldLabel htmlFor={field.name}>Question</FieldLabel>
                                                            <Input
                                                                {...field}
                                                                id={field.name}
                                                                aria-invalid={fieldState.invalid}
                                                                autoComplete="off"
                                                            />
                                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                                        </Field>
                                                    )}
                                                />

                                                <Controller
                                                    name={`exercises.${index}.answer`}
                                                    control={form.control}
                                                    render={({ field, fieldState }) => (
                                                        <Field data-invalid={fieldState.invalid}>
                                                            <FieldLabel htmlFor={field.name}>Answer</FieldLabel>
                                                            <Input
                                                                {...field}
                                                                id={field.name}
                                                                aria-invalid={fieldState.invalid}
                                                                autoComplete="off"
                                                            />
                                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                                        </Field>
                                                    )}
                                                />

                                            </div>
                                        </Card>
                                    ))}
                                </FieldGroup>
                            </ScrollArea>
                            <div className="flex justify-center pt-4 border-t border-dashed">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="gap-2 border-dashed border-2 hover:border-solid">
                                            <Plus className="h-4 w-4" />
                                            Frage hinzufügen
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="center" className="w-56">
                                        <DropdownMenuLabel>Wähle einen Typ</DropdownMenuLabel>
                                        <DropdownMenuSeparator />

                                        <DropdownMenuItem onClick={() => addQuestion("TEXT_INPUT")}>
                                            <Type className="mr-2 h-4 w-4 text-blue-500" />
                                            <span>Textaufgabe</span>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem onClick={() => addQuestion("MULTIPLE_CHOICE")}>
                                            <ListChecks className="mr-2 h-4 w-4 text-green-500" />
                                            <span>Multiple Choice</span>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem onClick={() => addQuestion("CODING")}>
                                            <Code className="mr-2 h-4 w-4 text-orange-500" />
                                            <span>Coding Challenge</span>
                                        </DropdownMenuItem>

                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button className="hover:cursor-pointer" type="submit" form="form-rhf-demo">Create</Button>
                    </DialogFooter>
                </form>
            </DialogContent>

        </Dialog>
    )
}
