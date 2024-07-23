
export class UnableToSaveUserError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "UnableToSaveUserError";
    }
}

export class invalidEmailorPasswordError extends Error{
    constructor(message:string){
        super(message)
        this.name = "invalidEmailorPasswordError"
    }
}

export class UserDoesNotExist extends Error {
    constructor(message: string) {
        super(message);
    }
}

export default {}