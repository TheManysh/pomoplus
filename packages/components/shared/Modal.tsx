import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef } from 'react';
import { Text, View, Button } from 'react-native';

export default function CreateTaskModal() {
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	const snapPoints = useMemo(() => ['25%', '50%'], []);

	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	const handleSheetChanges = useCallback((index: number) => {
		console.log('handleSheetChanges', index);
	}, []);

	return (
		<View>
			<Button title='Open' onPress={handlePresentModalPress} />
			<BottomSheetModal
				ref={bottomSheetModalRef}
				index={1}
				snapPoints={snapPoints}
				onChange={handleSheetChanges}
			>
				<View>
					<Text>Awesome 🎉</Text>
				</View>
			</BottomSheetModal>
		</View>
	);
}
