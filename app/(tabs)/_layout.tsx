import { Tabs } from 'expo-router';

// tab options should extend the `ScreenOptions` interface

// interface TabsOptions {
// 	name: string;
// 	options: {
// 		headerTitle: string;
// 		title: string;
// 		color: string;
// 	};
// }

// const tabs: TabsOptions[] = [
// 	{
// 		name: 'index',
// 		options: {
// 			headerTitle: 'Home',
// 			title: 'Home',
// 			color: 'red',
// 		},
// 	},
// 	{
// 		name: 'users/index',
// 		options: {
// 			headerTitle: 'User',
// 			title: 'User',
// 			color: 'blue',
// 		},
// 	},
// 	{
// 		name: 'users/[id]',
// 		options: {
// 			headerTitle: 'Profile',
// 			title: 'Profile',
// 			color: 'green',
// 		},
// 	},
// ];

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
