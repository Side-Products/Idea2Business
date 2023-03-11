const NoDataTableRow = () => {
	return (
		<table className="w-full table table-auto text-gray-400 border-separate space-y-6 text-sm">
			<tbody>
				<tr className="flex justify-center w-full mt-6 text-sm text-zinc-600">
					<td className="p-3">No data in this category</td>
				</tr>
			</tbody>
		</table>
	);
};

export default NoDataTableRow;
