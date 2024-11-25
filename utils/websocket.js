// const ws = new WebSocket("ws://localhost:8000");


// ws.onopen = () => {
//     console.log("Connected to WebSocket server");
// };

// ws.onmessage = (event) => {
//     const data = JSON.parse(event.data);
//     console.log("Received WebSocket message:", data);
//     handleWebSocketMessage(data); // Update UI based on the event type
// };

// ws.onclose = () => {
//     console.log("WebSocket connection closed");
// };

// ws.onerror = (error) => {
//     console.error("WebSocket error:", error);
// };


import { useEffect, useState } from "react"

// import { useCycleItemStore } from "../lib/store/cycle.store"

const WEBSOCKET_URL = "ws://localhost:8080"

export const useWebSocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [messages, setMessages] = useState([])
//   const { updateStateWithNewItem } = useCycleItemStore()   // gping to be chenage

  useEffect(() => {
    const newSocket = new WebSocket(WEBSOCKET_URL)

    newSocket.onopen = () => {
      setIsConnected(true)
      console.log("WebSocket connection established")
    }

    newSocket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data.toString())
        console.log("mes saj...: ", message)
        if (message.type === "linear" && message.item) {
          setMessages((prevMessages) => [...prevMessages, message.item])
        //   updateStateWithNewItem(message.item)  // need to change here
        }
        console.log("Received message:", message)
      } catch (error) {
        console.error("Error parsing WebSocket message:", error)
      }
    }

    newSocket.onclose = () => {
      setIsConnected(false)
      console.log("WebSocket connection closed")
    }

    newSocket.onerror = (error) => {
      console.error("WebSocket error:", error)
    }

    setSocket(newSocket)

    return () => {
      if (newSocket) {
        newSocket.close()
      }
    }
  }, [])

  const sendMessage = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message))
    } else {
      console.warn("Cannot send message, WebSocket is not open")
    }
  }

  return {
    isConnected,
    messages,
    sendMessage,
  }
}
