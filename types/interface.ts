import { QueryHookOptions } from "@apollo/client";
import { CSSProperties, Dispatch } from "react";
import { ListInitOptions } from "../hook/useListQuery";
import {  NotificationTriggerEvent, portfolioFindById_PortfolioFindById_data, productFindById_ProductFindById_data, productFindById_ProductFindById_data_itinerary, productList_ProductList_data, productList_ProductList_page, ReplaceString} from "../types/api";

export interface Iitineraries extends productFindById_ProductFindById_data_itinerary {}
export interface IproductFindById  extends productFindById_ProductFindById_data {}
export interface IProduct extends productList_ProductList_data { };
export interface IPortfolio extends portfolioFindById_PortfolioFindById_data {};
export interface IPageInfo extends  productList_ProductList_page {}
export interface ILi extends React.HTMLAttributes<HTMLLIElement> {
}
export declare type TElements = string | JSX.Element | JSX.Element[] | string[];
export interface IDiv extends React.HTMLAttributes<HTMLDivElement> {
}

export type TCount = {
    name: string;
    value: number
}

export type TBracketItem = {
    id: string;
    name: string;
    price: number;
    count: TCount[]
}

export interface IHumanCount {
    adult: number;
    kids: number;
    baby: number;
}

export enum QStatus {
    "PROCESSING" = "PROCESSING",
    "DONE" = "DONE"
}
export declare type ISet<T> = Dispatch<React.SetStateAction<T>>;


export type TPageKeys = "site-info" | "main" | "portfolio" | "tourMain"


export type TLangs = "kr" | "en" | string
interface Foo {
    style?:CSSProperties,
}
interface TInfoCell extends Foo {
    [key:string]:any
}
export type TStieInfo = {
    [key:string]:TInfoCell
}


export type E_INPUT = React.ChangeEvent<HTMLInputElement>;


export interface IlistQueryInit<F,S,Q,V> extends Partial<ListInitOptions<F, S>> {
    options?: QueryHookOptions<Q, V>
}


type ReplaceKR = Record<ReplaceString, string>;
export const ReplaceKr:ReplaceKR = {
    "BOOKERNMAE": "예약자명",
    REFUND_AMT: "환불금액",
    REQUEST_DATE: "요청일",
    "USERNAME": "유저명",
    "BOOKING_STATUS": "예약상태",
    "INTERGRATED_PRODUCT_INFO": "(상품명/예약인원/예약금/출발일자)",
    "PARTNERNAME": "파트너명",
    "PEOPLE": "예약인원",
    "PROD_NAME": "상품명",
    "PRICE": "예약가격",
    "TRAVEL_CONFIRMED": "출발 확정/미확정",
    "TRAVEL_DATE_YMD": "출발일자"
}