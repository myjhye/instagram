import { SimplePost } from './../model/post';
import { client, urlFor } from './sanity';

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

export async function getFollowingPostsOf(username: string) {
  return client
    .fetch(
      // 주어진 사용자(username)가 작성한 포스트 & 해당 사용자가 팔로우하는 다른 사용자들의 포스트를 최신 순서로 가져옴 -> sanity query language (groq) 사용
      `*[_type =="post" && author->username == "${username}"
          || author._ref in *[_type == "user" && username == "${username}"].following[]._ref]
          | order(_createdAt desc){
          ${simplePostProjection}
        }`
    )
    // 데이터 매핑하여 반환
    .then(mapPosts);
}

// 상세 다일로그 데이터 가져오기 -> 주어진 post id 기반
export async function getPost(id: string) {
  return client
    .fetch(
      `*[_type == "post" && _id == "${id}"][0]{
      ...,
      "username": author->username,
      "userImage": author->image,
      "image": photo,
      "likes": likes[]->username,
      comments[]{comment, "username": author->username, "image": author->image},
      "id":_id,
      "createdAt":_creatdAt
    }`
    )
    .then((post) => ({ 
      ...post,
      // 포스트 이미지를 image url로 변환 -> urlFor 사용 
      image: urlFor(post.image) 
    }));
}

// 사용자 게시물 가져오기
// username -> 게시물을 가져올 사용자명 (username)
export async function getPostsOf(username: string) {

  // client를 사용해 sanity cms에서 게시물 데이터 가져오기
  return client
    .fetch(
      `*[_type == "post" && author->username == "${username}"]
      | order(_createdAt desc){
        ${simplePostProjection}
      }`
    )
    // 가져온 데이터를 가공하는 함수인 mapPosts를 호출해 반환
    .then(mapPosts);
}

// 사용자가 좋아요 (like)를 누른 게시물 가져오기
// username -> 게시물을 좋아요한 사용자명 (username)
export async function getLikedPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && "${username}" in likes[]->username]
      | order(_createdAt desc){
        ${simplePostProjection}
      }`
    )
    // 가져온 데이터를 가공하는 함수인 mapPosts를 호출해 반환
    .then(mapPosts);
}

// 사용자가 저장한 게시물 가져오기
// username -> 게시물을 저장한 사용자명 (username)
export async function getSavedPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && _id in *[_type=="user" && username=="${username}"].bookmarks[]._ref]
      | order(_createdAt desc){
        ${simplePostProjection}
      }`
    )
    // 가져온 데이터를 가공하는 함수인 mapPosts를 호출해 반환
    .then(mapPosts);
}

// 포스트 데이터를 가공해 이미지 url 변환하기
// posts -> 가공할 포스트 데이터 배열
// 반환 값 -> 이미지 url이 추가된 포스트 데이터 배열 반환
function mapPosts(posts: SimplePost[]) {
  return posts.map((post: SimplePost) => ({
    // 기존 포스트 데이터를 유지한 채 복사
    ...post,
    likes: post.likes ?? [],
    // 이미지 url을 urlFor 함수를 사용해 반환해 추가
    image: urlFor(post.image),
  }));
}


// 포스트 좋아요
export async function likePost(postId: string, userId: string) {

  return client.patch(postId)
    .setIfMissing({likes: []})
    .append('likes', [
      {
        _ref: userId,
        _type: 'reference'
      }
    ])
    .commit({ autoGenerateArrayKeys: true });
}

// 포스트 싫어요
export async function dislikePost(postId: string, userId: string) {
  return client.patch(postId)
    .unset([`likes[_ref=="${userId}"]`])
    .commit();
}