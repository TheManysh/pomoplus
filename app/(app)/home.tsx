import { View, Text, Modal, Pressable, TextInput } from 'react-native';
import { useState, useRef, useCallback, useMemo } from 'react';
import ContainerizedScrollView from '@/components/typography/ContainerizedScrollView';
import Todo from '@/components/TodoList/Todo';
import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import { ITask } from '@/types/task';
import { Image } from 'expo-image';

import {
	BottomSheetModal,
	BottomSheetView,
	BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

const taskList = [
	{
		title: 'Workout for 30 mins',
		description: 'Do some pushups, situps, and squats',
		tag: 'Exercise',
		time: '8:00 AM',
	},
	{
		title: 'Read a book',
		tag: 'Reading',
		time: '9:00 AM',
		description: 'Read a book for 30 mins',
	},
];

export default function HomePage() {
	// task model
	const [showTaskModal, setShowTaskModal] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null as ITask | null);

	const toggleTaskModal = () => {
		setShowTaskModal((prev) => !prev);
	};

	// bottom sheet
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	// variables
	const snapPoints = useMemo(() => ['25%', '50%'], []);

	// callbacks
	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);
	const handleSheetChanges = useCallback((index: number) => {
		console.log('handleSheetChanges', index);
	}, []);

	return (
		<ContainerizedScrollView>
			{/* Modal */}
			<Modal
				transparent
				visible={showTaskModal}
				onRequestClose={toggleTaskModal}
				animationType='fade'
			>
				<Pressable
					onPress={toggleTaskModal}
					className='absolute inset-0 w-full h-full flex items-center justify-center bg-gray-300 opacity-80'
				></Pressable>
				<View className='flex flex-1 items-center justify-center'>
					<View className='flex relative bg-white w-[90%] lg:w-1/2 h-1/2 rounded-lg'>
						{/* close button */}
						<View className='absolute z-50 top-4 right-4 bg-gray-300 rounded-full'>
							<Pressable onPress={toggleTaskModal} className='p-1 rounded-full'>
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
										<FontAwesome6 name='edit' size={16} color='white' />
									</View>
									<View className='ml-2'>
										<Text className='text-white'>Edit</Text>
									</View>
								</Pressable>
								<Pressable
									onPress={toggleTaskModal}
									className='bg-gray-300 px-4 py-3 rounded-lg'
								>
									<Text>Cancel</Text>
								</Pressable>
								<Pressable className='p-2'>
									<FontAwesome6 name='trash-can' size={20} color='red' />
								</Pressable>
							</View>
						</View>
					</View>
				</View>
			</Modal>
			<View className='mx-3 web:mx-0 h-full'>
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
								toggleTaskModal();
								setSelectedItem(task);
							}}
							className='w-full'
						>
							<Todo isChecked={false} task={task} />
						</Pressable>
					))}
				</View>
				<View className='w-full flex items-center justify-center'>
					<Pressable
						onPress={handlePresentModalPress}
						className='w-full mt-6 flex flex-row items-center justify-center bg-blue-500 p-3 rounded-lg'
					>
						<FontAwesome6 name='add' size={16} color='#fff' />
						<View className='ml-2'>
							<Text className='text-white'>Add a new task</Text>
						</View>
					</Pressable>
				</View>
				{/* bottom sheet */}
				<BottomSheetModal
					ref={bottomSheetModalRef}
					index={1}
					snapPoints={snapPoints}
					onChange={handleSheetChanges}
				>
					<BottomSheetView>
						<ContainerizedScrollView>
							<View className='mx-3'>
								{/* text input with label */}
								<View>
									{/* label */}
									<View className='mb-2'>
										<Text className='font-semibold'>Task Title</Text>
									</View>
									{/* text input */}
									<View className=''>
										<TextInput
											className='border border-gray-300 rounded-lg p-2'
											placeholder=''
										></TextInput>
									</View>
								</View>
							</View>
						</ContainerizedScrollView>
					</BottomSheetView>
				</BottomSheetModal>
			</View>
		</ContainerizedScrollView>
	);
}
