export interface NewGoogleUser {
    uid: string;
    phoneNumber?: string | null;
    displayName?: string | null;
    photoURL?: string | null;
    email?: string | null;
}

export interface GoogleUser {
    id: string;
    uid?: string;
    phoneNumber?: string | null;
    displayName?: string | null;
    photoURL?: string | null;
    email?: string | null;
}