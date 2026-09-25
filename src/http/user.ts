import { $host } from ".";

export const signUp = async (username: string, password: string) => {
    const { data } = await $host.post('/api/user/sign-up', {
        username,
        password
    });
    return data;
};