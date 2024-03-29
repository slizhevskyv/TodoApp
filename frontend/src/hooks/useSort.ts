import { useCallback, useMemo, useState } from 'react';
import { SortField, SortOrder } from '../enums';
import { Todo } from '../types';

function useSort<T extends Todo, TProp extends keyof TProp>(
	items: T[],
	sortFieldsConfiguration: {
		[key in SortField]: {
			sortF: (field: keyof T, order: SortOrder) => (todo1: T, todo2: T) => number;
			value: SortOrder;
		};
	},
) {
	const [sortFields, setSortFields] = useState(sortFieldsConfiguration);

	const updateSortFieldConfiguration = useCallback(
		(field: SortField) => {
			switch (sortFields[field].value) {
				case SortOrder.none:
					return setSortFields(prevValue => ({
						...prevValue,
						[field]: { ...prevValue[field], value: SortOrder.desc },
					}));
				case SortOrder.desc:
					return setSortFields(prevValue => ({ ...prevValue, [field]: { ...prevValue[field], value: SortOrder.asc } }));
				default:
					return setSortFields(prevValue => ({
						...prevValue,
						[field]: { ...prevValue[field], value: SortOrder.none },
					}));
			}
		},
		[sortFields],
	);

	const sortedItems = useMemo(
		() =>
			Object.entries(sortFields).reduce((acc, [field, fieldConfiguration]) => {
				const { value: order, sortF } = fieldConfiguration;
				if (order === SortOrder.none) return acc;

				return acc.toSorted(sortF(field as keyof T, order));
			}, items),
		[items, sortFields],
	);

	return [sortedItems, sortFields, updateSortFieldConfiguration] as [
		typeof sortedItems,
		typeof sortFields,
		typeof updateSortFieldConfiguration,
	];
}

export default useSort;
