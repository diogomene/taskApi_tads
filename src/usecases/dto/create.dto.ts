
export type CreateTaskInputDto = {
    name: string,
    description: string,
    dueDate?: Date
}

export type CreateTaskOutputDto = {
    uid: string
}