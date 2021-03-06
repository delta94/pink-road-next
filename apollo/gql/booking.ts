import { gql } from "@apollo/client"
import { F_PAGE, F_BOOKING, F_PAYMENT, F_PRODUCT, F_FILE } from "./fragments"


export const F_TRAVELER = gql`
    fragment Ftraveler on Traveler {
      name
      phoneNumber
      gender
      age
    }
`

export const BOOKING_LIST = gql`
  query bookingList(
    $sort: [_BookingSort!]
    $filter: _BookingFilter
    $pageInput: pageInput!
    $productFilter: _ProductFilter
  ) {
  BookingList(
    sort: $sort
    pageInput: $pageInput
    filter: $filter
    productFilter: $productFilter
  ) {
    ok
    error
    page {
      ...Fpage
    }
    data  {
      ...Fbooking
      payment {
        ...Fpayment
      }
      product {
        _id
        createdAt
        updatedAt
        isDelete
        title
        code
        determined
        contents
        category {
            _id
            label
        }
        status
        inOrNor
        info
        caution
        images {
            ...Ffile
        }
        compeltePeopleCnt
        peopleCount
        keyWards
        address
        startPoint
        maxMember
        minMember
        subTitle
        adult_price
        bookingCount
        dateRange
        kids_price
        baby_price
        isNotice
        isOpen
        type
        startDate
        Dday
      }
    }
  }
  }
  ${F_PAYMENT}
  ${F_PAGE}
  ${F_FILE}
  ${F_BOOKING}
`


export const BOOKING_COUNT = gql`
    query bookingCount(
        $filter: _BookingFilter
    ) {
    BookingList(
        pageInput: {
            page: 1,
            cntPerPage: 99999999
        },
        filter: $filter
    ) {
        ok
        error
        data  {
            _id
        }
    }
}
`

export const BOOKING_CANCEL = gql`
  mutation bookingCancel(
    $reason: String!
    $bookingId: String!
  ) {
    BookingCancel(
      reason: $reason
      bookingId:$bookingId
    ) {
    ok
    error
    data {
      ...Fbooking
    }
  }
}
${F_BOOKING}
`

export const BOOKINGS_CREATE = gql`
  mutation bookingsCreate(
    $params: [BookingsCreateInput!]!
    $payMethod: PayMethod!
  ) {
    BookingsCreate(
      payMethod: $payMethod
      params:$params
    ) {
    ok
    error
    data {
      ...Fbooking
    }
  }
}
${F_BOOKING}
`

export const BOOKING_DELETE = gql`
  mutation bookingDelete(
    $id: String!
  ) {
    BookingDelete(
      id:$id
    ) {
    ok
    error 
  }
}
`
export const BOOKING_UPDAET = gql`
  mutation bookingUpdate(
    $params: BookingUpdateInput!
    $id: String!
  ) {
  BookingUpdate(
      params:$params
      _id: $id
    ) {
    ok
    error 
    data {
      _id
    }
  }
}
`
export const BOOKING_FIND_BY_CODE = gql`
  query bookingFindByCode(
    $code: String!
  ) {
    BookingFindByCode(
      code: $code
    ) {
    ok
    error 
    data {
      ...Fbooking
      travelers {
        ...Ftraveler
      }
      product {
        ...Fproduct
      }
      payment {
        ...Fpayment
      }
    }
  }
}
${F_TRAVELER}
${F_BOOKING}
${F_PAYMENT}
${F_PRODUCT}
`

