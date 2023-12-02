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