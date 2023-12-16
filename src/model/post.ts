// 댓글
export type Comment = {
    // 댓글 내용
    comment: string;
    // 댓글 작성자
    username: string;
    // 댓글 작성자의 프로필 이미지 url
    image: string;
};

// FullPost에서 comments 필드 제외한 내용 포함
export type SimplePost = Omit<FullPost, 'comments'>;


// 포스트의 전체 정보
export type FullPost = {
    id: string;
    username: string;
    userImage: string;
    image: string;
    text: string;
    createdAt: string;
    likes: string[];
    comments: Comment[];
}