import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import classNames from '@/utils/classNames';

export interface TaskProps {
	_id: string;
	title: string;
	description: string;
	completedPomodoro: number;
	allotedPomodoro: number;
	startDate: Date;
}

export default function Task({ data }: { data: TaskProps }) {
	const [isCompleted, setIsCompleted] = useState<boolean>(false);
	return (
		<View className='flex flex-row items-center p-3 mt-4 bg-white border-2 border-gray-300 rounded-lg'>
			<Pressable onPress={() => setIsCompleted(!isCompleted)}>
				<Ionicons
					name='checkmark-circle'
					size={28}
					color={isCompleted ? 'red' : 'gray'}
				/>
			</Pressable>
			<Text
				className={classNames(
					isCompleted ? 'line-through line-through-2' : '',
					'font-semibold ml-2'
				)}
			>
				{data.title}
			</Text>
			<View className='flex flex-row items-center ml-auto'>
				<Text className='font-semibold text-gray-500'>
					{data.completedPomodoro} / {data.allotedPomodoro}
				</Text>
			</View>
		</View>
	);
}
