import post from '../../sanity-studio/schemas/post';
import { SimplePost } from './../model/post';
import { assetsURL, client, urlFor } from './sanity';

const simplePostProjection = `
    ...,
    "username": author->username,
    "userImage": author->image,
    "image": photo,
    "likes": likes[]->username,
    "text": comments[0].comment,
    "comments": count(comments),
    "id":_id,
    "createdAt":_createdAt
`;

/*
simplePostProjection
- username : 게시물 작성자의 사용자명
- userImage : 게시물 작성자의 프로필 이미지
- image : 게시물에 첨부된 이미지
- likes : 게시물에 좋아요를 누른 사용자들의 사용자명 목록
- text : 게시물의 첫 번째 댓글
- comments : 게시물에 있는 전체 댓글 수
- id : 게시물의 고유 식별자
- createdAt : 게시물 작성일

** 목적
post 관련 데이터 <캡슐화> -> 코드 재사용
*/



/* 
** getFollowingPostsOf가 가져오는 데이터
1. 로그인한 사용자의 게시물
2. 로그인한 사용자가 팔로우하는 사용자들의 게시물

simplePostProjection
- 로그인한 사용자가 작성한 게시물 정보 & 로그인한 사용자가 팔로우하는 사용자들의 게시물 정보
*/
export async function getFollowingPostsOf(username: string) {
  return client
    .fetch(
      `*[_type =="post" && author->username == "${username}"
          || author._ref in *[_type == "user" && username == "${username}"].following[]._ref]
          | order(_createdAt desc){
          ${simplePostProjection}
        }`
    )
    .then(mapPosts);
}

/*
** getPost가 가져오는 데이터
1. id : 게시물의 고유 식별자
2. username : 게시물 작성자 사용자명
3. userImage : 게시물 작성자의 프로필 이미지 url
4. image : 게시물에 첨부된 이미지 url
5. likes : 게시물에 좋아요를 누른 사용자들의 사용자명 목록
6. comments : 게시물에 작성된 댓글 목록
6-1. comment : 댓글 내용
6-2. username : 댓글 작성자의 사용자명
6-3. image : 댓글 작성자의 프로필 이미지 url
7. createdAt : 게시물 작성일
*/

// 게시물 상세
export async function getPost(id: string) {
  return client
    .fetch(
      `*[_type == "post" && _id == "${id}"][0]{
      ...,
      "username": author->username,
      "userImage": author->image,
      "image": photo,
      "likes": likes[]->username,
      comments[]{
        comment, 
        "username": author->username, 
        "image": author->image,
        "createdAt": createdAt
      },
      "id":_id,
      "createdAt":_creatdAt
    }`
    )
    .then((post) => ({ ...post, image: urlFor(post.image) }));
}

/*
getPostsOf
- 주어진 사용자 (username)가 작성한 게시물을 내림차순으로 정렬

simplePostProjection
- post 관련 데이터 <캡슐화> -> 코드 재사용

mapPosts
- <가져온 post 데이터에 추가 작업> 하고 반환 : likes, image
*/

// 사용자 프로필 페이지의 게시물
export async function getPostsOf(username: string) {
  return client
    .fetch(
      `*[_type=="post" && author->username=="${username}"]
      | order(_createdAt desc){
        ${simplePostProjection}
      }`
    )
    .then(mapPosts);
}


/*
*[_type=="post" && "${username}" in likes[]->username]
- likes 필드에 좋아요를 누른 사용자의 username이 있는지 확인
*/

// 좋아요를 누른 게시물
export async function getLikedPostsOf(username: string) {
  return client
    .fetch(
      `*[_type=="post" && "${username}" in likes[]->username]
      | order(_createdAt desc){
        ${simplePostProjection}
      }`
    )
    .then(mapPosts);
}


/*
*[_type=="post" && _id in *[_type=="user" && username=="${username}"].bookmarks[]._ref]
1. _type=="post"
- post 유형의 문서 필터링
2. *[_type=="user" && username=="${username}"]
- _type=="user" 문서에서 username이 주어진 사용자의 username과 일치하는 지 확인
3. .bookmarks[]._ref
- _type=="user" 문서에서 bookmarks 배열을 _ref으로 가져온다 : 사용자가 북마크한 게시물 찾기
** reference 사용 이유
- <다른 문서 (user)>에서의 필드 값(bookmark) 찾기
4. _id in ...
- 이전 단계에서 얻은 _ref 값을 사용해 게시물의 _id와 일치하는 게시물을 확인 : 사용자가 북마크한 게시물 식별
*/

// 북마크한 게시물
export async function getSavedPostsOf(username: string) {
  return client
    .fetch(
      `*[_type=="post" && _id in *[_type=="user" && username=="${username}"].bookmarks[]._ref]
      | order(_createdAt desc){
        ${simplePostProjection}
      }`
    )
    .then(mapPosts);
}


/* 
mapPosts가 가져오는 데이터
- 각 객체는 SimplePost 타입을 따르며, 다음 필드들을 포함한다

(posts)
- id : 게시물 고유 식별자
- username : 게시물 작성자의 사용자명
- userImage : 게시물 작성자의 이미지 url
- comments : 게시물에 대한 댓글 수 (숫자)
- text : 게시물의 텍스트 내용
- createdAt : 게시물의 작성일

- likes : 게시물에 좋아요를 누른 사용자명 목록 (빈 배열일 수 있음)
- image : 게시물의 이미지 url
*/

function mapPosts(posts: SimplePost[]) {
  return posts.map((post: SimplePost) => ({
    ...post,
    likes: post.likes ?? [],
    image: urlFor(post.image),
  }));
}

/*
2개의 매개변수
1. postId : 좋아요를 추가하려는 게시물의 고유 id
2. userId : 좋아요를 누른 사용자의 고유 id

client
- 데이터베이스와 상호작용

client.patch(postId)
- post 문서 업데이트

.setIfMissing({ likes: [] })
- 해당 게시물에 likes 필드가 없으면 빈 배열로 초기화
- 게시물이 처음으로 좋아요를 받는 경우를 고려한 것 : 좋아요 목록을 담을 like 필드를 만들고 이를 빈 배열로 초기화

.append('likes', [{ _ref: userId, _type: 'reference' }])
- likes 필드에 좋아요 누른 사용자 userId를 reference 타입으로 추가

.commit({ autoGenerateArrayKeys: true })
- 이전 단계에서 설정한 업데이트 내용을 서버에 반영하고 저장
- 새로운 사용자가 좋아요를 누를 때마다 해당 사용자의 정보를 배열에 추가하고 배열 내에서 고유 키를 자동으로 생성 : 이렇게 생성된 키를 사용해 배열 내의 각 항목을 식별
*/

// 게시물 좋아요 추가
export async function likePost(postId: string, userId: string) {
  return client
    .patch(postId) 
    .setIfMissing({ likes: [] })
    .append('likes', [
      {
        _ref: userId,
        _type: 'reference',
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

/*
.unset([`likes[_ref=="${userId}"]`])
- 해당 게시물의 likes 배열에서 userId와 일치하는 사용자 정보를 제거
** _ref
- 한 문서가 다른 문서 참조 또는 연결
- 참조 대상 문서의 고유 id : 이를 통해 두 문서 간의 관계를 설정하거나 다른 문서의 정보를 가져올 수 있음
- 좋아요를 누른 사용자들의 정보 참조 : user 문서의 고유 id 참조 
*/

// 게시물 좋아요 취소
export async function dislikePost(postId: string, userId: string) {
  return client
    .patch(postId)
    .unset([`likes[_ref=="${userId}"]`])
    .commit();
}



/*
.patch(postId)
- post 문서 업데이트export async function getPost(id: string) {
  return client
    .fetch(
      `*[_type == "post" && _id == "${id}"][0]{
      ...,
      "username": author->username,
      "userImage": author->image,
      "image": photo,
      "likes": likes[]->username,
      comments[]{
        comment, 
        "username": author->username, 
        "image": author->image
      },
      "id":_id,
      "createdAt":_creatdAt
    }`
    )
    .then((post) => ({ ...post, image: urlFor(post.image) }));
}

.append('comments', [{ comment, author: { _ref: userId, _type: 'reference' }}])
- 'comments' 필드에 다음 추가
1. comment : 새로운 댓글 내용
2. author : 댓글을 작성한 사용자를 참조하는 reference 설정

.commit({ autoGenerateArrayKeys: true })
- 업데이트 내용을 서버에 반영하고 저장
*/

// 게시물에 댓글 추가
export async function addComment(postId: string, userId: string, comment: string) {

  const timestamp = new Date().toISOString();
  
  return client
    .patch(postId)
    .setIfMissing({ comments: [] })
    .append('comments', [
      {
        comment,
        author: {
          _ref: userId, 
          _type: 'reference'
        },
        createdAt: timestamp,
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}


export async function createPost(userId: string, text: string, file: Blob) {

  return fetch(`https://${process.env.SANITY_PROJECT_ID}.api.sanity.io/v2021-03-25/assets/images/${process.env.SANITY_DATASET}`, {
      method: 'POST',
      headers: {
          'Content-Type': file.type,
          'Authorization': `Bearer ${process.env.SANITY_SECRET_TOKEN}`
      },
      body: file
  })
  .then((res) => res.json())
  .then(result => {
    return client.create({
      _type: 'post',
      author: {
        _ref: userId
      },
      photo: {
        asset: {
          _ref: result.document._id
        }
      },
      comments: [{
        comment: text,
        author: {
          _ref: userId, 
          _type: 'reference'
        },
      }],
      likes: [],
    }, {autoGenerateArrayKeys: true})
  })
}