// Import necessary modules
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

interface Props {}

const PomodoroTimer = ({
	pomodoroTime,
	session,
	shortBreakTime,
	longBreakTime,
	longBreakAfter,
}: {
	pomodoroTime: number;
	session: string;
	shortBreakTime: number;
	longBreakTime: number;
	longBreakAfter: number;
}) => {
	// State for the timer
	const [currentTime, setCurrentTime] = useState<number>(pomodoroTime);
	const [secondsLeft, setSecondsLeft] = useState<number>(currentTime * 60);
	const [isActive, setIsActive] = useState<boolean>(false);

	// Set the timer based on the session
	useEffect(() => {
		switch (session) {
			case 'pomodoro':
				setSecondsLeft(currentTime * 60);
				break;
			case 'short-break':
				setSecondsLeft(shortBreakTime);
				break;
			case 'long-break':
				setSecondsLeft(longBreakTime);
				break;
		}
	}, []);

	// Formatting time to display
	const formatTime = (): string => {
		const minutes: number = Math.floor(secondsLeft / 60);
		const seconds: number = secondsLeft % 60;
		return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
	};

	// Start/Stop the timer
	const toggleTimer = (): void => {
		setIsActive(!isActive);
	};

	// Reset the timer
	const resetTimer = (): void => {
		setSecondsLeft(25 * 60);
		setIsActive(false);
	};

	// Effect to handle the timer countdown
	useEffect(() => {
		let interval: NodeJS.Timeout | null = null;
		if (isActive) {
			interval = setInterval(() => {
				setSecondsLeft((secondsLeft) => secondsLeft - 1);
			}, 1000);
		} else if (!isActive && secondsLeft !== 0) {
			clearInterval(interval!);
		}
		return () => {
			if (interval) {
				clearInterval(interval);
			}
		};
	}, [isActive, secondsLeft]);

	// Handle timer end
	useEffect(() => {
		if (secondsLeft === 0) {
			alert('Time for a break!');
			setSecondsLeft(5 * 60); // set break time
		}
	}, [secondsLeft]);

	return (
		<View className='flex-1 justify-center w-full h-full bg-white rounded-lg items-center p-5'>
			<View className='bg-white'>
				<View className='w-full flex items-center justify-center'>
					<Text className='text-5xl mb-8'>{formatTime()}</Text>
				</View>
				<View className='flex flex-row gap-x-4 w-full'>
					<View>
						<Pressable
							className={
								(isActive ? 'bg-red-500' : 'bg-green-500') +
								' px-3 py-2 rounded-lg'
							}
							onPress={toggleTimer}
						>
							<Text className='text-white font-semibold'>
								{!isActive ? 'Start' : 'Pause'}
							</Text>
						</Pressable>
					</View>
					<View>
						<Pressable
							className={'px-3 py-2 rounded-lg bg-blue-500'}
							onPress={resetTimer}
						>
							<Text className='text-white font-semibold'>Reset</Text>
						</Pressable>
					</View>
					<View className='flex items-center justify-center ml-2'>
						<Pressable>
							<FontAwesome6 name='forward-step' size={24} color='black' />
						</Pressable>
					</View>
				</View>
			</View>
		</View>
	);
};

export default PomodoroTimer;
