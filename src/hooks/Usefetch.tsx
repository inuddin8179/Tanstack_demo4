'use client';
import React from 'react';
import { useEffect,useRef } from 'react';
import { useQuery,useIsFetching } from '@tanstack/react-query';
import { Todo } from '@/types/Todo';
import { Users } from '@/types/Users';

function Usefetch() {
    const { data: todos, isLoading: isLoadingTodos } = useQuery<Todo[]>({
        queryKey: ['todos'],
        queryFn: () => 
            new Promise<Todo[]>((resolve) => {
                setTimeout(() => {
                    fetch('https://jsonplaceholder.typicode.com/todos')
                        .then((res) => res.json())
                        .then((data) => resolve(data));
                }, 2000); 
            }),
    });

    const { data: users, isLoading: isLoadingUsers } = useQuery<Users[]>({
        queryKey: ['users'],
        queryFn: () => 
            new Promise<Users[]>((resolve) => {
                setTimeout(() => {
                    fetch('https://jsonplaceholder.typicode.com/users') 
                        .then((res) => res.json())
                        .then((data) => resolve(data));
                }, 2000); 
            }),
           
    });
 
   
       const isFetching = useIsFetching();
       const previousIsFetching = useRef(isFetching);
   
      
       useEffect(() => {
           if (isFetching && !previousIsFetching.current) {
               alert('Fetching data...');
           }
           previousIsFetching.current = isFetching; 
       }, [isFetching]);
       
      
    if (isLoadingTodos || isLoadingUsers) {
        return (
            <main className='mt-4 flex min-h-screen flex-col items-center'>
                It is loading...
            </main>
        );
    }

    return (
        <main className='flex min-h-screen flex-col items-center justify-between p-24'>
            <h1 style={{ color: 'blue' }}>1.TODOS</h1>
            <div>
                {todos?.slice(0, 5).map((todo: Todo) => (
                    <div key={todo.id}>
                        <h2>{todo.title}</h2>
                    </div>
                ))}
            </div>
            <br />
            <h1 style={{ color: 'blue' }}>2.USERS</h1>
            <div>
                {users?.map((user: Users) => (
                    <div key={user.id}>
                        <h2>{user.name}</h2>
                        <h2>{user.email}</h2>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default Usefetch;


