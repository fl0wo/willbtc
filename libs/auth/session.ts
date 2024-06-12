import {getServerSession} from 'next-auth';
import {authOptions} from "@/libs/next-auth";
import userClient from "@/libs/drizzle/queries/user";
import {UserType} from "@/libs/drizzle/models/UserType";

export const getSession = async () => {
    return await getServerSession(authOptions);
};

export const getCurrentUser = async ():Promise<UserType> => {
    const session = await getSession();
    return await userClient
        .query
        .get
        .me(session!);
};