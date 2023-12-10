import UserSearch from "@/components/UserSearch";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: '사용자 검색',
    description: '팔로우할 사용자 검색',
}

export default function SearchPage() {
    return (
        <UserSearch />
    )
}