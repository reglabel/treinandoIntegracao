import {useEffect, useState} from 'react';

import { SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

import { api } from '../../services/api';
import { getUsers, UseUsers } from '../../services/hooks/useUsers';
import { queryClient } from '../../services/queryClient';
import { Pagination } from '../../src/components/Pagination';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';


async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(['user', userId], async () => {
        const response = await api.get(`users/${userId}`)

        return response.data;
    }, {
        staleTime: 1000 * 60 * 2
    })
}

type CreateUserFormData = {
    name: string;
    email: string;
}

function Users(this: any){
    const [page, setPage] = useState(1);
    const { data, isLoading, isFetching, error} = UseUsers(page)

    //const [campo, setCampo] = useState('') -> coloca value=campo e onChange={event => setCampo(event.target.value)}
    //const searchInputRef = useRef<HTMLInputElement>(null) no input ref={searchInputRef} -> pra ver o valor console.log(searchInputRef.current.value)

    {/*const { data, isLoading,  isFetching, error } = useQuery(
        'users',
        async () => {
            const response = await fetch('http://localhost:3000/api/users')
            const data = await response.json()

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

            return users;
        },
        {
            staleTime: 1000 * 5,
        }
    )*/}

    const router = useRouter()

    const createUser = useMutation(async (user: CreateUserFormData) => {
            const response = await api.post('users', {
                user: {
                    ...user,
                    created_at: '12/04/2001'
                }
            })

            return response.data.user;
        }, {
            onSuccess: () => {
                queryClient.invalidateQueries('users')
            },
        }
    )

    const createUserFormSchema = yup.object().shape(
        {
            name: yup.string().required('Nome obrigatório'),
            email: yup.string().required('E-mail obrigatório').email('E-mail inválido')
        }
    )

    const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm<CreateUserFormData>(
        {
            resolver: yupResolver(createUserFormSchema)
        }
    )

    const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
        await createUser.mutateAsync(values);

        router.push('/users')
        console.log(values)
    }

    return (
        <div>
            { isLoading ? (
                    <p>Carregando...</p>
                ) : error ? (
                    <p>Deu erro!</p>
                ) : (
                    <>
                        <h1>Página Lista de Users</h1>

                        <form onSubmit={handleSubmit(handleCreateUser)}>
                            <label htmlFor="fname">First name:</label><br/>
                            <input type="text" id="fname" {...register('name')}/><br/>
                            <label htmlFor="femail">E-mail:</label><br/>
                            <input type="email" id="femail" {...register('email')}/><br/>
                            <button type='submit'>Criar</button>
                        </form>

                        {!isLoading && isFetching ? (<p>Refetching</p>) : (<p>Tudo okay</p>)}
                        {data!.users.map(
                            (user: any) => {
                                return(
                                    <p key={user.id}><span style={{whiteSpace: 'nowrap', color: 'blue'}} onMouseEnter={
                                        () => handlePrefetchUser(user.id)
                                    }>Ver info -{'>'} </span>{user.name} | {user.email} | {user.createdAt}</p>
                                )
                            }
                        )}

                       <Pagination
                            totalCountOfRegisters={data?.totalCount}
                            currentPage={page}
                            onPageChange={setPage}
                       />
                    </>
                )
            }
        </div>
    )
}

export default Users