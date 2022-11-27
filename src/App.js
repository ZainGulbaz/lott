import { useState } from "react";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import Header from "./Components/Header/Header";
import Home from "./Views/Home/Home";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  return (
    <div className="AppBody">
      <ChakraProvider>
        <Header setIsConnected={setIsConnected} />
        <Home isConnected={isConnected} />
      </ChakraProvider>
    </div>
  );
}

export default App;
