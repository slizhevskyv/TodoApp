import { parse, format } from 'date-fns';

const DEFAULT_DATE_TIME_FORMAT = 'dd.MM.yyyy p';

export const parseDate = (date: string, formatTemplate: string = DEFAULT_DATE_TIME_FORMAT) =>
	parse(date, formatTemplate, new Date());
export const formatDate = (date: Date, formatTemplate: string = DEFAULT_DATE_TIME_FORMAT) =>
	format(date, formatTemplate);
