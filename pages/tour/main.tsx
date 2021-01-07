import React from 'react';
import Link from "next/link";
import { MasterLayout } from 'layout/MasterLayout';
import { GoodsListAPI } from '../../components/common/GoodsListAPI';

interface IProp { }

export const TourMain: React.FC<IProp> = () => {
    return <MasterLayout>
        <div className="itstour_box">
            <div className="w1200">


                <div className="theme_deal">
                    <ul>
                        <li className="top_01">
                            <span className="first">오늘은 소풍가는 날</span><br />
                            <span className="tag">#오늘머먹?! #친구야같이가자</span>
                        </li>
                        <li className="top_02">
                            <span className="title">#양떼목장</span>
                        </li>
                        <li className="top_03">
                            <span className="title">#떠나요두리서</span>
                        </li>
                        <li className="top_04">
                            <span className="title">#부산여행</span>
                        </li>
                        <li className="top_05">
                            <span className="title">#먹고놀고즐기고</span>
                        </li>
                        <li className="top_06">
                            <span className="title">#맛집</span>
                        </li>
                    </ul>
                </div>


                <div className="deal_list mt30">
                    <div className="alignment">
                        <div className="left_div"><h4>#꽃길만걷자</h4></div>
                        <div className="right_div">
                            <span className="goto_page"><a href="tour/list">바로가기<i className="flaticon-menu-1"></i></a></span>
                        </div>
                    </div>
                    <GoodsListAPI />
                </div>

                <div className="deal_list mt30">
                    <div className="alignment">
                        <div className="left_div"><h4>#당일여행</h4></div>
                        <div className="right_div">
                            <span className="goto_page"><a href="tour/list">바로가기<i className="flaticon-menu-1"></i></a></span>
                        </div>
                    </div>
                    <GoodsListAPI />
                </div>

                <div className="deal_list">
                    <div className="search">
                        <ul>
                            <li className="on"><a href="../sub/tour_list.html">#ALL</a></li>
                            <li><a href="../sub/tour_list.html">#뚜벅이</a></li>
                            <li><a href="../sub/tour_list.html">#반일투어(5시간)</a></li>
                            <li><a href="../sub/tour_list.html">#당일여행(9시간)</a></li>
                            <li><a href="../sub/tour_list.html">#서울/경기</a></li>
                            <li><a href="../sub/tour_list.html">#부산/영남</a></li>
                            <li><a href="../sub/tour_list.html">#제주</a></li>
                        </ul>
                    </div>
                    <div className="alignment">
                        <div className="left_div"><span>총 <strong>22,222</strong>개</span></div>
                        <div className="right_div">
                            <select className="sel01">
                                <option>추천수</option>
                                <option>예약수</option>
                                <option>조회수</option>
                            </select>
                            <select className="sel02">
                                <option>10개 보기</option>
                                <option>50개 보기</option>
                                <option>100개 보기</option>
                            </select>
                        </div>
                    </div>
                    <GoodsListAPI /> <GoodsListAPI /> <GoodsListAPI />

                </div>


            </div >
        </div >
    </MasterLayout>
};

export default TourMain;