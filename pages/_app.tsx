import React, { useEffect, useState } from 'react';
import 'css/all.css';
import "dayjs/locale/ko"
import dayjs from 'dayjs';
import Layout from '../layout/Layout';
import { ApolloProvider, useQuery } from '@apollo/client';
import { getContext_GetProfile_data as IProfile, categoryList_CategoryList_data, getContext, UserRole, Fhomepage, Fcategory, CategoryType } from 'types/api';
import PinkClient from "apollo/client"
import { ALLOW_ADMINS, ALLOW_FULLESS, ALLOW_SELLERS } from '../types/const';
import { GET_CONTEXT } from '../apollo/gql/queries';
import { bracketVergionChange } from '../utils/Storage';
import PageDeny from './Deny';
import { categoryMap, defaultCatsMap } from '../utils/categoryMap';
import { useRouter } from 'next/router';


dayjs.locale('ko')

export type TContext = {
  categories: categoryList_CategoryList_data[]
  role: UserRole
  isAdmin: boolean,
  isSeller: boolean,
  isManager: boolean,
  myProfile?: IProfile
  isLogin?: boolean;
  isParterB?: boolean;
  homepage?: Fhomepage;
  isParterNonB?: boolean;
  categoriesMap: Record<CategoryType, Fcategory[]>
}


const defaultContext: TContext = {
  categories: [],
  role: UserRole.anonymous,
  isAdmin: false,
  isManager: false,
  isSeller: false,
  myProfile: undefined,
  homepage: undefined,
  isLogin: false,
  isParterB: false,
  isParterNonB: false,
  categoriesMap: defaultCatsMap,
}

export const AppContext = React.createContext<TContext>(defaultContext);

//APp파일은 서버사이드 렌더링만함
function App({ Component, pageProps }: any) {
  const [editMode, setEditMode] = useState(false);
  const router = useRouter()


  const ComponentLayout = Component.Layout ? Component.Layout : Layout;
  const ComponentAuth = Component.Auth ? Component.Auth : ALLOW_FULLESS;

  const { data, loading } = useQuery<getContext>(GET_CONTEXT, {
    client: PinkClient,
    nextFetchPolicy: "network-only"
  })

  const homepage = data?.Homepage.data || undefined;
  const catList = data?.CategoryList?.data || []
  const myProfile = data?.GetProfile?.data || undefined
  const role: UserRole = myProfile?.role || UserRole.anonymous

  const isSeller = [UserRole.partner, UserRole.partnerB, UserRole.manager, UserRole.admin].includes(role);
  const isParterB = [UserRole.partnerB, UserRole.manager, UserRole.admin].includes(role);
  const isParterNonB = [UserRole.partner, UserRole.manager, UserRole.admin].includes(role);
  {/* <DaumPostcode autoResize autoClose onSearch={() => { }} onComplete={(asd) => { }} /> */ }

  useEffect(() => { bracketVergionChange() }, [])

  const catsMap = categoryMap(catList);

  if (!ComponentAuth.includes(role || null)) {
    Component = PageDeny
  }

  if (
    //인증 받지 않았으며 일반 권한은 아닌경우
    ALLOW_SELLERS.includes(role) &&
    !myProfile?.isVerifiedManager &&
    !ComponentAuth.includes(UserRole.anonymous) &&
    !ComponentAuth.includes(UserRole.individual)
  ) {
    Component = () => <PageDeny msg="인증되지 않은 판매자 입니다. 인증 소요시간은 평균 24시간 입니다." />
  }

  if (router.isFallback) {
    console.log("cachefallback");
    return <div>Loading...</div>
  }

  if (loading) return <div >...loading</div>
  return (
    <div className="App">
      <ApolloProvider client={PinkClient}>
        <AppContext.Provider value={{
          categoriesMap: catsMap,
          categories: catList || [],
          role,
          myProfile,
          isSeller,
          isParterB,
          isAdmin: role === UserRole.admin,
          isManager: ALLOW_ADMINS.includes(role),
          isLogin: !!myProfile,
          isParterNonB,
          homepage,
        }}>
          <ComponentLayout>
            <Component {...pageProps} />
          </ComponentLayout>
        </AppContext.Provider>
      </ApolloProvider>
    </div>
  );
}

export default App;