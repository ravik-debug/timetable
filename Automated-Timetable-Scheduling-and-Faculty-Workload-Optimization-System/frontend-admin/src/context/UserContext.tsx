// React hooks for state, context, and lifecycle
import React, { createContext, useContext, useState, useEffect } from 'react';

// Axios is used to make HTTP requests to backend APIs
import axios from 'axios';

/* --------------------------------------------------
   FACULTY INTERFACE
   Defines the structure of a Faculty object
-------------------------------------------------- */
interface Faculty {
    id: number;
    name: string;
    department: string;
    designation: string;
}

/* --------------------------------------------------
   USER CONTEXT TYPE
   Defines what data & functions the context provides
-------------------------------------------------- */
interface UserContextType {
    user: Faculty | null;   // Logged-in faculty details
    loading: boolean;       // API loading state
    logout: () => void;     // Logout function
}

/* --------------------------------------------------
   CREATE CONTEXT
   Initially undefined to enforce proper usage
-------------------------------------------------- */
const UserContext = createContext<UserContextType | undefined>(undefined);

/* --------------------------------------------------
   USER PROVIDER COMPONENT
   Wraps the entire app and provides user data globally
-------------------------------------------------- */
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    // Stores faculty/user details
    const [user, setUser] = useState<Faculty | null>(null);

    // Tracks API loading state
    const [loading, setLoading] = useState(true);

    /* --------------------------------------------------
       FETCH USER DATA WHEN APP LOADS
    -------------------------------------------------- */
    useEffect(() => {

        const fetchUser = async () => {
            try {
                // Try fetching faculty with ID = 1
                const response = await axios.get(
                    'http://localhost:8083/api/faculty/1',
                    { timeout: 3000 }
                );

                // If faculty exists, store it
                if (response.data) {
                    setUser(response.data);
                }

            } catch (error) {
                // If ID 1 does not exist, fallback logic
                console.warn(
                    "Faculty with ID 1 not found. Trying first available faculty..."
                );

                try {
                    // Fetch all faculty records
                    const allResponse = await axios.get(
                        'http://localhost:8083/api/faculty',
                        { timeout: 3000 }
                    );

                    // If at least one faculty exists, use the first one
                    if (allResponse.data && allResponse.data.length > 0) {
                        setUser(allResponse.data[0]);
                    } else {
                        console.error("No faculty found in database");
                    }

                } catch (allError) {
                    // If even fallback fails
                    console.error("Failed to fetch faculty data", allError);
                }

            } finally {
                // Stop loading regardless of success or failure
                setLoading(false);
            }
        };

        // Call the function
        fetchUser();

    }, []); // Runs only once when component mounts

    /* --------------------------------------------------
       LOGOUT FUNCTION
       Clears user data and redirects to home page
    -------------------------------------------------- */
    const logout = () => {
        setUser(null);            // Remove user from state
        window.location.href = '/'; // Redirect to homepage
    };

    /* --------------------------------------------------
       PROVIDE CONTEXT VALUES TO CHILD COMPONENTS
    -------------------------------------------------- */
    return (
        <UserContext.Provider value={{ user, loading, logout }}>
            {children}
        </UserContext.Provider>
    );
};

/* --------------------------------------------------
   CUSTOM HOOK TO USE USER CONTEXT
   Ensures safe access to context
-------------------------------------------------- */
export const useUser = () => {

    const context = useContext(UserContext);

    // If used outside provider, throw error
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }

    return context;
};
