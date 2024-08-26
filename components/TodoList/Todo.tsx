import { View, Text, Pressable } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ITask } from '@/types/task';
import { Image } from 'expo-image';

export default function Todo({
	isChecked = false,
	task,
}: {
	isChecked: boolean;
	task: ITask;
}) {
	const [checked, setChecked] = useState(isChecked);
	return (
		<View className='rounded-lg p-4 flex flex-row w-full items-center bg-white shadow-lg'>
			{/* image */}
			<View className='w-10 h-10 rounded-lg'>
				<Image
					source={require(`@/assets/icons/fitness-f.png`)}
					contentFit='cover'
					transition={1000}
					className='w-full h-full'
				/>
			</View>

			{/* description */}
			<View className='flex-1 lg:mx-4 ml-3'>
				<View>
					<Text className='font-semibold text-lg'>{task.title}</Text>
				</View>
				{/* time and detail */}
				<View>
					<Text>{task.time}</Text>
				</View>
			</View>
			<View>
				<Pressable
					className={
						'w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center ' +
						(checked ? 'bg-green-500' : 'bg-gray-300')
					}
					onPress={() => setChecked(!checked)}
				>
					{checked && <Ionicons name='checkmark' size={20} color='white' />}
				</Pressable>
			</View>
		</View>
	);
}
