export function truncate(str, maxLength) {
    if (!str) return '';
    return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
}

export function compare_idx_of_objects(a, b) {
	if (a.id > b.id) return -1
	if (a.id < b.id) return 1
	return 0
}