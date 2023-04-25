const Counter = ({ count, label, testid }) => {
	return (
		<div className="flex flex-col items-center space-y-2">
			<div className="w-14 h-14 text-xl font-medium rounded-full bg-white text-dark-900 inline-flex justify-center items-center" data-testid={testid}>
				{count}
			</div>
			<span className="text-xs text-dark-900">{label}</span>
		</div>
	);
};
export default Counter;
