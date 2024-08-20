import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomePage() {
	return (
		<SafeAreaView className='bg-yellow-200 w-full h-full'>
			<Text>Home Page</Text>
		</SafeAreaView>
	);
}
