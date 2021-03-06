import { MasterLayout } from 'layout/MasterLayout';
import { Paginater } from 'components/common/Paginator';
import { SearcfInfoBox } from 'components/common/SearcfInfoBox';
import CalendarIcon from 'components/common/icon/CalendarIcon';
import React from 'react';
import Link from "next/link";
import ReactTooltip from 'react-tooltip';
import { useBookingList } from '../../../hook/useBooking';
import { useDateFilter } from '../../../hook/useSearch';
import { useIdSelecter } from '../../../hook/useIdSelecter';
import { useSingleSort } from '../../../hook/useSort';
import { getUniqFilter } from '../../../utils/filter';
import { BookingStatus, _ProductFilter } from '../../../types/api';
import { ResvTopNav } from '../../../components/topNav/MasterTopNav';
import { useQueryFilter } from '../../../hook/useQueryFilter';


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
export const MsReservationMain: React.FC<IProp> = () => {


    const { items, filter, setFilter, pageInfo, sort, setSort, viewCount, setViewCount, page, setPage } = useBookingList()
    const { setUniqFilter } = useQueryFilter<_ProductFilter>({})
    const { filterStart, filterEnd, hanldeCreateDateChange } = useDateFilter({ filter, setFilter })
    const { check, isChecked, selecteAll, selectedIds, setSelectedIds, unCheck, unSelectAll } = useIdSelecter(items.map(i => i._id));
    const singleSort = useSingleSort(sort, setSort);

    const doSearch = (search: string) => {
        const _filter = setUniqFilter(
            "title_contains",
            ["title_contains"],
            search
        )
    }

    const handleSatus = (status?: BookingStatus) => () => {
        setFilter({
            ...filter,
            status_eq: status
        })
    }

    const checkStatusOn = (status?: BookingStatus) => filter.status_eq === status ? "check on" : ""


    return <MasterLayout>
        <div className="in ">
            <h4>예약관리</h4>
            <div className="in_content">
                <ResvTopNav />
                <div className="con reservation">
                    <div className="con_box_top pb5">
                        <div className="top_info_number">
                            <ul className="ln3">
                                <li>
                                    <strong>234</strong>
                                    <span>전체</span>
                                </li>
                                <li>
                                    <strong>234</strong>
                                    <span>예약대기</span>
                                </li>
                                <li>
                                    <strong>234</strong>
                                    <span>예약완료</span>
                                </li>
                            </ul>
                        </div>
                        <div className="search_top">
                            <div className="hang">
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
                            </div>
                            <div className="hang">
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
                            <div className="hang fr">
                                <select className="option">
                                    <option>전체</option>
                                    <option>상품명</option>
                                    <option>상품번호</option>
                                    <option>예약번호</option>
                                    <option>예약자명</option>
                                    <option>실여행자명</option>
                                    <option>휴대번호</option>
                                    <option>파트너명</option>
                                    <option>상품상태</option>
                                    <option>진행여부</option>
                                </select>
                                <div className="search_div">
                                    <input className="w100" type="text" placeholder="검색 내용을 입력해주세요." />
                                    <div className="svg_img">
                                        <img src="/img/svg/search_icon.svg" alt="search icon" />
                                        <button />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="alignment">
                            <div className="left_div">
                                <ul className="board_option">
                                    <li className="on"><a href="/">전체<strong>46</strong></a></li>
                                    <li><a href="/">여행<strong>23</strong></a></li>
                                    <li><a href="/">체험<strong>23</strong></a></li>
                                </ul>
                                <ul className="board_option">
                                    <li className="on"><a href="/">전체<strong>46</strong></a></li>
                                    <li><a href="/">온라인예약<strong>46</strong></a></li>
                                    <li><a href="/">수기등록<strong>46</strong></a></li>
                                </ul>
                            </div>
                            <div className="right_div">
                                <ul className="board_option">
                                    <li><a href="/">전체선택</a></li>
                                    <li><a href="/">엑셀파일<i className="jandaicon-info2 tooltip" data-tip="선택된 항목에 한해서 엑셀파일로 저장이 가능합니다." ></i></a></li>

                                    <div className="reservation_list ln07">
                                        <div className="thead">
                                            <div className="t01">
                                                <span className="checkbox">
                                                    <input type="checkbox" name="agree" id="agree0" title="전체선택" />
                                                    <label htmlFor="agree0" />
                                                </span>
                                            </div>
                                            <div className="t02">예약번호/결제일/유형</div>
                                            <div className="t03">상품정보</div>
                                            <div className="t04">예약자/파트너명</div>
                                            <div className="t05">상태</div>
                                            <div className="t06">금액</div>
                                            <div className="t07">관리</div>
                                        </div>
                                        <div className="tbody">
                                            <div className="t01">
                                                <span className="checkbox">
                                                    <input type="checkbox" name="agree" id="agree1" title="개별선택" />
                                                    <label htmlFor="agree1" />
                                                </span>
                                            </div>
                                            <div className="t02">
                                                <div className="align">
                                                    <strong className="r-number"><i className="m_title">예약번호:</i>R-34252</strong>
                                                    <span className="pay-day"><i className="m_title">결제일:</i>2020.02.03</span>
                                                    <span className="goods-ct"><i className="m_title">유형:</i>여행</span>
                                                </div>
                                            </div>
                                            <div className="t03">
                                                <div className="info">
                                                    <span className="ct">문화</span>   <span className="g-number">상품번호: PINK-034982</span>
                                                    <strong className="title">떠나요~거제도~!!!!!!!!!!!!!!!!</strong>
                                                    <div className="txt">
                                                        <span className="s-day">출발일: 2020.9.9</span>
                                                        <span className="where">출발장소: 부산대학교 앞</span>
                                                        <span className="men">인원: 총 10명 (성인:3/소아:3/유아:4)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="t04">
                                                <div className="align">
                                                    <strong className="name"><i className="m_title">예약자명:</i>홍언니</strong>
                                                    <span className="patner-name"><i className="m_title">파트너명:</i>( (주)하나하나 )</span>
                                                </div>
                                            </div>
                                            <div className="t05">
                                                <div className="align">
                                                    <strong><i className="m_title">상품상태:</i>진행중</strong>
                                                    <span className="member"><i className="m_title">진행여부:</i>출발미확정<br />(인원 : 10/10 )</span>
                                                </div>
                                            </div>
                                            <div className="t06">
                                                <div className="align">
                                                    <strong className="money"><i className="m_title">금액:</i>40,000원</strong>
                                                    <span className="pay-option"><i className="m_title">결제종류:</i>신용카드</span>
                                                    <span className="r-btn stand"><i className="m_title">예약상태:</i>예약대기</span>
                                                </div>
                                            </div>
                                            <div className="t07">
                                                <div className="align">
                                                    <button className="btn small" onClick={popupOpen}>상세보기</button>
                                                    <button className="btn small">예약취소</button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* <Paginater pageNumber={10} totalPageCount={20} /> */}

                                        <div className="fin ifMobile">
                                            <div className="float_left">
                                                <button type="submit" className="btn medium">전체선택</button>
                                            </div>
                                            <div className="float_right">
                                                <button type="submit" className="btn medium">입금확인</button>
                                                <button type="submit" className="btn medium">예약취소</button>
                                            </div>
                                        </div>
                                    </div>
                                </ul>
                            </div>
                        </div>
                        <SearcfInfoBox />
                    </div>

                    {/* popup-상세보기 */}

                </div>
            </div>
        </div>
    </MasterLayout >
};

export default MsReservationMain;