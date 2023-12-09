import { client } from './sanity';

export type OAuthUser = {
  id: string;
  email: string;
  name: string;
  username: string;
  image?: string | null;
};

export async function addUser(user: OAuthUser) {

    return client.createIfNotExists({
        _id: user.id,
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


export async function searchUsers(keyword?: string) {

  const query = keyword 
    ? `&& (name match "${keyword}") || (username match "${keyword}")`
    : '';

  return client.fetch(
    `*[_type == "user" ${query}]{
      ...,
      "following": count(following),
      "followers": count(followers),
    }
    `
  );
}