import { X } from 'lucide-react';

function MessageBanner({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="message-banner">
      <div className="message-content">
        <p>{message}</p>
        <button onClick={onClose} className="close-btn">
          <X size={20} />
        </button>
      </div>
    </div>
  );
}

export default MessageBanner;
