import { View, Text, TextInput, Pressable, Modal } from 'react-native';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

//  utils
import classNames from '@/utils/classNames';
import { FlatList } from 'react-native';
import Task, { TaskProps } from '@/components/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
	// get the tasks from the local storage
	const [tasks, setTasks] = useState<TaskProps[]>([]);

	// add a task
	const addTask = async () => {
		await AsyncStorage.setItem('tasks', JSON.stringify([...tasks]));
	};

	// get the tasks from the local storage
	const getTasks = async () => {
		const tasks = await AsyncStorage.getItem('tasks');
		if (tasks) {
			setTasks(JSON.parse(tasks));
		}
	};

	// get the task from the local storage
	useEffect(() => {
		getTasks();
	}, []);

	// pomodoro timer
	const [pomodoro, setPomodoro] = useState<number>(0.02);
	const [shortBreak, setShortBreak] = useState<number>(0.02);
	const [longBreak, setLongBreak] = useState<number>(0.05);
	const [currentStatus, setCurrentStatus] = useState<string>('pomodoro');
	const [pomodoroCount, setPomodoroCount] = useState<number>(0);
	const [longBreakAfter, setLongBreakAfter] = useState<number>(2);

	// interval for the timer
	const [intervalId, setIntervalId] = useState<null | NodeJS.Timeout>(null);

	// set time for the timer
	const [time, setTime] = useState<number>(Math.ceil(pomodoro * 60));

	// pomodoro state
	const [isRunning, setIsRunning] = useState<boolean>(false);

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
		setTime(
			Math.ceil(
				(pomoStatus === 'pomodoro'
					? pomodoro
					: pomoStatus === 'shortBreak'
					? shortBreak
					: longBreak) * 60
			)
		);
		setCurrentStatus(pomoStatus);
		pauseTimer();
	};

	// stop the timer if it is completed
	// TODO: work on the notification + change the status after completion
	useEffect(() => {
		if (time === 0) {
			if (intervalId) clearInterval(intervalId);
			setIsRunning(false);
			if (currentStatus === 'pomodoro') {
				setPomodoroCount((prevCount) => {
					if (prevCount + 1 === longBreakAfter) {
						resetTimerAndUpdateStatus('longBreak');
						return 0;
					} else {
						resetTimerAndUpdateStatus('shortBreak');
						return prevCount + 1;
					}
				});
			} else {
				resetTimerAndUpdateStatus('pomodoro');
			}
		}
	}, [time]);

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
			{/* setting for pomodoro */}
			<Pressable
				onPress={() => setIsSettingVisible(!isSettingVisible)}
				className='absolute z-10 p-2 rounded-lg top-8 right-8'
			>
				<Ionicons name='settings' size={20} color='white' />
			</Pressable>

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
									currentStatus == 'shortBreak' && 'bg-gray-500 bg-opacity-50',
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
						<View className='flex flex-row items-center justify-between w-full gap-3 mt-4'>
							{/* start, stop the timer */}
							<Pressable
								onPress={() => {
									setIsRunning(!isRunning);
									if (isRunning) {
										pauseTimer();
									} else {
										startTimer();
									}
								}}
								className={classNames(
									isRunning ? 'bg-yellow-400' : 'bg-green-400',
									'p-2 text-white rounded-lg flex flex-row items-center flex-[3]'
								)}
							>
								<View>
									{isRunning ? (
										<Ionicons name='pause' size={20} color='white' />
									) : (
										<Ionicons name='play' size={20} color='white' />
									)}
								</View>
								<Text className='ml-2 font-semibold text-center text-white'>
									{isRunning ? 'Pause' : 'Start'}
								</Text>
							</Pressable>

							{/* reset the timer */}
							<Pressable
								onPress={() => {
									setIsRunning(false);
									resetTimerAndUpdateStatus(currentStatus);
								}}
								className='flex flex-row items-center p-2 text-white bg-red-500 rounded-lg'
							>
								<View>
									<Ionicons name='stop' size={20} color='white' />
								</View>
								<Text className='ml-2 text-center text-white'>Reset</Text>
							</Pressable>

							{/* skip the current pomodoro */}
							<Pressable className='flex flex-row items-center p-1 text-white rounded-lg'>
								<Ionicons name='play-skip-forward' size={20} color='white' />
							</Pressable>
						</View>
					</View>

					{/* tasks */}
					<View id='task-list' className='w-full mt-8'>
						<Pressable className='p-3 border-2 border-gray-100 border-dashed rounded-lg'>
							<Text className='text-xl font-semibold text-center text-white'>
								+
							</Text>
						</Pressable>
						<View>
							<FlatList
								data={tasks}
								renderItem={({ item }) => <Task data={item} />}
							/>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
}
