import { gql } from "@apollo/client"
import { F_ANSWER } from "./answer"
import { F_FILE, F_PAGE } from "./fragments"


export const F_QUESTION = gql`
    fragment Fquestion  on Question {
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
        status
        answers {
          ...Fanswer
        }
        keyWards
        attachFiles {
            ...Ffile
        }
        thumb {
            ...Ffile
        }
        viewCount
        likeCount
        status
        no
        author {
            _id
            nickName
            email
            phoneNumber
            profileImg {
              uri
            }
        }
    }
    ${F_ANSWER}
    ${F_FILE}
`


export const QUESTION_LIST = gql`
  query questionList(
    $sort: [_QuestionSort!]
    $filter: _QuestionFilter
    $pageInput: pageInput!
  ) {
  QuestionList(
    sort: $sort
    pageInput: $pageInput
    filter: $filter
  ) {
    ok
    error
    page {
      ...Fpage
    }
    data  {
      ...Fquestion,
      product {
        _id
        title
        author {
          _id
          name
          nickName
        }
      }
    }
  }
}
${F_PAGE}
${F_QUESTION}
`

export const QUESTION_CREATE = gql`
  mutation questionCreate(
    $params: QuestionCreateInput!
  ) {
    QuestionCreate(
      params: $params
    ) {
    ok
    error
    data {
      _id
    }
  }
}
`
export const QUESTION_DELETE = gql`
  mutation questionDelete(
    $id: String!
  ) {
    QuestionDelete(
      id:$id
    ) {
    ok
    error 
  }
}
`
export const QUESTION_UPDAET = gql`
  mutation questionUpdate(
    $params: QuestionUpdateInput!
    $id: String!
  ) {
  QuestionUpdate(
      params:$params
      id: $id
    ) {
    ok
    error 
    data {
      _id
    }
  }
}
`


export const QUESTION_FIND_BY_ID = gql`
query questionFindById(
  $id: String!
) {
  QuestionFindById(
    id:$id
  ) {
  ok
  error 
  data {
    ...Fquestion
    author {
      _id
      nickName
      email
      profileImg {
        uri
      }
    }
    product {
      _id
      title
      author {
        _id
        name
        nickName
      }
    }
  }
}
}
${F_QUESTION}
`