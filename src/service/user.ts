import { SearchUser } from '@/model/user';
import { client } from './sanity';

// OAuthUser 타입 정의 -> 사용자 정보
export type OAuthUser = {
  id: string;
  email: string;
  name: string;
  username: string;
  // 이미지 url 선택적으로 가져오기
  image?: string | null;
};

export async function addUser(user: OAuthUser) {

    // client.createIfNotExists -> 사용자 생성, 이미 존재하면 업데이트
    return client.createIfNotExists({
        _id: user.id,
        // 사용자 유형
        _type: 'user',
        username: user.username,
        email: user.email,
        name: user.name,
        image: user.image,
        following: [],
        followers: [],
        bookmarks: [],
    });
}

/* 
username에 해당하는 사용자 정보 가져오기 -> name, image, id, following, followers, bookmarks

1. 사용자 정보 -> name, image
사용자의 기본 정보 (이름, 이미지 등)

2. 사용자의 고유 식별자 -> id

3. 팔로잉 목록 -> following
사용자가 팔로우하는 다른 사용자의 목록
팔로잉의 username, image

4. 팔로워 목록 -> followers
사용자를 팔로우하는 다른 사용자의 목록
팔로워의 username, image

5. 북마크 목록 -> bookmarks
사용자가 북마크한 게시물
각 북마크 항목의 고유 식별자 (_id)
*/

export async function getUserByUsername(username: string) {

  // client.fetch -> 데이터베이스에 데이터 요청 함수. 데이터베이스에서 정보를 가져와 화면에서 사용하게 함.
  return client.fetch(
    `*[_type == "user" && username == "${username}"][0]{
      ...,
      "id": _id,
      following[]->{username, image},
      followers[]->{username, image},
      "bookmarks": bookmarks[]->_id
    }`
  )
}


// 사용자 검색 -> 사용자 검색 페이지
export async function searchUsers(keyword?: string) {
  
  const query = keyword
    ? `*[_type == "user" && (name match "${keyword}*") || (username match "${keyword}*")]{
      ..., 
      "following": count(following), 
      "followers": count(followers)
    }`
    : `*[_type == "user"]{
      ..., 
      "following": count(following), 
      "followers": count(followers)
    }`;

  // sanity client 사용해 데이터 가져오기
  return client.fetch(query).then((users) =>
    users.map((user: SearchUser) => ({
      ...user,
      following: user.following ?? 0,
      followers: user.followers ?? 0,
    }))
  );
}


/*
** getUserForProfile가 가져오는 데이터
1. id : 사용자의 고유 식별자
2. following : 사용자 팔로잉 수
3. followers : 사용자 팔로워 수
4. posts : 사용자가 게시한 게시물의 수
5. 기타 user 필드 : name, username, image.. (...,)

*[_type == "user" && username == "${username}"][0]
user 데이터베이스에서 (_type == "user") username과 일치하는 username 데이터 가져오기 
*/

// 사용자 프로필
export async function getUserForProfile(username: string) {
  
  return client
    .fetch(
      `*[_type=="user" && username== "${username}"][0]{
      ...,
      "id":_id,
      "following": count(following),
      "followers": count(followers),
      "posts": count(*[_type == "post" && author->username == "${username}"])
    }
    `
    )
    .then((user) => ({
      ...user,
      // 팔로잉 수 가져오기 -> 없으면 기본값 0
      following: user.following ?? 0,
      // 팔로워 수 가져오기 -> 없으면 기본값 0
      followers: user.followers ?? 0,
      // 게시물 수 가져오기 -> 없으면 기본값 0
      posts: user.posts ?? 0,
    }));
}



// 포스트 북마크 등록
export async function addBookmark(userId: string, postId: string) {

  return client
    .patch(userId)
    .setIfMissing({ bookmarks: [] })
    .append('bookmarks', [
      {
        _ref: postId,
        _type: 'reference',
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}


// 포스트 북마크 삭제
export async function removeBookmark(userId: string, postId: string) {

  return client
    .patch(userId)
    .unset([`bookmarks[_ref=="${postId}"]`])
    .commit();
}


export async function follow(myId: string, targetId: string) {

  return client
    .transaction()
    .patch(myId, (user) => 
      user
        .setIfMissing({following: []})
        .append('following', [{_ref: targetId, _type: 'reference'}])
    )
    .patch(targetId, (user) => 
      user
        .setIfMissing({followers: []})
        .append('followers', [{_ref: myId, _type: 'reference'}])
    )
    .commit({ autoGenerateArrayKeys: true });
}


export async function unfollow(myId: string, targetId: string) {

  return client
    .transaction()
    .patch(myId, (user) => user.unset([`following[_ref=="${targetId}"]`]))
    .patch(targetId, (user) => user.unset([`followers[_ref=="${myId}"]`]))
    .commit({ autoGenerateArrayKeys: true });
}


// 팔로잉 목록 가져오기
export async function getFollowingOf(username: string) {
  
  return client.fetch
  (`*[_type == "user" && username == "${username}"][0].following[]->{
    "id":_id,
    "name": name,
    "username": username,
    "image": image,
    "followers": count(followers),
  }`);
}


// 팔로워 목록 가져오기
export async function getFollowerOf(username: string) {
  
  return client.fetch
  (`*[_type == "user" && username == "${username}"][0].followers[]->{
    "id":_id,
    "name": name,
    "username": username,
    "image": image,
    "followers": count(followers),
  }`);
}