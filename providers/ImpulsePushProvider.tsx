import { createContext, PropsWithChildren, useState } from 'react';

const ImpulseContext = createContext<{
	impulsePush: boolean;
	setImpulsePush: React.Dispatch<React.SetStateAction<boolean>>;
}>({ impulsePush: true, setImpulsePush: () => {} });

export default function ImpulsePushProvider({ children }: PropsWithChildren) {
	// set true or false for the context

	const [impulsePush, setImpulsePush] = useState(true);

	return (
		<ImpulseContext.Provider value={{ impulsePush, setImpulsePush }}>
			{children}
		</ImpulseContext.Provider>
	);
}

export { ImpulseContext };
