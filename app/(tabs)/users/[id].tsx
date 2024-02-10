import { useLocalSearchParams } from 'expo-router';
import { View, Image, Text } from 'react-native';

export default function UserPage() {
	const { id } = useLocalSearchParams();
	return (
		<View className='flex items-center py-4'>
			<View className=''>
				<Text className='text-xl font-semibold'>
					{id || 'Manish Shivabhakti'}
				</Text>
			</View>
			<View className='pt-4'>
				<View className='w-32 h-32 overflow-hidden border border-gray-200 rounded-full'>
					<Image
						className='w-32 h-32'
						source={{
							uri: 'https://avatars.githubusercontent.com/u/12028018?v=4',
						}}
					/>
				</View>
			</View>
		</View>
	);
}
