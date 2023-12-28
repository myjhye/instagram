'use client'

import Link from "next/link";
import HomeIcon from "./ui/icons/HomeIcon";
import HomeFillIcon from "./ui/icons/HomeFillIcon";
import SearchIcon from "./ui/icons/SearchIcon";
import SearchFillIcon from "./ui/icons/SearchFillIcon";
import NewIcon from "./ui/icons/NewIcon";
import NewFillIcon from "./ui/icons/NewFillIcon";
import { usePathname } from "next/navigation";
import ColorButton from "./ui/ColorButton";
import { useSession, signIn, signOut } from 'next-auth/react';
import Avatar from "./Avatar";

const menu = [
    {
        href: '/',
        icon: <HomeIcon />,
        clickedIcon: <HomeFillIcon />
    },
    {
        href: '/search',
        icon: <SearchIcon />,
        clickedIcon: <SearchFillIcon />
    },
    {
        href: '/new',
        icon: <NewIcon />,
        clickedIcon: <NewFillIcon />
    },
]

export default function Navbar() {

    // 현재 페이지의 경로 가져오기
    const pathName = usePathname();

    // 로그인 여부 확인
    const { data: session } = useSession();
    const user = session?.user;

    return (
        <div className="flex justify-between items-center px-6">
            <Link href='/'>
                <h1 className="text-3xl font-bold">인스타그램</h1>
            </Link>
            <nav>
                <ul className="flex gap-4 items-center p-4">
                    {/* 메뉴 항목들을 매핑하여 렌더링 */}
                    {
                        menu.map((item) => (
                            <li key={item.href}>
                                <Link href={item.href}>
                                    {/* 현재 페이지의 경로가 -> 항목의 경로와 같으면 -> clickedIcon 표시 -> 아니면 icon 표시  */}
                                    {pathName === item.href ? item.clickedIcon : item.icon}
                                </Link>
                            </li>
                        ))
                    }
                    {/* 사용자가 로그인한 경우 -> 사용자의 프로필 아바타 표시 */}
                    {user && (
                        <li>
                            <Link href={`/user/${user.username}` }>
                                <Avatar 
                                    image={user.image}
                                    size='small'
                                    highlight 
                                />
                            </Link>
                        </li>
                    )}
                    {/* 사용자가 로그인한 경우 'sign out' 버튼 , 로그아웃 한 경우 'sign in' 버튼 표시 */}
                    <li>
                        {session ? (
                            <ColorButton text='Sign out' onClick={() => signOut()} />
                            ) : (
                            <ColorButton text='Sign in' onClick={() => signIn()} />
                        )}
                    </li>
                </ul>
            </nav>
        </div>
    )
}