import React from 'react';
import { useBookingList } from '../../hook/useBooking';
import { useUserFindById } from '../../hook/useUser';
import { BookingStatus, GENDER } from '../../types/api';
import { ALLOW_SELLERS } from '../../types/const';
import { foreginKR, userRoleToKR } from '../../utils/enumToKr';
import { autoHypenPhone } from '../../utils/formatter';
import { generateClientPaging } from '../../utils/generateClientPaging';
import { closeModal } from '../../utils/popUp';
import { yyyymmdd } from '../../utils/yyyymmdd';
import { Paginater } from '../common/Paginator';
import { UserModalResvList } from './UserModalResvList';

interface IProp {
    id: string;
}

export const UserModal: React.FC<IProp> = ({ id }) => {
    const { item } = useUserFindById(id);
    const { items: bookings } = useBookingList({
        initialFilter: {
            OR: [{ seller_eq: id }, { booker_eq: id }]
        }
    })


    if (!item) return null;
    const { isResigned, name, email, phoneNumber, resignDate, resignReason, gender, role } = item;

    const isSeller = ALLOW_SELLERS.includes(role);

    const cancledBookings = bookings.filter(bk => bk.status === BookingStatus.CANCEL);

    const print = () => {
        window.print();
    }

    return <div id="UserModal" className="popup_bg_full">
        <div className="in_txt master_popup">
            <a className="close_icon" onClick={closeModal("#UserModal")}>
                <i className="flaticon-multiply"></i>
            </a>
            <div className="page">
                <h3>상세정보</h3>
                <div className="info_txt">
                    <span className="start-day">가입일: {yyyymmdd(item.createdAt)}</span>
                    {isResigned && <span className="start-day">탈퇴일: {yyyymmdd(item.resignDate)}</span>}
                    <button onClick={print} className="btn"><i className="flaticon-print mr5"></i>프린터</button>
                </div>
                {/* 가입 */}
                {isResigned &&
                    <div className="info_page">
                        <div className="full_div">
                            <h4>탈퇴정보</h4>
                            <div className="info_table line2 w50">
                                <div className="tr">
                                    <div className="th01">탈퇴사유</div>
                                    <div className="td01">
                                        <span>{resignReason}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {/* 회원정보 */}
                <div className="info_page">
                    <div className="full_div">
                        <h4>회원정보</h4>
                        <div className="info_table line8 w50">
                            {/* 개인 */}
                            {!isSeller && <>
                                <div className="tr">
                                    <div className="th01">이름</div>
                                    <div className="td01"><span>{name}</span></div>
                                    <div className="th02">아이디</div>
                                    <div className="td02"><a href={`mailto:${email}`}>{email}</a></div>
                                    <div className="th03">휴대폰</div>
                                    <div className="td03">{phoneNumber}</ div>
                                    <div className="th04">성별</div>
                                    <div className="td04">
                                        <select value={gender}>
                                            <option value={GENDER.FEMALE}>여성</option>
                                            <option value={GENDER.MAIL}>남성</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="tr">
                                    <div className="th01">주소</div>
                                    <div className="td01"><span>{item.address}</span></div>
                                    <div className="th02">주소디테일</div>
                                    <div className="td02"><span>{item.address_detail}</span></div>
                                    <div className="th03">휴대폰</div>
                                    <div className="td03"><span>{autoHypenPhone(item.phoneNumber)}</span></div>
                                    <div className="th04">국적</div>
                                    <div className="td04"><span>{foreginKR(item.is_froreginer)}</span></div>
                                </div>
                            </>
                            }
                            {/* 파트너 */}
                            {isSeller && <>
                                <div className="tr">
                                    <div className="th01">파트너명</div>
                                    <div className="td01"><span>{item}</span></div>
                                    <div className="th02">아이디</div>
                                    <div className="td02"><a href={`mailto:${item.email}`}>{item.email}</a></div>
                                    <div className="th03">연락처</div>
                                    <div className="td03"><span>{autoHypenPhone(item.phoneNumber)}</span></div>
                                    <div className="th04"></div>
                                    <div className="td04"></div>
                                </div>
                                <div className="tr">
                                    <div className="th01">업체주소</div>
                                    <div className="td01"><span>{item.busi_address}</span></div>
                                    <div className="th02">담당자</div>
                                    <div className="td02"><span>{item.manageName}</span></div>
                                    <div className="th03">연락처</div>
                                    <div className="td03"><span>{autoHypenPhone(item.busi_contact)}</span></div>
                                    <div className="th04">파트너타입</div>
                                    <div className="td04"><span>{userRoleToKR(item.role)}</span></div>
                                </div>
                                <div className="tr">
                                    <div className="th01">계좌번호</div>
                                    <div className="td01"><span>{item.bank_name}-{item.account_number}</span></div>
                                    <div className="th02">통장사본</div>
                                    <div className="td02"><span>-<button className="btn dwonload">다운로드</button></span></div>
                                    <div className="th03">사업자등록증</div>
                                    <div className="td03"><span>{item.busiRegistration?.name}<button onClick={() => {
                                        window.open(item.busiRegistration?.uri, "_blank")
                                    }} className="btn dwonload">다운로드</button></span></div>
                                    <div className="th04"></div>
                                    <div className="td04"></div>
                                </div>
                            </>}
                        </div>
                    </div>
                </div>


                {/* 파트너 */}
                {/* 사업자회원 주의사항 */}
                {/* <div className="info_page">
            <div className="full_div">
                <h4>사업자회원 주의사항</h4>
                <div className="textareabox">더이상입력불가너ㅏ유ㅚㅏ너후나ㅣㅎ</div>
            </div>
        </div> */}

                {/* 예약 및 결제 */}
                <div className="info_page">
                    <div className="full_div">
                        <h4>예약 및 결제<i className="jandaicon-info2 tooltip" data-tip="자세한 예약조회는 '예약관리'메뉴를 이용 해주세요." ></i>
                            <span className="full_div__right"><a className="btn" href="/master/reservation">예약관리 바로가기</a></span></h4>
                        <UserModalResvList id={id} />
                    </div>
                </div>
                {/* 파트너 */}
                {/* 취소 및 환불내역 */}
                <div className="info_page">
                    <div className="full_div">
                        <h4>취소 및 환불내역<i className="jandaicon-info2 tooltip" data-tip="자세한 예약조회는 '예약관리'메뉴를 이용 해주세요." ></i>
                            <span className="full_div__right"><a className="btn" href="/master/reservation">예약관리 바로가기</a></span></h4>
                        <div className="info_table reservationlist">
                            <div className="tr">
                                <div className="re01">
                                    예약번호
                            <a href="R-398234">(R-398234)</a>
                                </div>
                                <div className="re02">
                                    상품
                        </div>
                                <div className="re03">
                                    <a href="/">[PK-098328] 떠나요~!!! 제주도~!!! </a>
                                </div>
                                <div className="re04">
                                    예약일/결제일
                        </div>
                                <div className="re05">
                                    <span>2020.12.12/2020.12.12</span>
                                </div>
                                <div className="re06">
                                    환불일
                         </div>
                                <div className="re07">
                                    <span>2020.12.12</span>
                                </div>
                                <div className="re08">
                                    환불금액
                        </div>
                                <div className="re09">
                                    <span>30,000원</span>
                                </div>
                            </div>
                        </div>
                        {/* <Paginater pageNumber={10} totalPageCount={20} /> */}
                    </div>
                </div>
            </div>
        </div>
    </div>;
};
