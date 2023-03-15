import { useState } from "react";

import AuthPage from "./pages/auth/auth";
import ChatsPage from "./pages/chat/chats";

function App() {
  const [user, setUser] = useState();

  if (!user) {
    return <AuthPage onAuth={(user) => setUser(user)} />;
  } else {
    return <ChatsPage user={user} />;
  }
}

export default App;
