type UserAPIRole = "admin" | "tech" | "client";

type LoginAPIResponse = {
    token: string;
    userWithoutPassword: {
        id: string;
        name: string;
        email: string;
        role: UserAPIRole;
    };
};

type UserResponse = {
    id: string;
    name: string;
    email: string;
    role: UserAPIRole;
};

type UsersAPIResponse = {
    users: UserResponse[];
};
