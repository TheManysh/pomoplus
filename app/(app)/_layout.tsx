import TabBar from '@/components/typography/TabBar';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function AppLayout() {
	return (
		<Tabs tabBar={(props) => <TabBar {...props} />}>
			<Tabs.Screen
				name='home'
				options={{
					title: 'Home',
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
			<Tabs.Screen
				name='profile/index'
				options={{
					title: 'Profile',
					tabBarIcon: ({ color }) => (
						<Ionicons name='person-outline' size={16} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name='discover/[slug]'
				options={{
					title: 'Article',
					href: null,
				}}
			/>
		</Tabs>
	);
}
