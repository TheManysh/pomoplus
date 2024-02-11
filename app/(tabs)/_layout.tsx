import { Tabs } from 'expo-router';

export default function AppLayout() {
	return (
		<Tabs detachInactiveScreens={true}>
			<Tabs.Screen
				name='index'
				options={{ headerTitle: 'Home', title: 'Home' }}
			/>
			<Tabs.Screen
				name='users/index'
				options={{ headerTitle: 'User', title: 'User' }}
			/>
			<Tabs.Screen
				name='users/[id]'
				options={{ headerTitle: 'Profile', title: 'Profile' }}
			/>
		</Tabs>
	);
}
