import CloseIcon from "./ui/icons/CloseIncon";

type Props = {
    // 자식 요소 (내용)을 받을 react 노드
    children: React.ReactNode;
    // 모달을 닫을 콜백 함수
    onClose: () => void;
}

// 포스트 모달
export default function PostModal({ children, onClose }: Props) {

    return (
        <section
            className="fixed top-0 left-0 flex flex-col justify-center items-center w-full h-full z-50 bg-neutral-900/70" 
            onClick={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <button 
                className="fixed top-0 right-0 p-8 text-white"
                onClick={() => onClose()}
            >
                <CloseIcon />
            </button>
            <div className="bg-white w-4/5 h-3/5 max-w-7xl">
                { children }
            </div>
        </section>
    )
}