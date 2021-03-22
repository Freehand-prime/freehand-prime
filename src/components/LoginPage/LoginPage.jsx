// React
import React, { useState } from "react";

// Custom components
import LoginForm from "../LoginForm/LoginForm";

export default function LoginPage() {
  // State
  const [login, setLogin] = useState(true);

  return (
    <div>
      <LoginForm login={login} setLogin={setLogin} />
    </div>
  );
}
