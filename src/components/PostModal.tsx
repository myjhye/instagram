import CloseIcon from "./ui/icons/CloseIncon";

/*
PostModal
- 모달의 외관 및 동작 정의
- 이 모달을 닫는 콜백 함수를 통해 모달을 제어하는 역할
- 이 컴포넌트는 자식 요소(children)를 통해 모달 내용을 받아와 렌더링 하므로, 모달 내용을 커스터마이징하고 재사용할 수 있음

- 닫기 버튼 : 모달 우측 상단에 닫기 버튼 렌더링, 클릭 시 모달 닫기
- 모달 내용 : 모달 내부에 'children'으로 전달된 내용 렌더링. 모달에 표시할 컨텐츠 표시함.

event.target === event.currentTarget
- event.target : 사용자가 클릭한 위치
- event.currentTarget : <section></section>
*/


type Props = {
    children: React.ReactNode;
    onClose: () => void;
}

// 포스트 모달
export default function PostModal({ children, onClose }: Props) {

    return (
        <section
            className="fixed top-0 left-0 flex flex-col justify-center items-center w-full h-full z-50 bg-neutral-900/70"
            // 모달 백드롭 (모달 외부) 클릭 시 모달 닫기 
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