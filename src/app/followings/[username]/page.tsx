'use client';

import useSWR from 'swr';
import { FollowingAndFollowers } from '@/model/user';
import FollowingFollowerCard from '@/components/FollowingFollowerCard';

type Props = {
  username: string;
};

export default function FollowingsPage({ username }: Props) {
  
  const { 
      data: following, 
      error 
  } = useSWR<FollowingAndFollowers>(`/api/followings/${username}`);

  console.log(following);

  if (error) {
    return <div>에러 발생: {error.message}</div>;
  }

  if (!following) {
    return <div>Loading...</div>;
  }

  //  map으로 데이터 조회 시 데이터 없는 경우 추가 필요
  return (
    <div className='w-full mb-4'>
        {Array.isArray(following) && following.length > 0 ? (
          following.map((user) => (
            <div key={user.username}>
              <FollowingFollowerCard user={user} />
            </div>
          ))
        ) : (
          <div>팔로잉이 없습니다.</div>
        )}
    </div>
  );
}
