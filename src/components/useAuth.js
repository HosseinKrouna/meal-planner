import { createContext, useContext } from "react";
import { useSession } from "next-auth/react";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
	const { data: session, status } = useSession();

	return (
		<AuthContext.Provider value={{ session, status }}>
			{children}
		</AuthContext.Provider>
	);
}
