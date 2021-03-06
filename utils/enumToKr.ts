import { BookingStatus, CategoryType, GENDER, PaymentStatus, PayMethod, ProductStatus, ProductType, QuestionStatus, SettlementStatus, UserRole } from "../types/api";

export const bookingStatus = (status?: BookingStatus | null) => {
    if(status === BookingStatus.CANCEL) return "예약취소" 
    if(status === BookingStatus.COMPLETE) return "예약완료" 
    if(status === BookingStatus.READY) return "예약대기" 
    return "";
}

export const productStatus = (status?: ProductStatus | null) => {
    if(status === ProductStatus.CANCELD) return "취소" 
    if(status === ProductStatus.EXPIRED) return "만료" 
    if(status === ProductStatus.OPEN) return "판매중" 
    if(status === ProductStatus.READY) return "생성요청" 
    if(status === ProductStatus.REFUSED) return "생성거절됨" 
    if(status === ProductStatus.SOLD) return "완판" 
    if(status === ProductStatus.UPDATE_REQ) return "업데이트요청" 
    if(status === ProductStatus.UPDATE_REQ_REFUSED) return "업데이트요청거절" 
    return status || "";
}

export const paymentStatus = (status?:PaymentStatus | null ) => {
    if(status === PaymentStatus.CANCEL) return "취소" 
    if(status === PaymentStatus.COMPLETE) return "완료" 
    if(status === PaymentStatus.READY) return "대기중" 
    return "";
}

export const settlementStatus = (status?:SettlementStatus | null ) => {
    if(status === SettlementStatus.REQUEST) return "요청" 
    if(status === SettlementStatus.COMPLETE) return "완료" 
    if(status === SettlementStatus.READY) return "보류중" 
    if(status === SettlementStatus.ACCEPT) return "승인" 
    if(status === SettlementStatus.CANCELED) return "취소" 
    return "";
}

export const foreginKR = (isForegin:boolean) => {
    return isForegin ?  "외국인" : "내국인"
}

export const confirmKr = (flag:boolean) => {
    return flag ?  "승인" : "미승인"
}

export const questionSatus = (status: QuestionStatus) => {
    if(status === QuestionStatus.COMPLETE) return "답변" 
    if(status === QuestionStatus.READY) return "미답변" 
    return ""
}

export const itemTypeToKr = (type: ProductType) => {
     if(type === ProductType.EXPERIENCE) return "체험" 
     if(type === ProductType.TOUR) return "체험"
     return "" 
}

export const determinedKr = (isDetermined: boolean) => {
    if(isDetermined) return "출발확정" 
    if(!isDetermined) return "미확정"
    return "" 
}


export const categoryToKR = (catType?:CategoryType | null) => {
    if(catType === CategoryType.CUSTOMER_QNA) return "유저QNA"
    if(catType === CategoryType.PORTPOLIO) return "포트폴리오"
    if(catType === CategoryType.QNA) return "QNA"
    if(catType === CategoryType.TOUR) return "투어"
    if(catType === CategoryType.EXPERIENCE) return "체험"
    return ""
}

export const payMethodToKR = (paymethod?:PayMethod) => {
    if(paymethod === PayMethod.BANK) return "무통장입금"
    if(paymethod === PayMethod.NICEPAY_CARD) return "카드결제"
    return ""
}

export const userRoleToKR = (role?:UserRole) => {
    if(role === UserRole.partner) return "일반파트너"
    if(role === UserRole.partnerB) return "비지니스파트너"
    if(role === UserRole.individual) return "개인유저"
    return ""
}

export const genderToKR = (gender?:GENDER | null) => {
    if(gender === GENDER.FEMALE) return "여성"
    if(gender === GENDER.MAIL) return "남성"
    return ""
}