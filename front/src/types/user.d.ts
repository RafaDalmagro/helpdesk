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

type UserTech = {
    id: string;
    name: string;
    email: string;
    role: "tech";
    TechAvailability?: {
        time: string;
        weekday: number;
    }[];
};

type UserTechDetail = UserTech & {
    ticketsAsTech?: {
        id: string;
        title: string;
    }[];
};

type CreateTechData = {
    name: string;
    email: string;
    password: string;
    role: "tech";
    times: string[];
};
