import HeartIcon from "./ui/icons/HeartIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import { parseDate } from "@/util/date";
import ToggleButton from "./ui/ToggleButton";
import HeartFilledIcon from "./ui/icons/HeartFilledIcon";
import BookmarkFilledIcon from "./ui/icons/BookmarkFilledIcon";
import { Comment, SimplePost } from "@/model/post";
import usePosts from "@/hooks/posts";
import useMe from "@/hooks/me";
import CommentForm from "./CommentForm";

/*
const handleLike = (like: boolean) => { user && setLike(post, user.username, like) }
* like를 매개변수로 전달하는 이유
- 좋아요 상태 업데이트에 사용
*/

type Props = {
    post: SimplePost;
    children?: React.ReactNode;
    onComment: (comment: Comment) => void;
}

export default function ActionBar({post, children, onComment}: Props) {

    const {user, setBookmark} = useMe();
    const { setLike } = usePosts();
    
    // 현재 사용자가 게시물을 좋아하는 지 확인 : post의 likes 배열에 현재 사용자명이 있는지
    const liked = user ? post.likes.includes(user.username) : false;
    const bookmarked = user?.bookmarks.includes(post.id) ?? false;

    // 게시물 좋아요 추가/제거 핸들러
    const handleLike = (like: boolean) => {
        user && setLike(post, user.username, like);
    };

    const handleBookmark = (bookmark: boolean) => {
        user && setBookmark(post.id, bookmark);
    }

    const handleComment = (comment: string) => {

        user && onComment({
            comment, 
            username: user.username, 
            image: user.image
        });
    }

    /*
        toggle={liked}
        - 현재 사용자가 게시물 좋아하는 상태 나타내는 값
        onToggle={handleLike}
        - 클릭 이벤트 호출 함수
        onIcon={<HeartFilledIcon />}
        - 게시물 좋아하는 상태 아이콘
        offIcon={<HeartIcon />}
        - 게시물 좋아하지 않는 상태 아이콘
    */
    return (
        <>
            <div className="flex justify-between my-2 px-4">
                {/* 좋아요 버튼 */}
                <ToggleButton
                    toggled={liked} 
                    onToggle={handleLike}
                    onIcon={<HeartFilledIcon />}
                    offIcon={<HeartIcon />} 
                />
                <ToggleButton
                    toggled={bookmarked} 
                    onToggle={handleBookmark} 
                    onIcon={<BookmarkFilledIcon />}
                    offIcon={<BookmarkIcon />} 
                />
            </div>
            <div className="px-4 py-1">
                <p className="text-sm font-bold mb-2">{`${post.likes?.length ?? 0} ${post.likes?.length > 1 ? 'likes' : 'like'}`}</p>
                    {children}
                <p className="text-xs text-neutral-500 uppercase my-2">
                    {parseDate(post.createdAt)}
                </p>
            </div>
            {/* 댓글 입력 폼 */}
            <CommentForm onPostComment={handleComment} />
        </>
    )
}