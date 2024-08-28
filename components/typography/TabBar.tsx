import { View, Text, Pressable } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

export default function TabBar({
	state,
	descriptors,
	navigation,
}: BottomTabBarProps) {
	return (
		<View className='w-full flex flex-row items-center justify-center'>
			<View className='flex flex-row absolute bottom-8 bg-white shadow-lg p-4 rounded-full'>
				{state.routes.map((route, index) => {
					const { options } = descriptors[route.key];
					console.log({
						'options: ': state,
						'route: ': descriptors,
						'index: ': navigation,
					});
					const label =
						options.tabBarLabel !== undefined
							? options.tabBarLabel
							: options.title !== undefined
							? options.title
							: route.name;

					const isFocused = state.index === index;

					const onPress = () => {
						const event = navigation.emit({
							type: 'tabPress',
							target: route.key,
							canPreventDefault: true,
						});

						if (!isFocused && !event.defaultPrevented) {
							navigation.navigate(route.name, route.params);
						}
					};

					const onLongPress = () => {
						navigation.emit({
							type: 'tabLongPress',
							target: route.key,
						});
					};

					return (
						<Pressable
							key={route.name}
							accessibilityRole='button'
							accessibilityState={isFocused ? { selected: true } : {}}
							accessibilityLabel={options.tabBarAccessibilityLabel}
							testID={options.tabBarTestID}
							onPress={onPress}
							onLongPress={onLongPress}
							style={{ padding: 8 }}
						>
							<Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
								{/* @ts-ignore */}
								{label}
							</Text>
						</Pressable>
					);
				})}
			</View>
		</View>
	);
}
