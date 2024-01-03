import { useMemo, useState } from 'react';
import { Todo } from '../types';
import { isPropertyValueString } from '../typeguards';

function useSearchQuery<T extends Todo, TProp extends keyof T>(items: T[], field: TProp) {
	const [query, setQuery] = useState<string | null>(null);

	const filteredItems = useMemo(() => {
		if (!query) return [...items];

		return items.filter(i => {
			const prop = i[field];

			if (!isPropertyValueString(prop)) return true;

			return prop.toLowerCase().includes(query.toLowerCase());
		});
	}, [items, query]);

	return [filteredItems, setQuery] as [typeof filteredItems, typeof setQuery];
}

export default useSearchQuery;
