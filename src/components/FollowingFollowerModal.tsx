import CloseIcon from "./ui/icons/CloseIcon";

type Props = {
    children: React.ReactNode;
    onClose: () => void;
    title: string; 
}

export default function FollowingFollowerModal({ children, onClose, title }: Props) {

    return (
        <section
            className="fixed inset-0 flex justify-center items-center z-50 bg-neutral-900 bg-opacity-70"
            onClick={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <div className="bg-white rounded-lg shadow-xl w-4/5 h-3/5 max-w-2xl overflow-y-auto relative">
                <div className="flex justify-between items-center p-4 border-b border-gray-300">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <button 
                        className="text-gray-600 hover:text-gray-800"
                        onClick={() => onClose()}
                    >
                        <CloseIcon />
                    </button>
                </div>
                { children }
            </div>
        </section>
    )
}
