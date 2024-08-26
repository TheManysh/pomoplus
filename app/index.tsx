import { View, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function HomePage() {
	const router = useRouter();
	return (
		<SafeAreaView className='bg-blue-200 w-full h-full'>
			<Text>Home Page</Text>
			<Button onPress={() => router.push('/home')} title='Go to app' />
		</SafeAreaView>
	);
}
