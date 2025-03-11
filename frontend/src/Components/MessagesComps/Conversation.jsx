import { useEffect, useState } from "react";

const Conversation = () => {
  const [conversations, setConversations] = useState([]);
  const userId =
    sessionStorage.getItem("userId") || sessionStorage.getItem("companyId"); // Get userId from session storage

  useEffect(() => {
    const fetchConversations = async () => {
      if (!userId) return; // Ensure userId exists before fetching

      try {
        const response = await fetch(
          `http://localhost:3000/api/messages/getconvos/${userId}`
        );
        if (!response.ok) throw new Error("Failed to fetch conversations");

        const data = await response.json();
        setConversations(data); // Store the fetched conversations
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, [userId]); // Run when userId changes

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Your Conversations</h2>
      <ul className="space-y-2">
        {conversations.length > 0 ? (
          conversations.map((convo) => (
            <li
              key={convo._id}
              className="p-5 border rounded cursor-pointer hover:bg-gray-800"
            >
              <p className="font-medium">
                {convo.freelancerName || convo.companyId.companyName}
              </p>
              <p className="text-sm text-gray-100">{convo.lastMessage}</p>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No conversations yet.</p>
        )}
      </ul>
    </div>
  );
};

export default Conversation;
