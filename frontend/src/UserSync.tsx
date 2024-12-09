import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import axios from "axios"; 

function UserSignupSync() {
  const { user, isLoaded } = useUser();
  const [userSynced, setUserSynced] = useState(false);

  useEffect(() => {
    async function syncUserToBackend() {
      if (isLoaded && user && !userSynced) {
        try {
          const userData = {
            clerkId: user.id,
            email: user.emailAddresses[0]?.emailAddress,
            firstName: user.firstName,
            lastName: user.lastName,
          };

          const response = await axios.post('/api/users/sync', userData);
          
          if (response.data) {
            setUserSynced(true);
            console.log('User synced successfully');
          }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          if (error.response?.status === 409) {
            console.log('User already exists');
          } else {
            console.error('Failed to sync user', error);
          }
        }
      }
    }

    syncUserToBackend();
  }, [user, isLoaded, userSynced]);

  return null;
}

export default UserSignupSync;