import { View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import ContainerizedScrollView from '@/components/typography/ContainerizedScrollView';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import axios from 'axios';

export default function DiscoverPage() {
	const router = useRouter();

	useEffect(() => {
		axios.get('/discover').then((res) => console.log(res));
	}, []);

	return (
		<ContainerizedScrollView>
			<View className='w-full'>
				<View className='mx-3 mt-3'>
					<View className='w-full aspect-video rounded-lg overflow-hidden border border-gray-300'>
						<Image
							source={
								'https://website-cdn.studysmarter.de/sites/2/uk/Pomodoro-Technique2.webp'
							}
							className='w-full h-full'
						/>
					</View>
					<Pressable
						onPress={() => router.push('/discover/the-pomodoro-timer')}
					>
						<Text className='text-xl font-semibold'>The pomodoro method</Text>
					</Pressable>
				</View>
			</View>
		</ContainerizedScrollView>
	);
}
