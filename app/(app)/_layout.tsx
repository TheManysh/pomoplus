import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function AppLayout() {
	return (
		<Tabs>
			<Tabs.Screen
				name='home'
				options={{
					tabBarIcon: ({ color }) => (
						<FontAwesome5 name='home' size={16} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name='timer'
				options={{
					title: 'Timer',
					tabBarIcon: ({ color }) => (
						<FontAwesome5 name='clock' size={16} color={color} />
					),
					headerShown: false,
				}}
			/>
			<Tabs.Screen
				name='discover/index'
				options={{
					title: 'Discover',
					tabBarIcon: ({ color }) => (
						<FontAwesome5 name='globe-asia' size={16} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
