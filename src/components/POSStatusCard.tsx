
import { useState } from "react";
import { CheckCircle, X, AlertCircle } from "lucide-react";

export const POSStatusCard = () => {
  // Simulate connected/disconnected POS state visually
  const [connected, setConnected] = useState(true);
  const [modal, setModal] = useState(false);

  return (
    <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl px-4 py-2 justify-end relative">
      <span className="text-white/80 font-semibold mr-2 text-sm">POSRocket Lebanon</span>
      <span
        className={`flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
          connected ? "bg-green-600/80 text-white" : "bg-red-600/70 text-white"
        }`}
      >
        {connected ? (
          <>
            <CheckCircle size={16} className="mr-1" />
            Connected
          </>
        ) : (
          <>
            <AlertCircle size={16} className="mr-1" />
            Disconnected
          </>
        )}
      </span>
      <span className="text-xs text-white/50 ml-3">
        {connected ? "Synced 4 mins ago" : "Last sync: 2 days ago"}
      </span>
      <button
        className="ml-4 px-3 py-1.5 rounded bg-accent text-primary text-xs font-semibold hover:bg-accent/90 shadow transition"
        onClick={() => setModal(true)}
      >
        Manage POS Connection
      </button>
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-dark border border-white/20 rounded-xl p-6 min-w-[340px] max-w-xs relative">
            <button
              className="absolute top-2 right-2 text-white/60 hover:text-white"
              onClick={() => setModal(false)}
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-bold mb-1 text-white">POS Connection</h2>
            <div className="text-sm text-white/80 mb-4">
              {connected
                ? "Your POS is successfully connected and syncing. No action needed."
                : "POS sync failed. Last update: 2 days ago. Retry now?"}
            </div>
            {!connected && (
              <button
                className="mt-2 bg-accent text-primary px-4 py-2 rounded font-semibold text-sm"
                onClick={() => {
                  setConnected(true);
                  setModal(false);
                }}
              >
                Retry Sync
              </button>
            )}
            {connected && (
              <button
                className="mt-2 bg-accent/20 text-white px-4 py-2 rounded font-semibold text-sm"
                onClick={() => setModal(false)}
              >
                Close
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
