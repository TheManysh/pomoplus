import { View, Text, TextInput, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const getLocalData = async (key: any) => {
	try {
		const value = await AsyncStorage.getItem(key);
		if (value !== null) {
			return value;
		}
	} catch (e) {
		console.log(e);
	}
};

export default function LoginPage() {
	const [token, setToken] = useState('');
	useEffect(() => {
		getLocalData('token').then((data) => {
			setToken(data || '');
		});
	}, []);

	return (
		<View className='flex items-center justify-center w-full h-full'>
			<Text>{'token ' + token}</Text>
			<View className='w-full p-8 bg-white md:w-2/3 md:rounded-lg lg:w-2/5'>
				<View>
					<Text className='pb-2 font-semibold'>Email or Username</Text>
					<TextInput
						className='p-3 border border-gray-200 rounded-lg placeholder:text-gray-500'
						placeholder='Email'
						onChange={() => {}}
					/>
				</View>
				<View className='mt-4'>
					<Text className='pb-2 font-semibold'>Password</Text>
					<TextInput
						className='p-3 border border-gray-200 rounded-lg placeholder:text-gray-500'
						placeholder='Password'
						secureTextEntry={true}
						onChange={() => {}}
					/>
				</View>
				<View className='mt-4'>
					<Pressable
						className='flex items-center w-full p-3 text-white bg-blue-600 rounded-lg active:bg-blue-500'
						onPress={() => {}}
						onHoverIn={() => {}}
					>
						<Text className='text-white'>Login</Text>
					</Pressable>
				</View>
			</View>
		</View>
	);
}
