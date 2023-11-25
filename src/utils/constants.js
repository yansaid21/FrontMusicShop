const SERVER_IP = 'localhost:3200';
const API_VERSION = 'v1';

export const ENV = {
    BASE_PATH: `http://${SERVER_IP}/api/${API_VERSION}`,
    API_ROUTES: {
        REGISTER: 'register',
        LOGIN: 'auth/login',
        ADMIN: 'admins',
        SELLERS: 'users',
        USER_ME: "user/me",
        ITEMS:"items",
        ITEM:"item",

    },
    JWT:{
        ACCESS: "access",
    }
};
