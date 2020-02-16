import { useState, useCallback, useEffect } from "react";

const storage = "auth";

const useAuth = () => {
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken);
    setUserId(id);

    localStorage.setItem(
      storage,
      JSON.stringify({ token: jwtToken, userId: id })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);

    localStorage.removeItem(storage);
  }, []);

  useEffect(() => {
    const _data = localStorage.getItem(storage);

    if (_data) {
      const data = JSON.parse(_data);
      login(data.token, data.userId);
    }
    setReady(true);
  }, [login]);

  return { login, logout, token, userId, ready };
};

export default useAuth;
