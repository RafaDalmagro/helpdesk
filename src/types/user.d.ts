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
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};
