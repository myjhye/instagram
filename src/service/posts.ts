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
가져오는 데이터
1. 로그인한 사용자의 게시물
2. 로그인한 사용자가 팔로우하는 사용자들의 게시물
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
    .then((post) => ({ ...post, image: urlFor(post.image) }));
}

export async function getPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && author->username == "${username}"]
      | order(_createdAt desc){
        ${simplePostProjection}
      }`
    )
    .then(mapPosts);
}
export async function getLikedPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && "${username}" in likes[]->username]
      | order(_createdAt desc){
        ${simplePostProjection}
      }`
    )
    .then(mapPosts);
}
export async function getSavedPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && _id in *[_type=="user" && username=="${username}"].bookmarks[]._ref]
      | order(_createdAt desc){
        ${simplePostProjection}
      }`
    )
    .then(mapPosts);
}
function mapPosts(posts: SimplePost[]) {
  return posts.map((post: SimplePost) => ({
    ...post,
    likes: post.likes ?? [],
    image: urlFor(post.image),
  }));
}

export async function likePost(postId: string, userId: string) {
  return client
    .patch(postId) //
    .setIfMissing({ likes: [] })
    .append('likes', [
      {
        _ref: userId,
        _type: 'reference',
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function dislikePost(postId: string, userId: string) {
  return client
    .patch(postId)
    .unset([`likes[_ref=="${userId}"]`])
    .commit();
}

export async function addComment(postId: string, userId: string, comment: string) {
  return client
    .patch(postId) //
    .setIfMissing({ comments: [] })
    .append('comments', [
      {
        comment,
        author: {_ref: userId, _type: 'reference'},
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
      author: {_ref: userId},
      photo: {asset: {_ref: result.document._id}},
      comments: [{
        comment: text,
        author: {
          _ref: userId, 
          _type: 'reference'
        }
      }],
      likes: [],
    }, {autoGenerateArrayKeys: true})
  })
}