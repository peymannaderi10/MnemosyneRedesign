const DeleteConfirmation = ({
    onConfirm,
    onCancel,
    currentQuestion,
    zIndex,
    bringToFront,
  }) => {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center z-50"
        style={{ zIndex }}
        onMouseDown={bringToFront}
      >
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
          <p className="mb-4">Are you sure you want to delete this card?</p>
          <div className="flex justify-end">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
              onClick={() => {
                onConfirm(currentQuestion);
                onCancel();
              }}
            >
              Confirm
            </button>
            <button
              className="bg-gray-300 px-4 py-2 rounded-md"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default DeleteConfirmation;