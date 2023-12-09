'use client';

import useSWR from 'swr';
import { useState } from "react";

export default function UserSearch() {

    const [keyword, setKeyword] = useState('winter');
    const {
        data,
        isLoading,
        error
    } = useSWR(`/api/search/${keyword}`)

    console.log(data);

    return (
        <>
        
        </>
    )
}