import useSWR from 'swr'
import apiClient from "@/libs/api";

const fetcher = (url:string) => apiClient.get(url).then(res => res)
    // axios.get(url).then(res => res.data)

export function useBot(id?:string|null) {
    if(!id) {
        return {data: null, isLoading: false, isError: null}
    }

    const { data, error, isLoading } = useSWR(`/bot/${id}`, fetcher);

    return {
        data,
        isLoading,
        isError: error
    }
}