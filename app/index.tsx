import { View, Text, FlatList, TextInput, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

// package components
import Backdrop from '@/components/shared/Backdrop';

//  utils
import classNames from '@/utils/classNames';

const tasks = [
	{
		id: 1,
		title: 'Task 1',
		description: 'This is task 1',
		allottedPomodoro: 2,
	},
	{
		id: 2,
		title: 'Task 2',
		description: 'This is task 2',
		allottedPomodoro: 4,
	},
];

export default function Home() {
	// pomodoro timer
	const [pomodoro, setPomodoro] = useState<number>(1);
	const [shortBreak, setShortBreak] = useState<number>(5);
	const [longBreak, setLongBreak] = useState<number>(15);
	const [currentStatus, setCurrentStatus] = useState<string>('pomodoro');

	// interval for the timer
	const [intervalId, setIntervalId] = useState<null | NodeJS.Timeout>(null);

	// set time for the timer
	const [time, setTime] = useState<number>(pomodoro * 60);

	// pomodoro state
	const [isRunning, setIsRunning] = useState<boolean>(false);
	const [isPaused, setIsPaused] = useState<boolean>(true);
	const [isFinished, setIsFinished] = useState<boolean>(false);

	// start the timer
	const startTimer = () => {
		const id = setInterval(() => {
			setTime((prevTime) => prevTime - 1);
		}, 1000);
		setIntervalId(id);
	};

	// pause the timer
	const pauseTimer = () => {
		if (intervalId) {
			clearInterval(intervalId);
		}
	};

	// reset the timer
	const resetTimerAndUpdateStatus = (pomoStatus: string) => {
		setIsRunning(false);
		setIsPaused(true);
		setIsFinished(false);
		setTime(
			(pomoStatus === 'pomodoro'
				? pomodoro
				: pomoStatus === 'shortBreak'
				? shortBreak
				: longBreak) * 60
		);
		setCurrentStatus(pomoStatus);
		pauseTimer();
	};

	// show/hide settings
	const [isSettingVisible, setIsSettingVisible] = useState<boolean>(false);

	useEffect(() => {
		return () => {
			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	}, [intervalId]);

	// check the number input
	const testAndSetNumberInput = (text: string, updateState: Function) => {
		let newText = '';
		let numbers = '0123456789';
		for (var i = 0; i < text.length; i++) {
			if (numbers.indexOf(text[i]) > -1) {
				newText = newText + text[i];
				updateState(parseInt(newText));
			}
		}
	};

	return (
		<View className='relative w-full h-full'>
			<Backdrop isVisible={isSettingVisible} />
			{/* setting for pomodoro */}
			<Pressable
				onPress={() => setIsSettingVisible(!isSettingVisible)}
				className='absolute z-10 p-2 bg-gray-300 rounded-lg top-8 right-8'
			>
				<Icon name='cog' size={20} color='white' />
			</Pressable>
			<View
				className={classNames(
					!isSettingVisible && 'hidden',
					'absolute z-50 h-64 p-3 bg-white rounded-lg w-200'
				)}
			>
				{/* TODO: Fix this pressable with z-index */}
				<Pressable
					onPress={() => setIsSettingVisible(!isSettingVisible)}
					className='absolute flex items-center justify-center w-6 h-6 bg-gray-200 rounded-lg z-100 top-4 right-4'
				>
					<Icon name='close' size={16} color='red' />
				</Pressable>
				<Text>Settings</Text>
				<Text>{shortBreak}</Text>
				<View>
					<View className='flex flex-row'>
						<Text>Short Break</Text>
						<TextInput
							inputMode='numeric'
							className='ml-4 border-2 border-gray-400'
							onChangeText={(text) =>
								testAndSetNumberInput(text, setShortBreak)
							}
							defaultValue={shortBreak.toString()}
						/>
					</View>
					<Text>Long Break</Text>
					<Text>Long Break After</Text>
				</View>
			</View>

			<View className='flex items-center justify-center w-full h-full bg-red-400'>
				<View className='w-[90%] lg:w-1/2 md:w-1/2 h-full flex items-center justify-center'>
					<View className='flex items-center justify-between w-full p-3 text-white bg-red-300 rounded-lg h-1/3'>
						{/* pomodoro states */}
						<View className='flex flex-row items-center justify-between w-full mb-4'>
							{/* Pomodoro */}
							<Pressable
								onPress={() => {
									resetTimerAndUpdateStatus('pomodoro');
								}}
								className={classNames(
									currentStatus == 'pomodoro' && 'bg-gray-500',
									'w-1/3 p-1.5 flex cursor-pointer items-center justify-center bg-opacity-20 rounded-lg'
								)}
							>
								<Text className='font-semibold text-white opacity-100'>
									Pomodoro
								</Text>
							</Pressable>
							<Pressable
								onPress={() => {
									resetTimerAndUpdateStatus('shortBreak');
								}}
								className={classNames(
									currentStatus == 'shortBreak' && 'bg-gray-500',
									'w-1/3 p-1.5 flex cursor-pointer items-center justify-center bg-opacity-20 rounded-lg'
								)}
							>
								<Text className='font-semibold text-white'>Short Break</Text>
							</Pressable>
							<Pressable
								onPress={() => {
									resetTimerAndUpdateStatus('longBreak');
								}}
								className={classNames(
									currentStatus == 'longBreak' && 'bg-gray-500',
									'w-1/3 p-1.5 flex cursor-pointer items-center justify-center bg-opacity-20 rounded-lg'
								)}
							>
								<Text className='font-semibold text-white'>Long Break</Text>
							</Pressable>
						</View>

						{/* timer */}
						<View className='flex items-center justify-center'>
							<Text className='text-center text-white text-9xl'>
								{Math.floor(time / 60)
									.toString()
									.padStart(2, '0') +
									':' +
									(time % 60).toString().padStart(2, '0')}
							</Text>
						</View>

						{/* controls */}
						<View className='flex flex-row items-center justify-between w-full mt-4'>
							<Pressable
								onPress={() => {
									setIsRunning(!isRunning);
									setIsPaused(!isPaused);
									if (isRunning) {
										pauseTimer();
									} else {
										startTimer();
									}
								}}
								className={classNames(
									isRunning && 'bg-yellow-500',
									'w-4/5 p-2 text-white  rounded-lg',
									isPaused && 'bg-green-500'
								)}
							>
								<Text className='font-semibold text-center text-white'>
									{isRunning ? 'Pause' : 'Start'}
								</Text>
							</Pressable>
							<Pressable
								onPress={() => {
									setIsRunning(false);
									resetTimerAndUpdateStatus(currentStatus);
								}}
								className='p-2 ml-2 text-white bg-red-500 rounded-lg '
							>
								<Text className='text-center text-white'>Reset</Text>
							</Pressable>
						</View>
					</View>

					{/* tasks */}
					<View id='task-list' className='w-full mt-8'>
						<Pressable className='p-3 border-4 border-gray-100 border-dashed rounded-lg'>
							<Text className='text-xl font-semibold text-center text-white'>
								+
							</Text>
						</Pressable>
						<FlatList
							data={tasks}
							renderItem={({ item }) => (
								<View className='flex flex-row items-center justify-between w-full p-4 mt-4 bg-white border-4 border-white rounded-lg'>
									<View>
										<Text className='font-semibold text-gray-900'>
											{item.title}
										</Text>
									</View>
									<View>
										<Text className='text-gray-500'>
											{1}/{item.allottedPomodoro}
										</Text>
									</View>
								</View>
							)}
							keyExtractor={(item) => item.id.toString()}
						/>
					</View>
				</View>
			</View>
		</View>
	);
}
