import { useState } from "react";
import { X } from "lucide-react"; // Importing close icon from lucide-react

const MailBox = ({ applicant, onClose }) => {
  const [email, setEmail] = useState(applicant.email || "");
  const [description, setDescription] = useState("");
  const [isSent, setIsSent] = useState(false); // State to track if the email is sent

  const handleSend = () => {
    // Simulate sending email logic
    setIsSent(true); // Mark email as sent
    setTimeout(() => {
      onClose(); // Close the modal after sending the mail
    }, 2000); // Delay closing the modal for a better user experience
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-black text-white p-7 rounded-xl shadow-lg max-w-4xl w-full relative border border-neutral-700">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-white cursor-pointer"
          onClick={onClose}
        >
          <X size={24} /> {/* Close icon from Lucide-React */}
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-center">Message {applicant.name}</h2>

        {/* Email Input Field */}
        <div className="mb-6">
          <label htmlFor="email" className="block text-base font-semibold mb-2"> {/* Increased size */}
            To:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 border border-neutral-700 bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            disabled
          />
        </div>

        {/* Message Textarea */}
        <textarea
          className="w-full p-4 border border-neutral-700 bg-neutral-800 text-white rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
          rows="6"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Type your message..."
        />

        {/* Send Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSend}
            className="bg-gray-200 text-black px-8 py-3 rounded-md hover:bg-gray-300 cursor-pointer focus:outline-none"
            disabled={isSent} // Disable button after sending
          >
            {isSent ? "Sent Successfully" : "Send"} {/* Change text after sending */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MailBox;
