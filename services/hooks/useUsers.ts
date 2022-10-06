import { useQuery, UseQueryOptions } from "react-query";
import { api } from "../api";

type User = {
    id: string,
    name: string,
    email: string,
    createdAt: string
}

type GetUserResponse = {
    totalCount: number;
    users: User[];
}

export async function getUsers(page: number): Promise<GetUserResponse> {
    const { data, headers} = await api.get('users', {
        params: {
            page,
        }
    })

    const totalCount = Number(headers['x-total-count'])

    const users = data.users.map(
        (user: any) => {
            return{
                id: user.id,
                name: user.name,
                email: `${user.email}.br`,
                createdAt: user.createdAt
            } 
        }
    );

    return {
        users,
        totalCount,
    };
} 

export function UseUsers(page: number){
    return useQuery(
        ['users', page],
        () => getUsers(page),
        {
            staleTime: 1000 * 60 * 5,
        }
    )
}