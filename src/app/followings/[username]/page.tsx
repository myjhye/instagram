'use client';

import useSWR from 'swr';
import { FollowingAndFollowers } from '@/model/user';

type Props = {
  params: {
    username: string;
  };
};

export default function FollowingsPage({ params: { username } }: Props) {
  
    const { 
        data: following, 
        error 
    } = useSWR<FollowingAndFollowers>(`/api/followings/${username}`);

  if (error) {
    return <div>에러 발생: {error.message}</div>;
  }

  if (!following) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {Array.isArray(following) && following.length > 0 ? (
        following.map((user, index) => (
          <div key={index}>{user.username}</div>
        ))
      ) : (
        <div>팔로잉이 없습니다.</div>
      )}
    </div>
  );
}
