import { Comment, SimplePost } from "@/model/post"
import Image from "next/image";
import PostUserAvatar from "./PostUserAvatar";
import ActionBar from "./ActionBar";
import Avatar from "./Avatar";
import useFullPost from "@/hooks/post";
import useMe from "@/hooks/me";
import { parseDate } from "@/util/date";

/*
** PostDetail 컴포넌트에서 데이터를 서버에서 가져와 화면에 표시되기까지 과정
1. PostDetail 컴포넌트 렌더링. 이 컴포넌트는 SimplePost 객체를 post 프로퍼티로 받음.
2. useFullPost 커스텀 훅 호출 : 이 훅은 post.id를 사용해 해당 게시물에 대한 추가 데이터와 댓글을 가져오는 역할을 함
3. useSWR 라이브러리 사용해 서버에서 데이터 (게시물의 이미지, 작성자 정보, 댓글) 가져옴
const { post: data, isLoading, error, mutate } = useSWR<FullPost>(`/api/posts/${postId}`);
4. 가져온 데이터를 화면에 표시되고, 사용자는 게시물과 관련된 작업을 수행할 수 있음 : ex) 댓글 작성, 좋아요
5. 사용자가 작업을 수행하면, 해당 작업은 서버로 전송되어 데이터를 업데이트함 : ex) 댓글 작성, 좋아요

PostDetail 컴포넌트는 서버에서 데이터를 가져와 화면에 게시물과 관련 정보를 표시하고, 사용자의 상호작용에 따라 서버와 데이터를 동기화
*/

type Props = {
    post: SimplePost;
}

export default function PostDetail({post}: Props) {

    const {
        post: data, 
        postComment
    } = useFullPost(post.id);

    // 로그인한 사용자
    const {
        user: loggedInUser
    } = useMe();

    console.log(data);

    // 포스트 댓글
    const comments = data?.comments;

    const handlePostComment = (comment: Comment) => {
        postComment(comment);
    };

    return (
        <section className="flex w-full h-full">
            <div className="relative basis-3/5">
                <Image
                    className="object-cover"
                    src={post.image}
                    alt={`photo by ${post.username}`}
                    priority
                    fill 
                    sizes='650px'
                />
            </div>
            <div className="w-full basis-2/5 flex flex-col">
                {/* 포스트 작성자 아바타 & 유저명 */}
                <PostUserAvatar 
                    image={post.userImage}
                    username={post.username}
                />
                <ul className="border-t border-gray-200 h-full overflow-y-auto p-4 mb-1">
                    {/* 포스트 댓글 목록 */}
                    {comments && comments.map((comments, index) => (
                        <li 
                            key={index}
                            className="group flex items-center mb-1"
                        >
                            <div className="flex items-center mb-1">
                                {/* 댓글 작성자 아바타 */}
                                <Avatar 
                                    image={comments.image}
                                    size='small'
                                    highlight={comments.username === post.username} 
                                />
                                {/* 댓글 작성자 유저명 & 댓글 내용 */}
                                <div className="ml-2">
                                    <span className="font-bold mr-2">{comments.username}</span>
                                    <span>{comments.comment}</span>
                                </div>
                                {loggedInUser &&  loggedInUser.username === comments.username && (
                                    <button
                                        onClick={() => {}}
                                        className="ml-auto text-red-500 opacity-0 group-hover:opacity-100"
                                    >
                                        삭제
                                    </button>
                                )}
                            </div>
                            <div className="ml-2 text-sm text-gray-500">
                                {parseDate(comments.createdAt)}
                            </div>
                        </li>
                    ))}
                </ul>
                {/* 포스트 좋아요, 작성자, 작성일 */}
                <ActionBar 
                    post={post}
                    onComment={postComment} 
                />
            </div>
        </section>
    )
}