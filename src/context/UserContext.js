import React, { createContext, useState, useMemo } from "react";

export const UserContext = createContext();

function UserContextprovider({ children }) {
  const [user, setUser] = useState(null)
  const value = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user, setUser]
  );
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserContextprovider;
