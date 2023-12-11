import HeartIcon from "./ui/icons/HeartIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import { parseDate } from "@/util/date";
import { useState } from "react";
import ToggleButton from "./ui/ToggleButton";
import HeartFilledIcon from "./ui/icons/HeartFilledIcon";
import BookmarkFilledIcon from "./ui/icons/BookmarkFilledIcon";

type Props = {
    likes: string[];
    username: string;
    text?: string;
    createdAt: string;
}

export default function ActionBar({likes, username, text, createdAt}: Props) {

    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);

    return (
        <>
            <div className="flex justify-between my-2 px-4">
                <ToggleButton 
                    toggled={liked} 
                    onToggle={setLiked} 
                    onIcon={<HeartFilledIcon />}
                    offIcon={<HeartIcon />} 
                />
                <ToggleButton
                    toggled={bookmarked} 
                    onToggle={setBookmarked} 
                    onIcon={<BookmarkFilledIcon />}
                    offIcon={<BookmarkIcon />} 
                />
            </div>
            <div className="px-4 py-1">
                <p className="text-sm font-bold mb-2">{`${likes?.length ?? 0} ${likes?.length > 1 ? 'likes' : 'like'}`}</p>
                {
                    text && (
                        <p>
                            <span className="font-bold mr-1">{username}</span>
                            {text}
                        </p>
                    )
                }
                <p className="text-xs text-neutral-500 uppercase my-2">
                    {parseDate(createdAt)}
                </p>
            </div>
        </>
    )
}