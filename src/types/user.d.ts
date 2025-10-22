export enum UserRole {
    ADMIN = "admin",
    TECH = "tech",
    CLIENT = "client",
}

type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    role?: UserRole;
    filename?: string | null;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};
