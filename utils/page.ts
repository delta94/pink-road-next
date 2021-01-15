import { GraphQLClient } from "graphql-request";
import { GetServerSideProps, GetStaticProps } from "next";
import { HOMEPAGE } from "../apollo/gql/homepage";
import { SERVER_URI } from "../apollo/uri";
import { usePageInfo } from "../hook/usePageInfo";
import { Fhomepage, Fpage, homepage } from "../types/api"
import { TPageKeys } from "../types/interface";
import isEmpty from "./isEmpty";

export const getQueryIndex = (inPageIndex: number, pageInfo: Fpage) => {
    const { remainder, cntPerPage, totalPageSize } = pageInfo;
    const diff = cntPerPage - remainder;
    const inPageReverse = cntPerPage - inPageIndex;
    return ((pageInfo.totalPageSize - 2) * pageInfo.cntPerPage) + inPageReverse + diff;
}

export const useHomepageServerSide = async () => {
    const graphQLClient = new GraphQLClient(SERVER_URI, {
        credentials: 'include',
        mode: 'cors',
        cache: "reload",
    })

    const defaultHomePage = {
        PrivacyPolicy: "",
        __typename: "Homepage",
        blacklist: [],
        logi: "",
        loginOutRedirect: "",
        loginRedirect: "",
        marketingPolic: "",
        partnerBpolicy: "",
        partnerPolicy: "",
        signUpRedirect: "",
        siteDesc: "",
        siteKeyWards: "",
        siteName: "",
        thirdPolicy: "",
        travelerPolicy: "",
        usePolicy: ""
    }

    const { Homepage: { data = defaultHomePage } } = await graphQLClient.request<homepage>(HOMEPAGE)
    console.log(data);
    return { data };
}

export const getStaticPageInfo = (key: TPageKeys):GetStaticProps => async () => {
    const { data } = await usePageInfo(key);
    const { data: homepage } = await useHomepageServerSide();

    return {
        revalidate: 1,
        props: {
            pageKey: key,
            pageInfo: data?.value,
            homepage,
        }, // will be passed to the page component as props
    }
}

export interface Ipage {
    pageKey: TPageKeys,
    pageInfo: any
}

export const getHomepage:GetServerSideProps = async () => {
    const homepage = await useHomepageServerSide();
    return {
        revalidate: 10,
        props: {
            homepage: homepage.data as Fhomepage
        }, // will be passed to the page component as props
    }
}

export type TGetHomepage = {
    homepage: Fhomepage
}