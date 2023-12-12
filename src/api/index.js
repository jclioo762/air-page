import { get, post} from '@/utils/http'

export const getPosts = (params) => {
    return get("https://jsonplaceholder.typicode.com/posts", params);
}

