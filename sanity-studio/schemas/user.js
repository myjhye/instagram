export default {
    title: 'User',
    name: 'user',
    type: 'document',
    fields: [
        {
            title: 'Username',
            name: 'username',
            type: 'string'
        },
        {
            title: 'Name',
            name: 'name',
            type: 'string'
        },
        {
            title: 'Email',
            name: 'email',
            type: 'string',
        },
        {
            title: 'Image',
            name: 'image',
            type: 'string',
        },
        {
            title: 'Following',
            name: 'following',
            type: 'array',
            // 배열 요소가 어떤 형식을 가져야 하는지 정의
            of: [
                {
                    // 배열의 각 요소가 -> reference 데이터 유형 -> 배열 요소가 다른 문서를 참조
                    type: 'reference',
                    // reference가 참조하는 데이터 유형은 -> user
                    to: [{ type: 'user' }]
                }
            ],
            // 유효성 검사 -> 중복된 값이 포함되지 않도록
            validation: (Rule) => Rule.unique(),
        },
        {
            title: 'Followers',
            name: 'followers',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'user' }]
                }
            ],
            validation: (Rule) => Rule.unique(),
        },
        {
            title: 'Bookmarks',
            name: 'bookmarks',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'post' }],
                },
            ],
            validation: (Rule) => Rule.unique(),
        },
    ],
    
    preview: {
        select: {
            title: 'name',
            subtitle: 'username',
        },
    },
}