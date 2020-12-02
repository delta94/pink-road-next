import { useQuery } from "@apollo/client"
import { pageInfoRead, pageInfoReadVariables, pageInfoRead_PageInfoRead_data } from "types/api"
import { TPageKeys } from "types/interface"
import { GraphQLClient, request } from 'graphql-request';
import { SERVER_URI } from "apollo/uri";
import { PAGE_INFO_READ } from "../apollo/gql/queries";


// export const usePageInfo = async (key: TPageKeys) => {
//     const { PageInfoRead } = await request<pageInfoRead, pageInfoReadVariables>(SERVER_URI, PAGE_INFO_READ, { key });
//     const { data } = PageInfoRead;
//     return { data };
// }


export type TUsePageInfo = {
    data: pageInfoRead_PageInfoRead_data;
}
export const usePageInfo = async (key: TPageKeys) => {
    const graphQLClient = new GraphQLClient(SERVER_URI, {
        credentials: 'include',
        mode: 'cors',
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluQG5hdmVyLmNvbSIsImlhdCI6MTYwNDkwMjIzMX0.Akxsuj1uVGgqqiSjC8O8WOQ5gOATTSyssIa6VSiqei0"
        }
    })
    const { PageInfoRead } = await graphQLClient.request<pageInfoRead, pageInfoReadVariables>(PAGE_INFO_READ, { key })
    const { data } = PageInfoRead;
    return { data };
}