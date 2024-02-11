import classNames from '@/utils/classNames';
import { View } from 'react-native';

export default function Backdrop({ isVisible }: { isVisible: boolean }) {
	return (
		<View
			id='backdrop'
			className={classNames(
				!isVisible && 'hidden',
				`absolute z-20 top-0 left-0 right-0 bottom-0 bg-green-500 opacity-50`
			)}
		/>
	);
}
