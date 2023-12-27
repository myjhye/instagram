// 아바타 사이즈
type AvatarSize = 'small' | 'medium' | 'large' | 'xlarge';

// Avatar 컴포넌트의 프로퍼티 정의
type Props = {
    image?: string | null
    size?: AvatarSize;
    highlight?: boolean;
};

export default function Avatar({
    image, 
    size = 'large', 
    highlight = false
}: Props) {

    return (
        /* 
            ** size가 small일 시 
            <div className="rounded-full flex justify-center items-center -> baseStyle
                            bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300 -> highlightStyle
                            w-9 h-9"> -> container
        */ 
        <div className={getContainerStyle(size, highlight)}>
            <img
                className={`bg-white object-cover rounded-full ${getImageSizeStyle(size).image}`}
                alt='user profile' 
                src={image ?? undefined} 
            />
        </div>
    );
}

// <아바타 컨테이너 스타일> 계산
function getContainerStyle(size: AvatarSize, highlight: boolean): string {

    const baseStyle = 'rounded-full flex justify-center items-center'
    const highlightStyle = highlight
        ? 'bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300' 
        : '';
    const { container } = getImageSizeStyle(size);

    return `${baseStyle} ${highlightStyle} ${container}`
}

// 아바타 사이즈에 따른 <이미지>와 <컨테이너 스타일> 표시
type ImageSizeStyle = {
    container: string;
    image: string;
}

// 아바타 사이즈에 따른 <이미지>와 <컨테이너 스타일> 반환
function getImageSizeStyle(size: AvatarSize): ImageSizeStyle {

    switch(size) {
        case 'small' : 
            return { container: 'w-9 h-9', image: 'w-[34px] h-[34px] p-[0.1rem]'};
        case 'medium' : 
            return { container: 'w-11 h-11', image: 'w-[42px] h-[42px] p-[0.1rem]'};
        case 'large' : 
            return { container: 'w-[68px] h-[68px]', image: 'w-16 h-16 p-[0.2rem]'};
        case 'xlarge' : 
            return { container: 'w-[142px] h-[142px]', image: 'w-[138px] h-[138px] p-[0.3rem]'};
        default :
            throw new Error(`해당 타입 사이즈를 지원하지 않음: ${size}`);
    }
}



/*

Avatar 컴포넌트
- image, size, highlight 프로퍼티를 받아 렌더링
- 사용자 프로필 사진
- 사이즈와 하이라이트 기능 커스터마이즈

1. AvatarSize 타입
- 아바타 사이즈 나타내는 문자열 리터럴 타입
- 가능한 사이즈 : small, medium, large, xlarge

2. Props 타입
- Avatar 컴포넌트의 프로퍼티 정의
- image : 아바타 이미지 url을 나타내는 문자열 또는 null
- size : 아바타 크기를 선택적으로 지정. 기본 값은 large.
- highlight : 아바타를 하이라이트할지 여부 선택적으로 지정. 기본 값은 false.

3. getContainerStyle 함수
- 아바타 컨테이너 스타일 계산
- baseStyle : 모든 사이즈의 아바타에 적용되는 기본 스타일
- highlightStyle : 하이라트가 활성화되면 아바타에 적용되는 스타일
- getImageSizeStyle : 아바타 이미지의 사이즈 스타일을 가져와 컨테이너 스타일을 계산

4. getImageSizeStyle 함수
- 아바타 사이즈에 따른 이미지와 컨테이너 스타일 반환
- size 매개변수를 기반으로 다양한 사이즈에 대한 스타일 반환
- 지원하지 않는 사이즈가 입력된 경우 예외를 throw

*/



// function getContainerSize(size: AvatarSize): string {

//     switch(size) {
//         case 'small' : return 'w-9 h-9';
//         case 'medium' : return 'w-11 h-11';
//         case 'large' : return 'w-[68px] h-[68px]';
//         case 'xlarge' : return 'w-[142px] h-[142px]';
//         default : throw new Error(`해당 타입 사이즈를 지원하지 않음: ${size}`);
//     }
// }



// function getImageSizeStyle(size: AvatarSize): string {

//     switch(size) {
//         case 'small' : return 'w-[34px] h-[34px] p-[0.1rem]';
//         case 'medium' : return 'w-[42px] h-[42px] p-[0.1rem]';
//         case 'large' : return 'w-16 h-16 p-[0.2rem]';
//         case 'xlarge' : return 'w-[138px] h-[138px] p-[0.3rem]';
//         default : throw new Error(`해당 타입 사이즈를 지원하지 않음: ${size}`);
//     }
// }