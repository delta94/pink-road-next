import { QueryHookOptions, useQuery } from "@apollo/client";
import { PORT_FOLIO_LIST } from "../apollo/queries";
import { Fpage,  Fportfolio, portfolioList, portfolioListVariables, _PortfolioFilter, _PortfolioSort } from "../types/api";
import { DEFAULT_PAGE } from "../types/const";
import { useListQuery, ListInitOptions, IListHook } from "./useListQuery";
interface IuseItemListProp extends Partial<ListInitOptions<_PortfolioFilter, _PortfolioSort>> {
    options?: QueryHookOptions<portfolioList, portfolioListVariables>
}
export interface IusePortfolioList extends IListHook<_PortfolioFilter, _PortfolioSort> {
    items: Fportfolio[];
    getLoading: boolean;
    pageInfo: Fpage;
}

export const usePortfolioList = ({
    initialPageIndex = 0,
    initialSort = [],
    initialFilter = {},
    initialViewCount = 20,
    options = {}
}: IuseItemListProp = {}): IusePortfolioList => {
    const { variables: overrideVariables, ...ops } = options;
    const { filter, setPage, setFilter, setSort, setViewCount, sort, viewCount, integratedVariable } = useListQuery({
        initialFilter,
        initialPageIndex,
        initialSort,
        initialViewCount
    })

    const { data, loading: getLoading } = useQuery<portfolioList,portfolioListVariables>(PORT_FOLIO_LIST,{
        fetchPolicy: "cache-and-network",
        variables: {
            ...integratedVariable,
            ...overrideVariables
        },
        ...ops
    })

    const items: Fportfolio[] = data?.PortfolioList.data || [];
    const pageInfo: Fpage = data?.PortfolioList.page || DEFAULT_PAGE;

    return { pageInfo, filter, setPage, getLoading, setFilter, setSort, setViewCount, sort, viewCount, items }
}