import dayjs from "dayjs";
import { useProductFindById } from "hook/useProduct";
import SubTopNav from "layout/components/SubTop";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import { IHumanCount, IproductFindById } from "types/interface";
import { autoComma } from "utils/formatter";
import Page404 from "pages/404";
import { AppContext } from "pages/_app";
import { useProductDelete } from "hook/useProduct";
import { IAuthInfo } from "../../../components/nice/type";
import { getAuth } from "../../../components/nice/getAuth";
import NiceElments from "../../../components/nice/NiceElement";
import { getNiceElementForTest } from "../../../components/nice/niceUtils";
import Slider, { Slide } from "../../../components/slider/Slider";
import SLIDER from "react-slick";
import { useScroll } from "../../../hook/useScroll";
import { handleTab, getTab, tabCheck } from "../../../components/tourView/tabUtils";
import { toast } from "react-toastify";
import { addItem } from "../../../utils/Storage";
import { useBasket } from "../../../hook/useBasket";
import { useUpdate } from "../../../hook/useUpdater";
import { getRangeString } from "../../../utils/product";

// <div class="top_visual">
// <div class="sub_header sub_bg" style="background-image:url(../img/su_visual_bg.jpg);">
//     <div class="w1200">
//         <h2 class="title">Tour</h2><p class="text"></p>
//     </div>
// </div>
// <div class="header_nav">
//     <ul>
//         <li class="home">
//             <a href="../main/main.html">
//             </a>
//         </li>
//         <li class="homedeps1"><a href="../sub/tour_main.html">Tour</a></li>
//         <li class="homedeps2"><a href="../sub/tour_list.html">상품리스트</a></li>
//     </ul>
// </div>
// </div>

interface IProps {
  product: IproductFindById;
}

const TourDetail: React.FC<IProps> = ({ product }) => {
  const { isManager, isAdmin } = useContext(AppContext);
  const {
    _id,
    adult_price,
    baby_price,
    caution,
    contents,
    images,
    inOrNor,
    itinerary,
    keyWards,
    kids_price,
    maxMember,
    minMember,
    startPoint,
    subTitle,
    title,
    startDate
  } = product;

  const sliderRef = useRef<SLIDER>(null);
  const { count, handleCount, totalPrice } = useBasket({
    adult_price,
    baby_price,
    kids_price
  });
  const [authData, setAuthData] = useState<IAuthInfo>();
  const [sliderIndex, setSlideIndex] = useState(0);
  const { scrollY } = useScroll();
  const { upKey, updateComponent } = useUpdate()
  const [updateKey, setupdateKey] = useState(0);
  const tabOnCheck = tabCheck.bind(tabCheck, scrollY);

  const router = useRouter();

  const { productDelete } = useProductDelete({
    onCompleted: ({
      ProductDelete
    }) => {
      if (ProductDelete.ok) {
        alert("삭제완료");
        router.push("/")
      }
    }
  })

  const toWrite = () => router.push(`/tour/write/${_id}`)

  const handleEdit = () => {
    toWrite();
  }

  const handleDelete = () => {
    productDelete({
      id: _id
    })
  }

  const handleAuth = async () => {
    const authInfo = await getAuth(1000);
    setAuthData(authInfo);
  }

  const handlePay = () => {
    window.jdPayStart();
  }

  const handleSliderMove = (index: number) => () => {
    sliderRef.current?.slickGoTo(index)
    setSlideIndex(index);
  }

  const checkImgOn = (index: number): string => {
    return index === sliderIndex ? "on" : ""
  }

  const handleAddBracket = () => {
    addItem({
      count,
      price: totalPrice,
      name: title,
      _id
    })

    if (count.adult + count.baby + count.kids === 0) {
      toast.info("인원을 먼저 선택 해주세요.");
    } else {
      toast.info("장바구니에 저장 되었습니다.")
    }
  }

  return <div className="edtiorView">
    <div style={{ display: "none" }}>
      <button onClick={handleAuth}>AUTH</button>
      {authData && <NiceElments {...getNiceElementForTest({
        EdiDate: authData.ediDate,
        MID: authData.mid,
        hex: authData.hashString,
      })} />}
      {authData && <button onClick={handlePay}>COM</button>}
    </div>
    <SubTopNav children={
      <>
        <li className="homedeps1">
          <Link href="/tour/">
            <a>Tour</a>
          </Link></li>
        <li className="homedeps2">
          <Link href="/tour/list">
            <a >상품리스트</a>
          </Link>
        </li>
      </>
    } title="Tour" desc="지금 여행을 떠나세요~!~~!!!!!" subTopBg={'/img/work_top_bg2.jpg'} />
    <div className="tour_details_in w1200">

      <div className="Document">
        <div className="Read_box">
          <div className="details_photo">
            <div className="main_photo">
              <Slider ref={sliderRef} >
                {images?.map((img, i) =>
                  <Slide key={i + "sliderImg"} >
                    <img src={img?.uri} alt={img.name} />
                  </Slide>
                )}
              </Slider>
            </div>
            <ul className="photo_list">
              {images?.map((img, i) =>
                <li className={checkImgOn(i)} onClick={handleSliderMove(i)} key={i + "sliderImgSub"}><span><img src={img?.uri} alt={img.name} /></span></li>
              )}
            </ul>
            <div className="details_info_txt">
              <div className="ck-content" dangerouslySetInnerHTML={{ __html: caution }} />
            </div>
          </div>
        </div>
        <div id="viewControl">
          <div className="control_box">
            <div className="box2">
              <table cellSpacing={0} summary="Extra Form" className="option_tb mb10 big_pd">
                <tbody>
                  <tr>
                    <td colSpan={2} className="category bt_no">
                      <span className="pnt">문화/예술</span>
                      <span className="code">상품코드 PINK-0001</span>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="bt_line">
                      <h3 className="maintitle">{title}</h3>
                      <p className="subtitle">{subTitle}</p>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="tag bt_line">
                      <div className="tt">키워드</div>
                      <ul>
                        {keyWards?.map((keyward, i) =>
                          <li key={i + "keyward"}>#{keyward}</li>
                        )}
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <th className="smtitle bt_line">출발일</th>
                    <td className="smtxt bt_line">{dayjs(startDate).format("YYYY.MM.DD")}</td>
                  </tr>
                  <tr>
                    <th className="smtitle bt_line">여행기간</th>
                    <td className="smtxt bt_line">{getRangeString(product)}</td>
                  </tr>
                  <tr>
                    <th className="smtitle bt_line">최소인원</th>
                    <td className="smtxt bt_line">{minMember}명</td>
                  </tr>
                  <tr>
                    <th className="smtitle bt_line">최대인원</th>
                    <td className="smtxt bt_line">{maxMember}명</td>
                  </tr>
                  <tr>
                    <th className="smtitle bt_no">출발장소</th>
                    <td className="smtxt bt_no">{startPoint}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="box">
              <table cellSpacing={0} summary="Extra Form" className="option_tb">
                <tbody>
                  <tr>
                    <th>대인</th>
                    <td>
                      <strong>{autoComma(adult_price)}</strong>원
                  <div className="number_box">
                        <span onClick={handleCount("adult", false)} className="left_btn"><i className="flaticon-substract" /></span>
                        <span className="number">{count.adult}</span>
                        <span onClick={handleCount("adult", true)} className="right_btn"><i className="flaticon-add" /></span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>소인</th>
                    <td>
                      <strong>{autoComma(kids_price)}</strong>원
                  <div className="number_box">
                        <span onClick={handleCount("kids", false)} className="left_btn"><i className="flaticon-substract" /></span>
                        <span className="number">{count.kids}</span>
                        <span onClick={handleCount("kids", true)} className="right_btn"><i className="flaticon-add" /></span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>유아</th>
                    <td>
                      <strong>{autoComma(baby_price)}</strong>원
                  <div className="number_box">
                        <span onClick={handleCount("baby", false)} className="left_btn"><i className="flaticon-substract" /></span>
                        <span className="number">{count.baby}</span>
                        <span onClick={handleCount("baby", true)} className="right_btn"><i className="flaticon-add" /></span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="chash_box">
                <table cellSpacing={0} summary="Extra Form" className="chash_tb">
                  <tbody>
                    <tr>
                      <th>총 금액</th>
                      <td>
                        <strong>{autoComma(totalPrice)}</strong>원
                  </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* btn */}
            <div className="btn_box">
              <div className="links_wrap">
                <div onClick={handleAddBracket} className="link05">
                  <a>
                    장바구니 담기
                  </a>
                </div>
                <div className="link02">
                  <a href="/">
                    예약하기
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* // 본문 출력 // */}
      <div className="boardReadBody">
        <div className="xe_content">
          <div className="con_top_tap">
            <span onClick={handleTab(1)} className={tabOnCheck(1)}><a>여행상세설명</a></span>
            <span onClick={handleTab(2)} className={tabOnCheck(2)}><a>안내 및 참고</a></span>
            <span onClick={handleTab(3)} className={tabOnCheck(3)}><a >포함 및 불포함</a></span>
            <span onClick={handleTab(4)} className={tabOnCheck(4)}><a >문의하기</a></span>
          </div>
          {/* 여행상세설명 */}
          <div className="in_box" id="tap__01">
            <h4>여행일정</h4>
            {itinerary.map((it) => <div key={it._id} >
              <div className="hang">
                <div className="top_day">
                  <h5>{it.title}</h5>
                  <span>{dayjs(it.date).format('YYYY.MM.DD (dd)')}</span>
                </div>
                <div className="tour_list">
                  {it.contents.map((con, index) =>
                    <div className="ck-content" key={index + "con" + it._id} dangerouslySetInnerHTML={{ __html: con }} />
                  )}
                </div>
                {/* <div className="tour_content_img_list">
                  {it.images.map((img, index) => <img key={index} style={{
                    width: "auto",
                    height: "100px",
                    display: "inline-block"
                  }} src={img?.uri} />)}
                </div> */}
              </div>
            </div>
            )}
          </div>
          <div className="in_box" id="tap__02">
            <h4>안내 및 참고</h4>
            <div dangerouslySetInnerHTML={{
              __html: contents
            }} className="text ck-content" />
          </div>
          {/* 포함 및 불포함 */}
          <div className="in_box" id="tap__03">
            <h4>포함 및 불포함 </h4>
            <div dangerouslySetInnerHTML={{
              __html: inOrNor
            }} className="text ck-content" />
          </div>
          <div className="in_box" id="tap__04" >
            <h4>주의사항</h4>
            <div dangerouslySetInnerHTML={{ __html: caution }} className="text" />
          </div>
          <div className="in_box" id="tap__04">
            <h4>문의하기</h4>
            <div className="board_list_mini ln04">
              <div className="thead">
                <div className="th01">No.</div>
                <div className="th02">제목</div>
                <div className="th03">글쓴이</div>
                <div className="th04">날짜</div>
              </div>
              <div className="tbody">
                <ul>
                  <li>
                    <div className="th01">221</div>
                    <div className="th02">궁금한게 있어요 :) <i className="q_ok">답변완료</i></div>
                    <div className="th03">뀨이뀨이</div>
                    <div className="th04">2020.02.02 11:00</div>
                  </li>
                  <li>
                    <div className="th01">221</div>
                    <div className="th02">궁금한게 있어요 :)<i className="q_no">답변중</i></div>
                    <div className="th03">뀨이뀨이</div>
                    <div className="th04">2020.02.02 11:00</div>
                  </li>
                  <li>
                    <div className="th01">221</div>
                    <div className="th02">궁금한게 있어요 :)<i className="q_ok">답변완료</i></div>
                    <div className="th03">뀨이뀨이</div>
                    <div className="th04">2020.02.02 11:00</div>
                  </li>
                  <li>
                    <div className="th01">221</div>
                    <div className="th02">궁금한게 있어요 :)<i className="q_ok">답변완료</i></div>
                    <div className="th03">뀨이뀨이</div>
                    <div className="th04">2020.02.02 11:00</div>
                  </li>
                </ul>
              </div>
              <div className="boardNavigation">
                <div className="float_left">
                  <div className="pagenate_mini">
                    <div className="page_btn first"><i className="jandaicon-arr4-left" /></div>
                    <div className="count"><strong>1</strong> / 10</div>
                    <div className="page_btn end"><i className="jandaicon-arr4-right" /></div>
                  </div>
                </div>
                <div className="float_right">
                  <a href="" className="mini_btn small">고객센터 문의하기</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="boardNavigation">
          <div className="float_left">
          </div>
          {(isManager || isAdmin) && <div className="float_right">
            <button type="submit" onClick={handleEdit} className="btn medium pointcolor">수정</button>
            <button type="submit" onClick={handleDelete} className="btn medium">삭제</button>
          </div>}
        </div>
        <div className="add_list">
          <h4>잇츠가이드 추천여행</h4>{/* 랜덤노출 */}
          <ul className="list_ul line3">
            <li className="list_in">
              <div className="img" onClick={() => { }} style={{ backgroundImage: 'url(/img/sample_01.gif)' }}>상품이미지</div>
              <div className="box">
                <div className="category"><span>문화/예술</span></div>
                <div className="title">더운날 수목원으로 오세요~!!</div>
                <div className="bottom_txt">
                  <div className="subtitle">
                    골목길따가 추억을 걷는 여행
              </div>
                  <div className="tag2">
                    <span>#1박2일</span>
                    <span>#버스투어</span>
                    <span>#서구/중구</span>
                  </div>
                </div>
              </div>
            </li>
            <li className="list_in">
              <div className="img" onClick={() => { }} style={{ backgroundImage: 'url(/img/sample_01.gif)' }}>상품이미지</div>
              <div className="box">
                <div className="category"><span>문화/예술</span></div>
                <div className="title">더운날 수목원으로 오세요~!!</div>
                <div className="bottom_txt">
                  <div className="subtitle">
                    골목길따가 추억을 걷는 여행
              </div>
                  <div className="tag2">
                    <span>#1박2일</span>
                    <span>#버스투어</span>
                    <span>#서구/중구</span>
                  </div>
                </div>
              </div>
            </li>
            <li className="list_in">
              <div className="img" onClick={() => { }} style={{ backgroundImage: 'url(/img/sample_01.gif)' }}>상품이미지</div>
              <div className="box">
                <div className="category"><span>문화/예술</span></div>
                <div className="title">더운날 수목원으로 오세요~!!</div>
                <div className="bottom_txt">
                  <div className="subtitle">
                    골목길따가 추억을 걷는 여행
              </div>
                  <div className="tag2">
                    <span>#1박2일</span>
                    <span>#버스투어</span>
                    <span>#서구/중구</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div >
}

const TourDetailWrap = () => {
  const { query } = useRouter();
  const id = query.id as string;
  const { loading, product } = useProductFindById({
    variables: {
      _id: id
    },
    skip: !id
  });

  if (loading) return null
  if (!product) return <Page404 />

  return <TourDetail product={product} />
}

export default TourDetailWrap;