import ReactDOM from "react-dom";

type Props = {
    children: React.ReactNode;
}

export default function ModalPortal({ children }: Props) {

    // 브라우저 환경에서만 실행 -> 브라우저 환경이 아니면 컴포넌트 렌더링 x
    if (typeof window === 'undefined') {
        return null;
    }

    // id가 portal인 DOM 요소 찾기
    const node = document.getElementById('portal') as Element;

    // ReactDOM.createPortal을 사용해 'children' 요소를 id가 portal인 부분에 렌더링
    return ReactDOM.createPortal(children, node);
}


/*

** children 요소를 id가 portal인 부분(layout)에 렌더링 하는 이유
- 모달 같은 ui 요소를 원하는 위치에 독립적으로 렌더링하기 위해서
1. 모달 재사용성 : 모달은 여러 페이지에서 사용되기에, 레이아웃 컴포넌트 내에서 모달을 정의하고, 모든 페이지에서 레이아웃을 공유하면 같은 모달을 여러 곳에서 재사용 가능.
-> 현 어플리케이션에서는 모달이 home, user page 여러 곳에서 사용됨
2. 레이아웃 분리 : 모달을 다양한 위치와 페이지에서 손쉽게 추가하고 관리

*/