import { gql } from "@apollo/client";
import { F_PAGE } from "./fragments";

export const MY_BOARD_LIST = gql`
    query myBoardList($pageInput: pageInput!, $filter:_BoardFilter, $sort: [_BoardSort!], $email: String
){
        MyBoardList(
            email: $email
            sort: $sort
            pageInput: $pageInput
            filter: $filter
        ) {
        ok
        error
        page {
            ...Fpage
        }
        data {
            _id
            createdAt
            updatedAt
            isDelete
            title
            contents
            isNotice
            isOpen
            summary
            subTitle
            keyWards
            thumb {
                uri
            }
            viewCount
            likeCount
            slug
            questionStatus
            boardType
        }
       } 
   }
   ${F_PAGE}
`