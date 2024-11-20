export type GetTaskOutputDto = {
    uid: string,
    name: string,
    description: string,
    dueDate?: Date
}

export type GetTaskInputDto = {uid:string}