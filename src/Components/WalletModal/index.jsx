import { Dialog } from "@headlessui/react";

export default function WalletModal({ isOpen, closeModal, btnAction }) {
  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      className="fixed inset-0 z-10 overflow-y-auto flex justify-center items-center"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="relative bg-cgray p-6 rounded-2xl  text-gray-400 flex flex-col items-center justify-center mx-auto">
          <Dialog.Title className="text-3xl text-gray-300 font-bold mb-4">
            Welcome to Hero Knights!
          </Dialog.Title>
          <button
            onClick={btnAction}
            className="w-10/12 bg-gradient-to-r from-blue-400 to-green-400 text-white p-2 rounded"
          >
            Connect Wallet To Get Started
          </button>
        </div>
      </div>
    </Dialog>
  );
}
