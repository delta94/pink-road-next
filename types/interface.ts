import { Dispatch } from "react";
import {  productPostFindById_ProductPostFindById_data, productPostFindById_ProductPostFindById_data_itinerary, productPostList_ProductPostList_data, productPostList_ProductPostList_page} from "../types/api";

export interface Iitineraries extends productPostFindById_ProductPostFindById_data_itinerary {}
export interface IProductPostFindById  extends productPostFindById_ProductPostFindById_data {}
export interface IProduct extends productPostList_ProductPostList_data { };
export interface IPageInfo extends  productPostList_ProductPostList_page {}
export interface ILi extends React.HTMLAttributes<HTMLLIElement> {
}
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
