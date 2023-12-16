type AvatarSize = 'small' | 'medium' | 'large' | 'xlarge';

type Props = {
    // 아바타 이미지 url
    image?: string | null
    // 아바타 사이즈 -> 선택적, 기본 값은 large
    size?: AvatarSize;
    // 아바타 하이라이트 여부 -> 선택적, 기본 값은 false
    highlight?: boolean;
};

export default function Avatar({
    image, 
    size = 'large', 
    highlight = false
}: Props) {

    return (
        <div className={getContainerStyle(size, highlight)}>
            <img
                className={`bg-white object-cover rounded-full ${getImageSizeStyle(size).image}`}
                alt='user profile' 
                src={image ?? undefined} 
            />
        </div>
    );
}

function getContainerStyle(size: AvatarSize, highlight: boolean): string {

    const baseStyle = 'rounded-full flex justify-center items-center'
    const highlightStyle = highlight
        ? 'bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300' 
        : '';
    // getImageSizeStyle 함수 호출 -> 아바타 크기에 따른 스타일 가져오기
    const { container } = getImageSizeStyle(size);
    // 기본 스타일, 하이라이트 스타일, 이미지 사이즈 스타일을 조합 -> 최종 컨테이너 스타일 반환 
    return `${baseStyle} ${highlightStyle} ${container}`
}

type ImageSizeStyle = {
    container: string;
    image: string;
}

// 아바타 사이즈에 따른 이미지, 컨테이너 스타일 반환
function getImageSizeStyle(size: AvatarSize): ImageSizeStyle {

    // size 매개변수에 값에 따라 다른 스타일 반환
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