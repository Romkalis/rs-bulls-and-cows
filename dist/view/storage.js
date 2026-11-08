const STORAGE_KEY = 'bulls-and-cows-records';
export function loadRecords() {
    try {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
        return Array.isArray(data) ? data : [];
    }
    catch {
        return [];
    }
}
export function saveRecords(records) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}
//# sourceMappingURL=storage.js.map