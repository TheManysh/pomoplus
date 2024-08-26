import { Text, View, Platform } from 'react-native';
import { WithSkiaWeb } from '@shopify/react-native-skia/lib/module/web';
import Breathe from '@/components/wave/Breathe';

export default function App() {
	return (
		<View className='w-full h-full'>
			{Platform.OS === 'web' ? (
				<WithSkiaWeb
					getComponent={() => import('@/components/wave/Breathe')}
					fallback={
						<Text style={{ textAlign: 'center' }}>Loading Skia...</Text>
					}
				/>
			) : (
				<View className='w-full h-full'>
					<Breathe />
				</View>
			)}
		</View>
	);
}
