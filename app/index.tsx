import { View, Text, FlatList, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
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
	const [longBreakAfter, setLongBreakAfter] = useState<number>(4);
	const [isPomodoro, setIsPomodoro] = useState<boolean>(true);
	const [isBreak, setIsBreak] = useState<boolean>(false);
	const [isLongBreak, setIsLongBreak] = useState<boolean>(false);
	// set time time to whichever is active
	const [time, setTime] = useState<number>(
		isPomodoro ? pomodoro * 60 : isBreak ? shortBreak * 60 : longBreak * 60
	);

	// pomodoro state
	const [isRunning, setIsRunning] = useState<boolean>(false);
	const [isPaused, setIsPaused] = useState<boolean>(true);
	const [isFinished, setIsFinished] = useState<boolean>(false);

	// check break status
	const [breakStatus, setBreakStatus] = useState({
		pomodoro: true,
		shortBreak: false,
		longBreak: false,
	});

	// current pomodoro
	const [pomodoroCount, setPomodoroCount] = useState<number>(0);

	// TODO: check the logic
	const startTimer = () => {
		if (isRunning && !isPaused && !isFinished) {
			setInterval(() => {
				setTime((prevTime): number => {
					if (prevTime === 0) {
						setIsRunning(false);
						setIsFinished(true);
						return 0;
					}
					return prevTime - 1;
				});
			}, 1000);
		}
	};

	// let's build the flowchart first
	// 1. enter the pomodoro, short break, long break time, and long break after
	// 2. start the timer
	// 3. when the timer complete, set finished to true
	// 4. start the short break and isShortBreak to true
	// 5. when the short break is complete, set isShortBreak to false
	// 6. start the timer again

	useEffect(() => {
		startTimer();
	}, [isRunning, isPaused, isFinished]);

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
			{/* <View className='absolute z-10 hidden w-64 h-64 p-4 bg-white round-lg'>
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
			</View> */}

			<View className='flex items-center justify-center w-full h-full bg-red-400'>
				<View className='w-[90%] lg:w-1/2 md:w-2/3'>
					<View className='flex items-center justify-center w-full p-3 text-white bg-red-300 rounded-lg'>
						{/* pomodoro states */}
						<View className='flex flex-row items-center justify-between w-full mb-4'>
							{/* Pomodoro */}
							<Pressable
								onPress={() => {
									setBreakStatus({
										pomodoro: true,
										shortBreak: false,
										longBreak: false,
									});
									setTime(pomodoro * 60);
								}}
								className={classNames(
									breakStatus.pomodoro && 'bg-gray-500',
									'w-1/3 p-1.5 flex cursor-pointer items-center justify-center bg-opacity-20 rounded-lg'
								)}
							>
								<Text className='font-semibold text-white opacity-100'>
									Pomodoro
								</Text>
							</Pressable>
							<Pressable
								onPress={() => {
									setBreakStatus({
										shortBreak: true,
										longBreak: false,
										pomodoro: false,
									});
									setTime(shortBreak * 60);
								}}
								className={classNames(
									breakStatus.shortBreak && 'bg-gray-500',
									'w-1/3 p-1.5 flex cursor-pointer items-center justify-center bg-opacity-20 rounded-lg'
								)}
							>
								<Text className='font-semibold text-white'>Short Break</Text>
							</Pressable>
							<Pressable
								onPress={() => {
									setBreakStatus({
										longBreak: true,
										shortBreak: false,
										pomodoro: false,
									});
									setTime(longBreak * 60);
								}}
								className={classNames(
									breakStatus.longBreak && 'bg-gray-500',
									'w-1/3 p-1.5 flex cursor-pointer items-center justify-center bg-opacity-20 rounded-lg'
								)}
							>
								<Text className='font-semibold text-white'>Long Break</Text>
							</Pressable>
						</View>

						{/* timer */}
						<View className='flex items-center justify-center'>
							<Text className='text-center text-white text-8xl'>
								{Math.floor(time / 60)
									.toString()
									.padStart(2, '0') +
									':' +
									(time % 60).toString().padStart(2, '0')}
							</Text>
						</View>

						{/* controls */}
						{/* TODO: Check the logic for controls and fix the UI */}
						<View className='flex flex-row items-center justify-between w-full mt-4'>
							<Pressable
								onPress={() => {
									setIsRunning(!isRunning);
									setIsPaused(!isPaused);
									startTimer();
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
									setIsRunning(!isRunning);
									setIsPaused(!isPaused);
									setBreakStatus({
										pomodoro: true,
										shortBreak: false,
										longBreak: false,
									});
								}}
								className='p-2 ml-2 text-white bg-red-500 rounded-lg '
							>
								<Text className='text-center text-white'>Reset</Text>
							</Pressable>
						</View>
					</View>

					{/* tasks */}
					{/* make this interactive */}
					<View id='task-list' className='w-full mt-8'>
						<View className='p-3 border-4 border-gray-100 border-dashed rounded-lg'>
							<Text className='text-xl font-semibold text-center text-white'>
								+
							</Text>
						</View>
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
											{pomodoroCount}/{item.allottedPomodoro}
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
