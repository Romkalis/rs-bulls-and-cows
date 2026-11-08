const MAX_RECORDS = 10;
export function compareRecords(a, b) {
    return a.attempts - b.attempts || a.time - b.time;
}
export function addRecord(records, record) {
    return [...records, record].sort(compareRecords).slice(0, MAX_RECORDS);
}
//# sourceMappingURL=records.js.map