type Session = {
    token: string;
    userWithoutPassword: {
        id: string;
        name: string;
        email: string;
        role: UserRole;
        filename: null | string;
        firstLogin: boolean;
        isActive: boolean;
        deletedAt: null | string;
        createdAt: string;
    };
};
