import { Canvas, useClock, Skia, Path } from '@shopify/react-native-skia';
import { View, Text, Dimensions } from 'react-native';
import { useDerivedValue, useSharedValue } from 'react-native-reanimated';
import { curveBasis, line } from 'd3';

const dimension = Dimensions.get('window');
const WIDTH = dimension.width;
const HEIGHT = dimension.height;
const frequency = 2;
const amplitude = 50;
const speed = 0.1;
const verticalOffset = 100;

export default function Wave() {
	const verticalOffset = useSharedValue(100);
	const amplitude = useSharedValue(50);
	const clock = useClock();

	const createWavePath = (phase = 20) => {
		const points = Array.from({ length: WIDTH }, (_, index) => {
			const angle = (index / WIDTH) * Math.PI * frequency + phase;
			return [index, amplitude.value * Math.sin(angle) + verticalOffset.value];
		});
		const lineGenerator = line().curve(curveBasis);
		// @ts-ignore
		const waveLine = lineGenerator(points);
		const bottomLine = `L${WIDTH},${HEIGHT} L0,${HEIGHT}`;
		console.log(`${waveLine} ${bottomLine} Z`);
		return `${waveLine} ${bottomLine} Z`;
	};

	const animatedPath = useDerivedValue(() => {
		const current = (clock.value / 255) % 255;
		const start = Skia.Path.MakeFromSVGString(createWavePath(current));
		const end = Skia.Path.MakeFromSVGString(createWavePath(Math.PI * current));
		// @ts-ignore
		return start.interpolate(end, 0.5);
	}, [clock, verticalOffset]);

	return (
		<View className='w-full h-full'>
			<Canvas>
				{/* @ts-ignore */}
				<Path path={animatedPath} style={'fill'} color='blue' />
			</Canvas>
		</View>
	);
}
