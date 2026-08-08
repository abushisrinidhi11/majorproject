import "../styles/confirmDialog.css";

interface ConfirmDialogProps
{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

function ConfirmDialog({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel
}: ConfirmDialogProps)
{
    console.log("Confirm Dialog Rendering");

    if (!isOpen)
    {
        return null;
    }

    return (
        <div
            className="confirmDialogOverlay"
            onClick={onCancel}
        >

            <div
                className="confirmDialogBox"
                onClick={(event) => event.stopPropagation()}
            >

                <h3>{title}</h3>

                <p>{message}</p>

                <div className="confirmDialogButtons">

                    <button
                        type="button"
                        className="confirmYesButton"
                        onClick={onConfirm}
                    >
                        Yes
                    </button>

                    <button
                        type="button"
                        className="confirmNoButton"
                        onClick={onCancel}
                    >
                        No
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ConfirmDialog;
