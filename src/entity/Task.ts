export class Task{
    constructor(
        private uid: string,
        private name: string,
        private description: string,
        private creationDate: Date,
        private dueDate?: Date){
    }
    public static create(name: string, description: string, dueDate?: Date){
        return new Task(
            crypto.randomUUID().toString(),
            name,
            description,
            new Date(),
            dueDate
        );
    }
    public getUid(): string {
        return this.uid;
    }

    public getName(): string {
        return this.name;
    }

    public getDescription(): string {
        return this.description;
    }

    public getCreationDate(): Date {
        return this.creationDate;
    }

    public getDueDate(): Date | undefined {
        return this.dueDate;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public setDueDate(dueDate: Date | undefined): void {
        this.dueDate = dueDate;
    }
}