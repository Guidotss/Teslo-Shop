import { IProduct } from '@/interfaces';
import useSWR, { SWRConfiguration } from 'swr';
import { SwrProductsResponse } from '@/interfaces/swrProductResponse';


export const useProducts = ( url:string, config:SWRConfiguration={} ) => {

    const { data,error } = useSWR<SwrProductsResponse>(`/api/${ url }`, config);
    
    

    return {
        data: data!,
        isLoading:!error && !data,
        isError:error
    }

}