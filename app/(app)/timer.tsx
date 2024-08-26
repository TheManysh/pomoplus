import PomodoroTimer from '@/components/timer/Pomodoro';
import ContainerizedScrollView from '@/components/typography/ContainerizedScrollView';
import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';

export default function TimerPage() {
	// get the timer settings from the memory
	useEffect(() => {}, []);

	// State for the timer settings
	const [pomodoroTime, setPomodoroTime] = useState(25);
	const [shortBreakTime, setShortBreakTime] = useState(5);
	const [longBreakTime, setLongBreakTime] = useState(15);
	const [longBreakAfter, setLongBreakAfter] = useState(2);
	const [currentSession, setCurrentSession] = useState('pomodoro');

	return (
		<ContainerizedScrollView>
			<View className='w-full flex-1 h-full flex items-center justify-center bg-red-500'>
				<PomodoroTimer
					pomodoroTime={pomodoroTime}
					session={currentSession}
					shortBreakTime={shortBreakTime}
					longBreakTime={longBreakTime}
					longBreakAfter={longBreakAfter}
				/>
			</View>
		</ContainerizedScrollView>
	);
}
