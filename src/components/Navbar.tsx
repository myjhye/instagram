'use client'

import Link from "next/link";
import HomeIcon from "./ui/icons/HomeIcon";
import HomeFillIcon from "./ui/icons/HomeFillIcon";
import SearchIcon from "./ui/icons/SearchIcon";
import SearchFillIcon from "./ui/icons/SearchFillIcon";
import NewIcon from "./ui/icons/NewIcon";
import NewFillIcon from "./ui/icons/NewFillIcon";
import { usePathname } from "next/navigation";

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

    return (
        <div>
            <Link href='/'>
                <h1>Instagram</h1>
            </Link>
            <nav>
                <ul>
                    {
                        menu.map((item) => (
                            <li key={item.href}>
                                <Link href={item.href}>
                                    {/* 현재 페이지의 경로가 -> 항목의 경로와 같으면 -> 클릭된 아이콘 표시 -> 아니면 일반 아이콘 표시  */}
                                    {pathName === item.href ? item.clickedIcon : item.icon}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </div>
    )
}