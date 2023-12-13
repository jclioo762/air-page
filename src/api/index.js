import { get, post, put, del } from '@/utils/http'

export const getPosts = async (params) => {
    return await get("https://jsonplaceholder.typicode.com/posts", params);
}

