'use client'
import { Controller, useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSubjectSchema } from "@/lib/zod/schema/subject.schema";
import { createNewSubject } from "../../app/action";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Field, FieldContent, FieldDescription, FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "../ui/input-group";
import { XIcon } from "lucide-react";

export function DialogDemo() {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof createSubjectSchema>>({
    resolver: zodResolver(createSubjectSchema),
    defaultValues: {
      name: "",
      exercises: [{question: "", answer: ""}]
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "exercises",
  })

  async function onSubmit(data: z.infer<typeof createSubjectSchema>) {
    await createNewSubject(data)

    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create Subject</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Subject</DialogTitle>
          <DialogDescription>
            Create a new Subject
          </DialogDescription>
        </DialogHeader>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Subject name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
              <FieldSeparator className="my-4"/>
          <FieldSet className="gap-4">
            <FieldLegend variant="label">Exercises</FieldLegend>
            <FieldGroup className="gap-4">
              {fields.map((field, index) => (
                <div className="flex gap-2" key={index}>
                <Controller
                  key={"field.question" + field.id}
                  name={`exercises.${index}.question`}
                  control={form.control}
                  render={({ field: controllerField, fieldState }) => (
                    <Field
                      orientation="horizontal"
                      data-invalid={fieldState.invalid}
                    >
                      <FieldContent>
                        <InputGroup>
                          <InputGroupInput
                            {...controllerField}
                            id={`form-rhf-array-email-${index}`}
                            aria-invalid={fieldState.invalid}
                            type="text"
                          />
                          {fields.length > 0 && (
                            <InputGroupAddon align="inline-end">
                              <InputGroupButton
                                type="button"
                                variant="ghost"
                                size="icon-xs"
                                onClick={() => remove(index)}
                                aria-label={`Remove email ${index + 1}`}
                              >
                                <XIcon />
                              </InputGroupButton>
                            </InputGroupAddon>
                          )}
                        </InputGroup>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </FieldContent>
                    </Field>
                  )}
                />
                <Controller
                  key={"field.answer" + field.id}
                  name={`exercises.${index}.answer`}
                  control={form.control}
                  render={({ field: controllerField, fieldState }) => (
                    <Field
                      orientation="horizontal"
                      data-invalid={fieldState.invalid}
                    >
                      <FieldContent>
                        <InputGroup>
                          <InputGroupInput
                            {...controllerField}
                            id={`form-rhf-array-email-${index}`}
                            aria-invalid={fieldState.invalid}
                            type="text"
                          />
                          {fields.length > 0 && (
                            <InputGroupAddon align="inline-end">
                              <InputGroupButton
                                type="button"
                                variant="ghost"
                                size="icon-xs"
                                onClick={() => remove(index)}
                                aria-label={`Remove email ${index + 1}`}
                              >
                                <XIcon />
                              </InputGroupButton>
                            </InputGroupAddon>
                          )}
                        </InputGroup>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </FieldContent>
                    </Field>
                  )}
                />
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ question: "", answer: "" })}
                disabled={fields.length >= 5}
              >
                Add Exercises
              </Button>
            </FieldGroup>
            {form.formState.errors.exercises?.root && (
              <FieldError errors={[form.formState.errors.exercises.root]} />
            )}
          </FieldSet>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="hover:cursor-pointer" variant="outline">Cancel</Button>
          </DialogClose>
          <Button className="hover:cursor-pointer" type="submit" form="form-rhf-demo">Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
