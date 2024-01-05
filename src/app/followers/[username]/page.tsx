'use client';

import useSWR from 'swr';
import { FollowingAndFollowers } from '@/model/user';
import UserCard from '@/components/UserCard';
import { FormEvent, useState } from 'react';

type Props = {
  params: {
    username: string;
  };
};

export default function followerssPage({ params: { username } }: Props) {
  
  const { 
      data: followers, 
      error 
  } = useSWR<FollowingAndFollowers>(`/api/followers/${username}`);

  if (error) {
    return <div>에러 발생: {error.message}</div>;
  }

  if (!followers) {
    return <div>Loading...</div>;
  }

  //  map으로 데이터 조회 시 데이터 없는 경우 추가 필요
  return (
    <div className='w-full mb-4'>
        {Array.isArray(followers) && followers.length > 0 ? (
          followers.map((user) => (
            <div key={user.username}>
              <UserCard user={user} />
            </div>
          ))
        ) : (
          <div>팔로워가 없습니다.</div>
        )}
    </div>
  );
}
