type UserAPIRole = "admin" | "tech" | "client";

type UserAPIResponse = {
    token: string;
    userWithoutPassword: {
        id: string;
        name: string;
        email: string;
        role: UserAPIRole;
    };
};
