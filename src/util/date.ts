import { format, register } from "timeago.js";
import ko from 'timeago.js/lib/lang/ko';

register('ko', ko);

export function parseDate(date: string, locale = 'ko') {

    return format(date, locale);
}