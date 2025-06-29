import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import { useState, useEffect } from "react";
import JoinGame from "./components/JoinGame";
import '../css/App.css'

function App() {
  const API_KEY = "fesubwdmacwe";
  const cookies = new Cookies();
  const token = cookies.get("token");
  const client = StreamChat.getInstance(API_KEY);
  const [isAuth, setIsAuth] = useState(false);

    if (token) {
      client
        .connectUser(
          {
            id: cookies.get("userId"),
            name: cookies.get("username"),
            firstName: cookies.get("firstName"),
            lastName: cookies.get("lastName"),
            hashedPassword: cookies.get("hashedPassword"),
          },
          token
        )
        .then((user) => {
          setIsAuth(true);
        });
    }

  const logOut = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    cookies.remove("channelName");
    cookies.remove("username");
    client.disconnectUser();
    setIsAuth(false);
  };

  return (
    <div className="App">
      {isAuth ? (
        <Chat client={client}>
          <JoinGame></JoinGame>
          <button onClick={logOut}>Log Out</button>
        </Chat>
      ) : (
        <>
          <SignUp setIsAuth={setIsAuth}></SignUp>
          <Login setIsAuth={setIsAuth}></Login>{" "}
        </>
      )}
    </div>
  );
}

export default App;
