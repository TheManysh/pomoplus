import { View, Text, Modal, Pressable } from 'react-native';
import { useState } from 'react';
import ContainerizedScrollView from '@/components/typography/ContainerizedScrollView';
import Todo from '@/components/TodoList/Todo';
import { Ionicons } from '@expo/vector-icons';
import { ITask } from '@/types/task';
import { Image } from 'expo-image';

const taskList = [
	{
		title: 'Workout for 30 mins',
		tag: 'Exercise',
		time: '8:00 AM',
		description: 'Do some pushups, situps, and squats',
		icon: 'fitness',
	},
	{
		title: 'Read a book',
		tag: 'Reading',
		time: '9:00 AM',
		description: 'Read a book for 30 mins',
		icon: 'yoga',
	},
];

export default function HomePage() {
	const [showModal, setShowModal] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null as ITask | null);

	const toggleModal = () => {
		setShowModal((prev) => !prev);
	};

	return (
		<ContainerizedScrollView>
			{/* Modal */}
			<Modal
				transparent
				visible={showModal}
				onRequestClose={toggleModal}
				animationType='fade'
			>
				<Pressable
					onPress={toggleModal}
					className='absolute inset-0 w-full h-full flex items-center justify-center bg-gray-300 opacity-80'
				></Pressable>
				<View className='flex flex-1 items-center justify-center'>
					<View className='flex relative bg-white w-[90%] lg:w-1/2 h-1/2 rounded-lg'>
						{/* close button */}
						<View className='absolute z-50 top-4 p-1 right-4 bg-gray-300 rounded-full'>
							<Pressable onPress={toggleModal} className=''>
								<Ionicons name='close' size={16} color='black' />
							</Pressable>
						</View>
						<View className='flex p-8 w-full h-full'>
							{/* title and description */}
							<View className='flex-1'>
								{/* title and icon */}
								<View className='flex flex-row items-center'>
									<View className='w-12 h-12 rounded-lg'>
										<Image
											source={require('@/assets/icons/fitness-f.png')}
											contentFit='cover'
											className='w-full h-full'
										/>
									</View>
									<View className='ml-4'>
										<Text className='font-semibold text-2xl'>
											{selectedItem?.title}
										</Text>
									</View>
								</View>
								{/* description */}
								<View className='flex-1'>
									<Text className='mt-6'>{selectedItem?.description}</Text>
								</View>
							</View>
							{/* Actions */}
							<View className='flex flex-row items-center gap-x-3 justify-end'>
								<Pressable className='bg-blue-500 px-4 py-3 rounded-lg flex flex-row items-center justify-center'>
									<View>
										<Ionicons
											name='create-outline'
											size={16}
											color='white'
										></Ionicons>
									</View>
									<View className='ml-2'>
										<Text className='text-white'>Edit</Text>
									</View>
								</Pressable>
								<Pressable
									onPress={toggleModal}
									className='bg-gray-300 px-4 py-3 rounded-lg'
								>
									<Text>Cancel</Text>
								</Pressable>
								<Pressable className='p-2'>
									<Ionicons
										name='trash-outline'
										size={20}
										color='red'
									></Ionicons>
								</Pressable>
							</View>
						</View>
					</View>
				</View>
			</Modal>
			<View className='mx-3 web:mx-0'>
				{/*  */}
				<View className='my-2'>
					<Text className='text-2xl font-semibold'>Todo List</Text>
				</View>
				{/* Todo list */}
				<View className='w-full flex flex-col gap-y-3'>
					{/* Creating a list */}
					{taskList.map((task) => (
						<Pressable
							key={task.title}
							onPress={() => {
								toggleModal();
								setSelectedItem(task);
							}}
							className='w-full'
						>
							<Todo isChecked={false} task={task} />
						</Pressable>
					))}
				</View>
			</View>
		</ContainerizedScrollView>
	);
}
