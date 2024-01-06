export default {
    // 이름
    title: 'Post',
    // 식별자
    name: 'post',
    // 문서 형태로 정의
    type: 'document',
    // 필드 정의
    fields: [
        {
            // 작성자 -> 'user' 문서 참조
            title: 'Author',
            name: 'author',
            type: 'reference',
            to: [{ type: 'user' }],
        },
        {
            // 첨부 사진
            title: 'Photo',
            name: 'photo',
            type: 'image',
        },
        {
            // 좋아요 -> 'user' 문서 참조
            title: 'Likes',
            name: 'likes',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'user' }],
                },
            ],
            // 중복 값 허용하지 않도록 검증
            validation: (Rule) => Rule.unique(),
        },
        {
            // 댓글 정보
            title: 'Comments',
            name: 'comments',
            type: 'array',
            of: [
                {
                    // 각 댓글은 '작성자', '댓글 내용', '작성 시간'을 포함하는 문서 형태
                    title: 'Comment',
                    name: 'comment',
                    type: 'document',
                    fields: [
                        {
                            // 댓글 작성자 -> 'user' 문서 참조
                            title: 'Author',
                            name: 'author',
                            type: 'reference',
                            to: [{ type: 'user' }]
                        },
                        {
                            // 댓글 내용 -> 문자열 타입
                            title: 'Comment',
                            name: 'comment',
                            type: 'string',
                        },
                        {
                            title: 'Created At',
                            name: 'createdAt',
                            type: 'datetime',
                        }
                    ]
                }
            ]
        }
    ],
    // sanity studio에서 데이터 모델 편집 시 사용할 미리보기 설정
    preview: {
        select: {
            // 첫 번째 댓글 내용
            title: 'comments.0.comment',
            // 게시물 작성자 이름
            authorName: 'author.name',
            // 게시물 작성자 사용자명
            authorUsername: 'author.username',
            // 게시물 사진
            media: 'photo',
        },
        prepare(selection) {
            const { title, authorName, authorUsername, media } = selection;

            return {
                title,
                // 작성자 정보를 -> subtitle로 추가
                subtitle: `by ${authorName} (${authorUsername})`,
                media,
            }
        }
    }
}