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

// 사용자 정보 가져오기 -> 팔로우 버튼 컴포넌트 (팔로우 여부에 따라 버튼 ui 변경)
export async function getUserByUsername(username: string) {

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



// 사용자 프로필 정보 가져오기 -> 사용자 프로필 페이지
export async function getUserForProfile(username: string) {
  
  // client를 사용해 sanity cms에서 사용자 정보 검색
  return client
    .fetch(
      `*[_type == "user" && username == "${username}"][0]{
      ...,
      "id":_id,
      "following": count(following),
      "followers": count(followers),
      "posts": count(*[_type=="post" && author->username == "${username}"])
    }
    `
    )
    // 가져온 사용자 정보 가공
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