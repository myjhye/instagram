'use client';

import useSWR from 'swr';
import { FollowingAndFollowers, SearchUser } from '@/model/user';
import UserCard from '@/components/UserCard';
import { FormEvent, useState } from 'react';

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

  //  map으로 데이터 조회 시 데이터 없는 경우 추가 필요
  return (
    <div className='w-full mb-4'>
        {Array.isArray(following) && following.length > 0 ? (
          following.map((user, index) => (
            <div key={user.username}>
              <UserCard user={user} />
            </div>
          ))
        ) : (
          <div>팔로잉이 없습니다.</div>
        )}
    </div>
  );
}
