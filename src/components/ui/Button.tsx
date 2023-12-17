type Props = {
    // 버튼 텍스트
    text: string;
    // 버튼 클릭 시 호출 함수
    onClick: () => void;
    // 버튼 색상을 빨간색으로 설정할 지 여부 (선택적)
    red?: boolean;
}

export default function Button({text, onClick, red}: Props) {

    return (
        // text가 Unfollow일 경우 -> red classname 설정
        <button className={`border-none rounded-md py-3 px-8 text-white font-bold leading-4 ${red ? 'bg-red-500' : 'bg-sky-500'}`}>
            {text}
        </button>
    )
}