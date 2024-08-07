import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from 'react-dom';
const ResultModal = forwardRef(function ResultModal({ onReset, remaininTime, targetTime }, ref) {
    const dialog = useRef();

    const userLost = remaininTime <= 0;
    const formattedRemainingTime = (remaininTime / 1000).toFixed(2);
    const score = Math.round((1 - remaininTime / (targetTime * 1000)) * 100);

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        }
    });

    return createPortal(
        <dialog ref={dialog} onClose={onReset} className="result-modal">
            {userLost && <h2>You Lost</h2>}
            {!userLost && <h2>Your Score: {score}</h2>}
            <p>The target time was <strong>{targetTime}</strong> seconds.</p>
            <p>You stopped the timer with <strong>{formattedRemainingTime} seconds left.</strong></p>
            <form onSubmit={onReset} method="dialog" action="">
                <button>Close</button>
            </form>
        </dialog>, 
        document.getElementById('modal')
    )
})

export default ResultModal;