type UserAPIRole = "admin" | "tech" | "client";

type UserAPIResponse = {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
        role: UserAPIRole;
    };
};
