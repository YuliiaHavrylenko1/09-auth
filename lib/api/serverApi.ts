import { cookies } from 'next/headers';
import axios, { AxiosRequestConfig, Method } from 'axios';
import { User } from '@/types/user';

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api` as const;

type HttpMethod = Extract<Method, 'GET' | 'POST' | 'PATCH' | 'DELETE'>;

export const serverApi = async <TResponse, TBody = undefined>(
  url: string,
  method: HttpMethod,
  body?: TBody
): Promise<TResponse> => {
  
  const cookieStore = await cookies(); 
  const allCookies = cookieStore.getAll?.() ?? [];
  const cookieHeader = allCookies.map(c => `${c.name}=${c.value}`).join('; ');

  const config: AxiosRequestConfig<TBody> = {
    url: baseURL + url,
    method,
    headers: {
      Cookie: cookieHeader,
    },
    withCredentials: true,
    ...(body ? { data: body } : {}),
  };

  const { data } = await axios<TResponse>(config);
  return data;
};

export const getUserServer = async (): Promise<User> => {
  return serverApi<User>('/users/me', 'GET');
};
