import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from 'react';
// ===== Constants =====
const ROLES = { ADMIN: "admin", VOTER: "voter" } as const;
const PAGES = { LOGIN: "login", ADD_CANDIDATE: "add-candidate", CAST_VOTE: "cast-vote" } as const;

// ===== Types =====
export interface User {
  id: string;
  role: typeof ROLES[keyof typeof ROLES];
  name?: string;
}

export interface Candidate {
  id: string;
  name: string;
  address: string;
  mobile: string;
  photo?: string;
}

export interface Election {
  id: string;
  type: string;
  candidates: string[];
  date: string;
  status: "pending" | "active" | "completed";
  votes?: Record<string, number>;
}

interface ElectionContextType {
  user: User | null;
  currentPage: string;
  candidates: Candidate[];
  elections: Election[];
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setCurrentPage: React.Dispatch<
    React.SetStateAction<typeof PAGES[keyof typeof PAGES]>
  >;
  addCandidate: (candidate: Omit<Candidate, "id">) => Promise<void>;
  addElection: (election: Omit<Election, "id" | "status" | "votes">) => Promise<void>;
  castVote: (electionId: string, candidateName: string) => Promise<void>;
  registerUser: (email: string, password: string, name: string) => Promise<boolean>;
}

// ===== Context =====
const ElectionContext = createContext<ElectionContextType | undefined>(undefined);

export const ElectionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<
  typeof PAGES[keyof typeof PAGES]
>(PAGES.LOGIN);

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [elections, setElections] = useState<Election[]>([]);

  // ===== Fetch initial data =====
  useEffect(() => {
    if (user) {
      fetchCandidates();
      fetchElections();
    }
  }, [user]);

  const fetchCandidates = async () => {
    const res = await fetch("http://localhost:5000/api/candidates/getcandidates");
    const data = await res.json();
    setCandidates(data);
  };

  const fetchElections = async () => {
    const res = await fetch("http://localhost:5000/api/elections/getelections");
    const data = await res.json();
    setElections(data);
  };

  // ===== Methods =====
  const login = async (email: string, password: string): Promise<boolean> => {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) return false;
    const data = await res.json();
    setUser({ id: data.id, role: data.role, name: data.name });
    setCurrentPage(
  (data.role as typeof ROLES[keyof typeof ROLES]) === ROLES.ADMIN
    ? PAGES.ADD_CANDIDATE
    : PAGES.CAST_VOTE
);
    return true;
  };

  const logout = () => {
    setUser(null);
    setCurrentPage(PAGES.LOGIN);
  };

  const addCandidate = async (candidateData: Omit<Candidate, "id">) => {
    await fetch("http://localhost:5000/api/candidates/addcandidate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(candidateData),
    });
    fetchCandidates();
  };

  const addElection = async (electionData: Omit<Election, "id" | "status" | "votes">) => {
    await fetch("http://localhost:5000/api/elections/addelection", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(electionData),
    });
    fetchElections();
  };

  const castVote = async (electionId: string, candidateName: string) => {
    await fetch(`http://localhost:5000/api/elections/${electionId}/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ candidateName }),
    });
    fetchElections();
  };

  const registerUser = async (email: string, password: string, name: string): Promise<boolean> => {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });
    return res.ok;
  };

  return (
    <ElectionContext.Provider
      value={{
        user,
        currentPage,
        candidates,
        elections,
        login,
        logout,
        setCurrentPage,
        addCandidate,
        addElection,
        castVote,
        registerUser,
      }}
    >
      {children}
    </ElectionContext.Provider>
  );
};

// ===== Hook =====
export const useElection = () => {
  const context = useContext(ElectionContext);
  if (!context) throw new Error("useElection must be used within ElectionProvider");
  return context;
};
