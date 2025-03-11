import React, { useState, useEffect, useRef } from 'react';
import 'primeicons/primeicons.css'; // Import PrimeIcons CSS
import './MessagesPage.css'; // Import your custom CSS file

const MessagesPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [isNewConversationModalOpen, setIsNewConversationModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newMessageText, setNewMessageText] = useState('');
  const [clickedMessageId, setClickedMessageId] = useState(null); // Track clicked message
  const messagesEndRef = useRef(null);

  // Fetch users you've messaged
  const fetchUsers = async () => {
    try {
      console.log('Fetching users with search term:', searchTerm);
      const response = await fetch(`http://localhost:5000/api/messages/users?search=${searchTerm}`);
      const data = await response.json();
      console.log('Fetched users:', data);
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Fetch users when searchTerm changes
  useEffect(() => {
    fetchUsers();
  }, [searchTerm]);

  // Fetch messages for the selected user
  useEffect(() => {
    if (selectedUser) {
      const fetchMessages = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/messages/${selectedUser.id}`);
          const data = await response.json();
          setMessages(data);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };

      fetchMessages();
    }
  }, [selectedUser]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Handle user selection
  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    const message = {
      userId: selectedUser.id,
      text: newMessage,
      sender: 'You',
    };

    try {
      const response = await fetch('http://localhost:5000/api/messages/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message),
      });

      if (response.ok) {
        const newMessageData = await response.json();
        setMessages([...messages, newMessageData]);
        setNewMessage('');
        fetchUsers(); // Refresh the user list
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Handle deleting a message
  const handleDeleteMessage = async (messageId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/messages/${messageId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the deleted message from the UI
        setMessages((prevMessages) => prevMessages.filter((message) => message.id !== messageId));
        setClickedMessageId(null); // Reset clicked message
      } else {
        console.error('Failed to delete message');
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  // Handle sending a message to a new user
  const handleSendNewMessage = async () => {
    if (newUserName.trim() === '' || newMessageText.trim() === '') {
      alert('Please enter a name and a message.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/messages/send-to-new-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newUserName,
          text: newMessageText,
          sender: 'You',
        }),
      });

      if (response.ok) {
        const newMessageData = await response.json();
        setMessages([...messages, newMessageData]);
        setNewUserName('');
        setNewMessageText('');
        setIsNewConversationModalOpen(false);
        fetchUsers(); // Refresh the user list
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Handle clicking a message
  const handleMessageClick = (messageId) => {
    setClickedMessageId(messageId === clickedMessageId ? null : messageId); // Toggle clicked message
  };

  return (
    <div className="messages-page-container">
      {/* Sidebar for user list */}
      <div className="messages-sidebar">
        <div className="messages-sidebar-header">
          <h2>
            <i className="pi pi-users" style={{ marginRight: '10px' }} /> {/* PrimeIcons user icon */}
            Users
          </h2>
          <div className="messages-search-bar">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span>
              <i className="pi pi-search" />
            </span>
          </div>
        </div>
        <div className="messages-user-list">
          {users.map((user) => (
            <div
              key={user.id}
              className={`messages-user-item ${selectedUser?.id === user.id ? 'selected' : ''}`}
              onClick={() => handleUserClick(user)}
            >
              <div className="user-avatar">
                {user.name.charAt(0).toUpperCase()} {/* Display first letter of the name */}
              </div>
              <h3>{user.name}</h3>
              <div className="user-status"></div> {/* Optional: User status indicator */}
            </div>
          ))}
        </div>
        {/* Start New Conversation Button */}
        <div className="new-conversation-button-container">
          <button
            className="start-new-conversation-button"
            onClick={() => setIsNewConversationModalOpen(true)}
          >
            Start a new conversation
          </button>
        </div>
      </div>

      {/* Main message area */}
      <div className="messages-main-content">
        {selectedUser ? (
          <>
            <div className="messages-header">
              <h2>
                <i className="pi pi-comments" style={{ marginRight: '10px' }} /> {/* PrimeIcons chat icon */}
                Chat with {selectedUser.name}
              </h2>
            </div>
            <div className="messages-list">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`message ${message.sender === 'You' ? 'sent' : 'received'}`}
                  onClick={() => handleMessageClick(message.id)} // Make message clickable
                >
                  <div className="message-content">
                    <p>{message.text}</p>
                    <span className="message-timestamp">{message.timestamp}</span>
                    {message.sender === 'You' && clickedMessageId === message.id && ( // Show delete button if clicked
                      <button
                        className="delete-message-button"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent message click event
                          handleDeleteMessage(message.id);
                        }}
                      >
                        <i className="pi pi-trash" /> {/* PrimeIcons trash icon */}
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="messages-input-box">
              <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                />
                <button type="submit">Send</button>
              </form>
            </div>
          </>
        ) : (
          <div className="no-user-selected">
            <p>Select a user to start chatting</p>
          </div>
        )}
      </div>

      {/* New Conversation Modal */}
      {isNewConversationModalOpen && (
        <div className="new-conversation-modal">
          <div className="modal-content">
            <h2>Start a New Conversation</h2>
            <input
              type="text"
              placeholder="Enter name"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessageText}
              onChange={(e) => setNewMessageText(e.target.value)}
            />
            <button onClick={handleSendNewMessage}>Send</button>
            <button onClick={() => setIsNewConversationModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesPage;