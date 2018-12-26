export class Message {
    akMessage: string;
    email: string;
    sujet: string;
    message: string;
    date: Date;
    vu: boolean;

    constructor(email: string, sujet: string, message: string) {
        this.email = email;
        this.sujet = sujet;
        this.message = message;
        this.akMessage = '';
        this.date = new Date();
        this.vu = false;
    }
}
