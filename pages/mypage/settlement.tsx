import CalendarIcon from 'components/common/icon/CalendarIcon';
import { Paginater } from 'components/common/Paginator';
import { PurChasedItem } from 'components/mypage/PurchasedItem';
import dayjs from 'dayjs';
import { MypageLayout } from 'layout/MypageLayout';
import React, { useContext, useState } from 'react';
import SortSelect from '../../components/common/SortMethod';
import { ViewCount } from '../../components/common/ViewCount';
import { SearchBar } from '../../components/searchBar/SearchBar';
import { LastMonthBooking } from '../../components/static/LastMonthBooking';
import { ThisMonthBooking } from '../../components/static/ThisMonthBooking';
import { ThisMonthPayAmt } from '../../components/static/ThisMonthPayAmt';
import { useCustomCount } from '../../hook/useCount';
import { useDateFilter } from '../../hook/useSearch';
import { useSettlementList } from '../../hook/useSettlement';
import { Fsettlement } from '../../types/api';
import { ALLOW_ALLOW_SELLERS } from '../../types/const';
import { productStatus } from '../../utils/enumToKr';
import { autoComma, autoHypenPhone } from '../../utils/formatter';
import { auth, compose } from '../../utils/with';

interface IProp { }

const popupOpen = () => {
    $('#Popup01').css({
        'display': 'flex'
    });

}
const popupClose = () => {
    $('#Popup01').css({
        'display': 'none'
    });
}
const popupOpen2 = () => {
    $('#Popup02').css({
        'display': 'flex'
    });

}
const popupClose2 = () => {
    $('#Popup02').css({
        'display': 'none'
    });
}

export const MySettlement: React.FC<IProp> = () => {
    const { items, filter, setFilter } = useSettlementList()
    const [target] = useState<Fsettlement | null>(null);
    const { filterEnd, filterStart, hanldeCreateDateChange } = useDateFilter({
        filter,
        setFilter
    });

    const { salesofLastMonth, salesOfThisMonth, settleAvaiableAmount, cancelReturnPrice } = useCustomCount(["salesofLastMonth", "salesofLastMonth", "settleAvaiableAmount", "cancelReturnPrice"])

    const doSearch = (search: string) => {
        const _filter = {
            ...filter
        }

        // _filter["title_contains"] = search ? search : undefined;
        setFilter({
            ..._filter,
        })
    }


    return <MypageLayout>
        <div className="in mypage_purchase">
            <h4>매출/정산관리</h4>
            <div className="paper_div">
                <div className="statement_div">
                    <div className="top_btn">
                        <span>통계표 상세보기</span>
                    </div>
                    <ul>
                        <li>
                            <strong>저번달 예약</strong>
                            <div><strong>{salesofLastMonth}</strong>건</div>
                        </li>
                        <li>
                            <strong>이번달 예약</strong>
                            <div><strong>{salesOfThisMonth}</strong>건</div>
                        </li>
                        <li>
                            <strong>정산 가능 금액 (받을 수 있는 금액) </strong>
                            {/* 계산법: 상태가 Ready인 Settlement들의 정산금액 */}
                            <div><strong>{autoComma(settleAvaiableAmount)}</strong>원</div>
                        </li>
                        <li>
                            <strong>취소 환수금</strong>
                            {/* 계산법: Settlement의 취소 환수금들의 합산  */}
                            <div><strong>{autoComma(cancelReturnPrice)}</strong>원</div>
                            <strong>예약취소 환수금</strong>
                        </li>
                    </ul>
                </div>
                <div className="con_top">
                    <h6>상세검색</h6>
                    <SearchBar
                        filterStart={filterStart}
                        filterEnd={filterEnd}
                        doSearch={ }
                        Status={
                            <div className="jul2">
                                <div className="title">상태</div>
                                <div className="text">
                                    <span className="check on">전체</span>
                                    <span className="check">예약완료</span>
                                    <span className="check">예약취소</span>
                                </div>
                            </div>
                        } onDateChange={() => { }} defaultRange={{}} />
                    <div className="search_box">
                        <div className="jul4">
                            <div className="title">날짜</div>
                            <div className="text">
                                <ul className="day_ul">
                                    <li className="on">
                                        <span>이번달</span>
                                    </li>
                                    <li className="on">
                                        <span>저번달</span>
                                    </li>
                                    <li>
                                        <span>6개월</span>
                                    </li>
                                    <li>
                                        <span>1년</span>
                                    </li>
                                </ul>
                                <div className="input_box">
                                    <input type="text" className="day w100" />
                                    <CalendarIcon />
                                </div>
                                ~
                                 <div className="input_box">
                                    <input type="text" className="day w100" />
                                    <CalendarIcon />
                                </div>
                            </div>
                        </div>
                        <div className="jul1">
                            <div>
                                <select className="option">
                                    <option>상품코드</option>
                                    <option>상품명</option>
                                    <option>예약자</option>
                                </select>
                                <div className="search_div">
                                    <input className="" type="text" placeholder="검색 내용을 입력해주세요." />
                                    <div className="svg_img">
                                        <img src="/img/svg/search_icon.svg" alt="search icon" />
                                        <button />
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="con_bottom">

                    <div className="con_box">
                        <div className="alignment">
                            <div className="left_div">
                                총 <strong>22,222</strong>개
                            </div>
                            <div className="right_div">
                                <SortSelect onChange={setSort} sort={sort} />
                                <ViewCount value={viewCount} onChange={setViewCount} />
                            </div>
                        </div>
                        <div className="fuction_list_mini ln08">
                            <div className="thead">
                                <div className="th01">
                                    <span className="checkbox">
                                        <input type="checkbox" name="agree" id="agree0" title="전체선택" />
                                        <label htmlFor="agree0" />
                                    </span>
                                </div>
                                <div className="th02">상품코드</div>
                                <div className="th03">상품명</div>
                                <div className="th04">상품상태</div>
                                <div className="th05">정산날짜</div>
                                <div className="th06">금액</div>
                                <div className="th07">상태</div>
                                <div className="th08">상세보기</div>
                            </div>
                            <div className="tbody">
                                <ul>
                                    {items.map(item =>
                                        <li>
                                            <div className="th01"><input type="checkbox" /></div>
                                            <div className="th02">{item.product.code}</div>
                                            <div className="th03">{item.product.title}</div>
                                            <div className="th04">{productStatus(item.product.stauts)}</div>
                                            <div className="th05">{dayjs(item.requestDate).format("YYYY.MM.DD")}</div>
                                            <div className="th06">{item}</div>
                                            <div className="th07"><strong className="ok">{settlementStatus(item.status)}</strong></div>
                                            <div onClick={} className="th08"><i className="btn">상세보기</i></div>
                                        </li>
                                    )}
                                </ul>
                            </div>
                            <div className="boardNavigation">
                                <div className="float_left">
                                    <div className="pagenate_mini">
                                        <div className="page_btn first"><i className="jandaicon-arr4-left"></i></div>
                                        <div className="count"><strong>1</strong> / 10</div>
                                        <div className="page_btn end"><i className="jandaicon-arr4-right"></i></div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="in_fin mt30">
                            <div className="float_left">
                                <button type="submit" className="btn strong" onClick={popupOpen}>정산 계산하기</button>
                            </div>
                            <div className="float_right">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        


        {/* popup-상세보기 */}
        <div id="Popup02" className="popup_bg_full">
            <div className="in_txt master_popup">
                <a className="close_icon" onClick={popupClose2}>
                    <i className="flaticon-multiply"></i>
                </a>
                <div className="page">
                    <h3>예약 상세정보</h3>
                    <div className="info_txt">
                        <span className="r-number">예약번호: <i>R-34252</i></span>
                        <span className="r-day">예약일: 2020.08.26</span>
                        <span className="pay-day">결제일: 2020.08.26</span>
                        <button className="btn"><i className="flaticon-print mr5"></i>프린터</button>
                        <button className="btn mr5"><i className="flaticon-download mr5"></i>엑셀저장</button>
                    </div>

                    <div className="info_table goodsinfo">
                        <div className="tr">
                            <div className="top01">
                                <div className="img" style={{ backgroundImage: 'url(/img/store_01.jpg)' }} ></div>
                                <div className="info">
                                    <span className="ct">문화</span><span className="g-number">상품번호: PK-034982</span>
                                    <strong className="title">떠나요~거제도~!!!!!!!!!!!!!!!!</strong>
                                    <div className="txt">
                                        <span className="goods-state1">확정여부: 출발미정(6/10)</span>
                                        <span className="goods-state2">상품상태: 예약진행중</span>

                                    </div>
                                </div>
                            </div>
                            <div className="top02">
                                <div className="align">
                                    <span className="s-day">출발일: 2020.9.9</span>
                                    <span className="where">출발장소: 부산대학교 앞</span>
                                </div>
                            </div>
                            <div className="top03">
                                <div className="align">
                                    <i className="state re-stay">예약대기</i>
                                    <span><i className="jandaicon-info2"></i>예약은 걸었으나 입금이 되지 않았습니다. 1일 이내에 입금을 하지 않으시면 예약대기가 풀립니다.</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="info_page">
                        <div className="left_div">
                            <h4>결제 정보</h4>
                            <div className="info_table w50">
                                <div className="tr">
                                    <div className="th01">
                                        결제금액
                                </div>
                                    <div className="td01">
                                        <span>50,000</span>
                                    </div>
                                    <div className="th02">
                                        결제방법
                                </div>
                                    <div className="td02">
                                        <span>카드</span>
                                    </div>
                                </div>
                                <div className="tr">
                                    <div className="th01">
                                        환불정보-예금주
                                </div>
                                    <div className="td01">
                                        <span>홍언니</span>
                                    </div>
                                    <div className="th02">
                                        환불정보-계좌
                                </div>
                                    <div className="td02">
                                        <span>(부산은행)000-000-00000</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="right_div">
                            <h4>환불 정보</h4>
                            <div className="info_table w50">
                                <div className="tr">
                                    <div className="th01">
                                        취소신청
                                </div>
                                    <div className="td01">
                                        <span>2020.12.12 - 홍언니</span>
                                    </div>
                                    <div className="th02">
                                        환불예정일
                                </div>
                                    <div className="td02">
                                        <span>2020.12.13</span>
                                    </div>
                                </div>
                                <div className="tr">
                                    <div className="th01">
                                        환불형태
                                </div>
                                    <div className="td01">
                                        <span>부분취소</span>
                                    </div>
                                    <div className="th02">
                                        환불금액
                                </div>
                                    <div className="td02">
                                        <span>43,000원</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="info_page">
                        <div className="full_div">
                            <h4>예약자 정보</h4>
                            <div className="info_table peoplelist">
                                <div className="top_info">
                                    <span className="tt">선택된 예약 인원</span>
                                    <span>총 4명 ( 성인2 / 소아2 / 유아0 )</span>
                                    <span className="float_right"><i className="menok">예약자-포함</i><i className="menno">예약자-미포함</i></span> {/* 포함 미포함 둘중하나만 표시*/}
                                </div>
                                <div className="tr first">
                                    <div className="re01">
                                        예약자(본인)
                                </div>
                                    <div className="re02">
                                        예약자명
                                </div>
                                    <div className="re03">
                                        <span>홍언니</span>
                                    </div>
                                    <div className="re04">
                                        연락처
                                </div>
                                    <div className="re05">
                                        <a href="tel:010-0000-0000">010-0000-0000</a>
                                    </div>
                                    <div className="re06">
                                        성별
                                </div>
                                    <div className="re07">
                                        <span>여성</span>
                                    </div>
                                    <div className="re08">
                                        나이
                                </div>
                                    <div className="re09">
                                        <span>1988-03-03 (만 32세)</span>
                                    </div>
                                </div>
                                <div className="tr">
                                    <div className="re01">
                                        여행자1
                                    <span className="cut_nev">
                                            <i className="flaticon-substract"></i>
                                            <i className="flaticon-add"></i>
                                        </span>
                                    </div>
                                    <div className="re02">
                                        여행자명
                                </div>
                                    <div className="re03">
                                        <span><input type="text" /></span>
                                    </div>
                                    <div className="re04">
                                        연락처
                                </div>
                                    <div className="re05">
                                        <span><input type="text" /></span>
                                    </div>
                                    <div className="re06">
                                        성별
                                </div>
                                    <div className="re07">
                                        <select>
                                            <option>여성</option>
                                            <option>남성</option>
                                        </select>
                                    </div>
                                    <div className="re08">
                                        나이
                                </div>
                                    <div className="re09">
                                        <span><input type="text" /> (만 --세)</span>{/*input박스 클릭시 달력이 나와야 함, 우측 나이 계산은 자동으로 출력*/}
                                    </div>
                                </div>
                            </div>

                        </div>


                    </div>


                    <div className="info_page">
                        <h4>메모</h4>
                        <div className="write_comment">
                            <div className="comment_layout">
                                <ul className="text_box">
                                    <li>
                                        <div className="txta w100">
                                            <textarea style={{ height: "100px;" }} placeholder="메모는 꼼꼼하게 체크는 정확하게"></textarea>
                                        </div>
                                    </li>
                                    <li className="tr count">0/3000</li>
                                </ul>
                                <div className="text_box_bottom">
                                    <div className="float_left w50">
                                        <span><i className="jandaicon-info2"></i>기존의 메모를 삭제하시면 되돌릴 수 없습니다. 신중하게 입력해 주세요.</span>
                                    </div>
                                    <div className="btn_send float_right"><button className="comment_btn">저장</button> </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="fin ifMobile">
                        <div className="float_left">
                            <button type="submit" className="btn medium">
                                예약취소
                        </button>
                        </div>
                        <div className="float_right">
                            <button type="submit" className="btn medium mr5">
                                수정하기
                        </button>
                            <button type="submit" className="btn medium">
                                저장하기
                        </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </MypageLayout >
};



export default auth(ALLOW_ALLOW_SELLERS)(MySettlement)
