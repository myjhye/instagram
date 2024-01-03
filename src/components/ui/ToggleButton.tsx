/*
    toggled
    - liked
    - 버튼 현재 상태
    - true (좋아요한 상태) / false (좋아요 하지 않은 상태)

    onToggle
    - handleLike
    - 클릭 이벤트 처리 함수
    - 버튼 상태 변경 (좋아요 -> 좋아요 취소)

    onToggle: (toggled: boolean) => void;
    * (toggled: boolean)
    - toggled (버튼 현재 상태)를 매개변수로 받아 버튼 상태 변경
    * void
    - 어떤 동작을 수행하고 나면 추가적인 동작을 수행하지 않고 종료

    onIcon
    - HeartFilledIcon
    - 버튼이 true 상태일 때 표시

    offIcon
    - HeartIcon
    - 버튼이 false 상태일 때 표시
*/

type Props = {
    toggled: boolean;
    onToggle: (toggled: boolean) => void;
    onIcon: React.ReactNode;
    offIcon: React.ReactNode;
};

// 버튼 클릭 시 버튼 상태 변경
export default function ToggleButton({toggled, onToggle, onIcon, offIcon}: Props) {

    return (
        <button onClick={() => onToggle(!toggled)}>
            {toggled? onIcon: offIcon}
        </button>
    );
}