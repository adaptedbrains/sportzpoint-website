import usePostStore from "@/store/postStore"
import { useEffect, useState } from "react"

// import { useCycleItemStore } from "../lib/store/cycle.store"

// const WEBSOCKET_URL = "ws://localhost:8000"
const WEBSOCKET_URL = process.env.WEBSOCKET_URL || "wss://sportzpoint-be.onrender.com"

export const useWebSocket = () => {
  const [socket, setSocket] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const [messages, setMessages] = useState([])
  const [retries, setRetries] = useState(0)
  const { liveBlogFunction } = usePostStore();

  // Function to create and handle a new WebSocket connection
  const createWebSocket = () => {
    const newSocket = new WebSocket(WEBSOCKET_URL)

    newSocket.onopen = () => {
      setIsConnected(true)
      // WebSocket connection established
      setRetries(0) // Reset retries on successful connection
    }

    newSocket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data.toString())
        
        if (message.type === "ADD_LIVEBLOG_UPDATE" && message.data) {
          liveBlogFunction(messages.data);
          // handle live blog updates here
        }
      } catch (error) {
        // Error parsing WebSocket message
      }
    }

    newSocket.onclose = () => {
      setIsConnected(false)
      // WebSocket connection closed
      handleReconnect()  // Handle reconnection on close
    }

    newSocket.onerror = (error) => {
      // WebSocket error
      handleReconnect()  // Handle reconnection on error
    }

    setSocket(newSocket)
  }

  // Retry logic for reconnecting
  const handleReconnect = () => {
    if (retries < MAX_RETRIES) {
      setRetries((prev) => prev + 1)
      // Attempting to reconnect...
      setTimeout(() => {
        createWebSocket()  // Attempt to reconnect
      }, RETRY_DELAY * Math.pow(2, retries))  // Exponential backoff
    } else {
      // Max reconnect attempts reached. Could not establish WebSocket connection.
    }
  }

  // Initialize WebSocket connection on mount
  useEffect(() => {
    createWebSocket()

    return () => {
      if (socket) {
        socket.close()
      }
    }
  }, [retries])  // Reconnect only when retries change

  // Send message if socket is open
  const sendMessage = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message))
    } else {
      // Cannot send message, WebSocket is not open
    }
  }

  return {
    isConnected,
    messages,
    sendMessage,
  }
}
