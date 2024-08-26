import { createRealmContext } from '@realm/react';
import Task from '@/models/Task';

const { RealmProvider } = createRealmContext({
	schema: [Task],
	deleteRealmIfMigrationNeeded: true,
});

export default function RealmProviderWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	return <RealmProvider>{children}</RealmProvider>;
}
