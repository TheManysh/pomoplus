import { Tabs, useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

const blog = {
	title: 'The Pomodoro Timer',
	content:
		'The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. The technique uses a timer to break down work into intervals, traditionally 25 minutes in length, separated by short breaks. These intervals are named pomodoros, the plural in English of the Italian word pomodoro (tomato), after the tomato-shaped kitchen timer that Cirillo used as a university student.',
	featuredPhoto:
		'https://website-cdn.studysmarter.de/sites/2/uk/Pomodoro-Technique2.webp',
	insights: ['Helps you focus on a task', 'Improves productivity'],
	comments: [
		{
			author: 'John Doe',
			comment: 'I love this technique',
		},
	],
};

export default function BlogPage() {
	const { slug } = useLocalSearchParams();

	return (
		<View>
			<Tabs.Screen
				options={{
					headerTitle: 'The Pomodoro Timer',
				}}
			/>
			<Text>{slug}</Text>
		</View>
	);
}
