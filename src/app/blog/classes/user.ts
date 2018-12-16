export class User {
    _id: string;
    nom: string;
    prenom: string;
    email: string;
    username: string;
    password: string;
    bio: string;
    image: string;
    pays: string;
    position: {
        lat: number;
        long: number;
    }
    ville: string;
}
