type Props = {
    // 버튼에 표시할 텍스트
    text: string;
    // 버튼 클릭 시 실행하는 함수
    onClick: () => void;
    // size를 optional하게 변경
    size?: 'small' | 'big'; 
};

export default function ColorButton({ text, onClick, size = 'small' }: Props) {
    return (
        <div
            className={`rounded-md bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300 
            ${size === 'big' ? 'p-[0.3rem]' : 'p-[0.15rem]'}`}
        >
            <button
                className={`rounded bg-white transition-opacity hover:opacity-90 
                ${size === 'big' ? 'p-4 text-2xl' : 'p-[0.3rem] text-base'}`}
                onClick={onClick}
            >
                {text}
            </button>
        </div>
    );
}