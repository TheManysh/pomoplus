import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

export default function ImpulsePush() {
	const [count, setCount] = useState(5);
	const [show, setShow] = useState(true);

	// count down from 5 seconds
	useEffect(() => {
		const interval = setInterval(() => {
			setCount((prev) => {
				if (prev - 1 === 1) {
					clearInterval(interval);
					setShow(false);
				}
				return prev - 1;
			});
		}, 1000);
	}, []);

	return (
		<>
			{show && (
				<View
					id='impulse-push'
					className='w-full h-full z-50 inset-0 absolute bg-red-500'
				>
					<View className='w-full h-full flex items-center justify-center'>
						<Text className='text-5xl text-black'>{count}</Text>
					</View>
				</View>
			)}
		</>
	);
}
