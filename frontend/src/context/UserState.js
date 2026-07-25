import { useUser, useClerk } from '@clerk/clerk-react';
import UserContext from "./UserContext";

export const UserState = ({ children }) => {
  const { user: clerkUser, isLoaded, isSignedIn } = useUser();
  const { signOut } = useClerk();

  let user = null;
  if (isSignedIn && clerkUser) {
    user = {
      _id: clerkUser.id,
      name: clerkUser.fullName || clerkUser.firstName || clerkUser.username || "User",
      email: clerkUser.primaryEmailAddress?.emailAddress,
      isAdmin: clerkUser.publicMetadata?.isAdmin || false,
    };
  }

  const loginUser = (userData) => {
    // Handled automatically by Clerk
  };

  const logoutUser = () => {
    signOut();
  };

  return (
    <UserContext.Provider value={{ user, setUser: () => {}, loginUser, logoutUser, isLoaded }}>
      {children}
    </UserContext.Provider>
  );
};
