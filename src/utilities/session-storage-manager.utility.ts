
class SessionStorageManager {
    public storage;
    constructor() {
        this.storage = sessionStorage;
    }

    public isInStorage(sessionKey: string): boolean {
        const keyExists: boolean = this.storage.getItem(sessionKey) ? true : false;
        return keyExists;
    }
    public async retrieveData(sessionKey: string): Promise<any> {

        const stringifiedData: string | null = this.storage.getItem(sessionKey);
        if (!stringifiedData) {
            throw Error(`Session key ${sessionKey} does not exists in session storage.`)
        }

        // convert string arr to object arr.
        const data: any = JSON.parse(stringifiedData);

        return data;
    }

    public updateStorage(data: any, sessionKey: string): void {

        // strigifiy the inCompTodos&compTodos arr.
        const stringifiedTodos = JSON.stringify(data);
        // save it in sessionStorage.
        this.storage.setItem(sessionKey, stringifiedTodos);

    }

}

export default new SessionStorageManager();