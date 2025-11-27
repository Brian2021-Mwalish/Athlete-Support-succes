import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'athlete' | 'coach' | 'admin';
  is_superuser?: boolean;
  // Add other profile fields as needed
  age?: number;
  sport?: string;
  metrics?: {
    hrv: number;
    sleep: number;
    hydration: number;
    stress: number;
    restingHeartRate: number;
    trainingLoad: number;
  };
  injuryRisk?: number;
  trainingReadiness?: number;
  recoveryScore?: number;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Load user from backend if token exists
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      fetch('http://localhost:8000/api/accounts/me/', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to fetch user');
          }
        })
        .then(userData => {
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
        })
        .catch(error => {
          console.error('Error fetching user:', error);
          // Fallback to localStorage if backend fetch fails
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            try {
              const parsedUser = JSON.parse(storedUser);
              setUser(parsedUser);
            } catch (error) {
              console.error('Error parsing stored user:', error);
              localStorage.removeItem('user');
            }
          }
        });
    }
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  };

  const value: UserContextType = {
    user,
    setUser,
    isAuthenticated: !!user,
    logout,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
