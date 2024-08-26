import { ScrollView, ScrollViewProps, View } from 'react-native';

interface ContainerizedScrollViewProps extends ScrollViewProps {
	children: React.ReactNode;
	className?: string;
}

export default function ContainerizedScrollView({
	children,
	className,
	...ScrollViewProps
}: ContainerizedScrollViewProps) {
	return (
		<ScrollView
			{...ScrollViewProps}
			contentContainerStyle={{
				alignItems: 'center',
				width: '100%',
				height: '100%',
			}}
			id='ContainerWrapper'
			className={className}
		>
			<View className='w-full h-full flex-1 md:w-4/5 lg:w-3/5'>{children}</View>
		</ScrollView>
	);
}
