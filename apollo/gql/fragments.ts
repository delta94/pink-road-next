import { gql } from "@apollo/client";



export const F_PAYMENT = gql`
    fragment Fpayment  on Payment  {
        _id
        createdAt
        updatedAt
        isDelete
        payMethod
        status
        price
        totalCancelPrice
        cancelDate
        isPartialCancel
        groupCode
        history {
            status
            price
            metadata
            createdAt
            updatedAt
        }
    }
`


export const F_CATEGORY = gql`
    fragment Fcategory on Category {
        _id
        createdAt
        updatedAt
        isDelete
        label
        type
    }
`
export const F_FILE = gql`
    fragment Ffile on File {
        name
        uri
        owner
    }
`


export const F_USER = gql`
    fragment Fuser  on User  {
        _id
        nickName
        createdAt
        updatedAt
        isDelete
        email
        manageName
        connectionCount
        role
        brith_date
        address
        address_detail
        acceptSms
        acceptEamil
        is_froreginer
        busi_contact
        manageContact
        resignDate
        gender
        busi_num
        busi_department
        isVerifiedManager
        isVerifiedPhoneNumber
        busiRegistration {
            ...Ffile
        },
        is_priv_corper
        busi_name
        busi_address
        account_number
        name
        bank_name
        resignReason
        isResigned
        phoneNumber
        manageName
        profileImg {
            uri
        }
        busi_department
    }
    ${F_FILE}
`

export const F_BOOKING = gql`
    fragment Fbooking on Booking {
        _id
        createdAt
        cancelDate
        gender
        age
        updatedAt
        isDelete
        adultCount
        kidCount
        babyCount
        totalCount
        message
        bookingPrice
        status
        memo
        code
        groupCode
        product {
            _id
            title
            code
        }
        name
        email
        phoneNumber
        isPaid
    }
`

export const F_PAGE_INFO = gql`
    fragment FpageInfo on PageInfo {
        _id
        updatedAt
        isDelete
        key
        value
    }
`


export const F_PAGE = gql`
    fragment Fpage on Page {
        page
        cntPerPage
        totalPageSize
        start_page_num
        end_page_num
        isPrev
        isNext
        prev_page_num
        next_page_num
        totalCount
        remainder
    }
`



export const F_ITINERARY = gql`
    fragment Fitinerary on Itinerary  {
        _id
        createdAt
        updatedAt
        isDelete
        title
        contents
        images {
            ...Ffile
        }
        date
    }
    ${F_FILE}
`

export const F_PRODUCT = gql`
    fragment Fproduct on Product {
        _id
        createdAt
        updatedAt
        isDelete
        title
        code
        contents
        determined
        dateRange
        adminMemo
        bookerSummary {
            adultCount
            babyCount
            kidsCount
            completePeople
            readyPoeple
            cancelCompletePeople
            cancelPeople
        }
        author {
            ...Fuser
        }
        category {
            _id
            label
        }
        status
        itinerary {
            ...Fitinerary
        }
        inOrNor
        info
        caution
        images {
            ...Ffile
        }
        keyWards
        address
        startPoint
        maxMember
        minMember
        subTitle
        adult_price
        bookingCount
        kids_price
        compeltePeopleCnt
        baby_price
        isNotice
        isOpen
        type
        startDate
        Dday
    }
    ${F_FILE}
    ${F_USER}
    ${F_ITINERARY}
`
