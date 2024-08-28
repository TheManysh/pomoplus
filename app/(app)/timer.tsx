import PomodoroTimer from '@/components/timer/Pomodoro';
import ContainerizedScrollView from '@/components/typography/ContainerizedScrollView';
import { View, Text } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { ImpulseContext } from '@/providers/ImpulsePushProvider';
import ImpulsePush from '@/components/impulse-push/ImpulsePush';

export default function TimerPage() {
	// get the timer settings from the memory
	useEffect(() => {}, []);

	const { impulsePush } = useContext(ImpulseContext);

	// State for the timer settings
	const [pomodoroTime, setPomodoroTime] = useState(25);
	const [shortBreakTime, setShortBreakTime] = useState(5);
	const [longBreakTime, setLongBreakTime] = useState(15);
	const [longBreakAfter, setLongBreakAfter] = useState(2);
	const [currentSession, setCurrentSession] = useState('pomodoro');

	// TODO: fix this button error
	return (
		<View className='w-full relative flex-1 h-full flex items-center justify-center'>
			<ContainerizedScrollView>
				<View className='w-full flex-1 h-full flex items-center justify-center'>
					<PomodoroTimer
						pomodoroTime={pomodoroTime}
						session={currentSession}
						shortBreakTime={shortBreakTime}
						longBreakTime={longBreakTime}
						longBreakAfter={longBreakAfter}
					/>
				</View>
			</ContainerizedScrollView>
			<ImpulsePush />
		</View>
	);
}
