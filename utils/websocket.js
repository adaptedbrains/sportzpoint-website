import usePostStore from "@/store/postStore"
import { useEffect, useState, useCallback } from "react"

// import { useCycleItemStore } from "../lib/store/cycle.store"

// const WEBSOCKET_URL = "ws://localhost:8000"
const WEBSOCKET_URL = process.env.WEBSOCKET_URL || "wss://sportzpoint-be.onrender.com"
const RETRY_DELAY = 1000 // Initial delay in milliseconds
const MAX_RETRIES = 5

export const useWebSocket = () => {
  const [socket, setSocket] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const [retries, setRetries] = useState(0)
  const [connectionStatus, setConnectionStatus] = useState('disconnected')
  const [messages, setMessages] = useState([])
  const { liveBlogFunction } = usePostStore();

  // Function to create and handle a new WebSocket connection
  const createWebSocket = useCallback(() => {
    const newSocket = new WebSocket(WEBSOCKET_URL)
  
    
    newSocket.onopen = () => {
      setIsConnected(true)
      setConnectionStatus('connected')
      setRetries(0) // Reset retries on successful connection
    }

    newSocket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data.toString())
        
        if (message.type === "ADD_LIVEBLOG_UPDATE" && message.data) {
          liveBlogFunction(message.data,'ADD_LIVEBLOG_UPDATE');
        }else if(message.type==='DELETE_LIVEBLOG_UPDATE' && message.data ){
          liveBlogFunction(message.data,'DELETE_LIVEBLOG_UPDATE','EDIT_LIVEBLOG_UPDATE');
        }else if(message.type==='EDIT_LIVEBLOG_UPDATE' && message.data){
          liveBlogFunction(message.data,'EDIT_LIVEBLOG_UPDATE','EDIT_LIVEBLOG_UPDATE');
        }

      } catch (error) {
        // Error parsing WebSocket message
      }
    }

    newSocket.onclose = () => {
      setIsConnected(false)
      setConnectionStatus('disconnected')
      handleReconnect()  // Handle reconnection on close
    }

    newSocket.onerror = (error) => {
      // WebSocket error
      setConnectionStatus('error')
      handleReconnect()  // Handle reconnection on error
    }

    setSocket(newSocket)
  }, [])

  // Retry logic for reconnecting
  const handleReconnect = () => {
    if (retries < MAX_RETRIES) {
      setRetries((prev) => prev + 1)
      setConnectionStatus('reconnecting')
      // Attempting to reconnect...
      setTimeout(() => {
        createWebSocket()  // Attempt to reconnect
      }, RETRY_DELAY * Math.pow(2, retries))  // Exponential backoff
    } else {
      setConnectionStatus('failed')
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
  }, [createWebSocket])  // Reconnect only when retries change

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
    connectionStatus
  }
}
