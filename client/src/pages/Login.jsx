import React from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../utils/mutations";
import LoginForm from "../components/LoginForm";
import { useUser } from "../components/UserContext";

function Login() {
  const { setUser } = useUser();
  const [loginUser] = useMutation(LOGIN, {
    onCompleted: (data) => {
      // Store auth token in localStorage
      localStorage.setItem("token", data.login.token);
    },
  });

  // Create handleLogin async function
  const handleLogin = async (email, password) => {
    try {
      const { data } = await loginUser({ variables: { email, password } });
      console.log(data);
      localStorage.setItem("token", data.login.token);
      setUser(data.login.user);
    } catch (err) {
      throw new Error(err.message);
    }
  };

  return (
    <div>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
}

export default Login;
