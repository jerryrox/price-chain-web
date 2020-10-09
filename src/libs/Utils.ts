class Utils {

    recordToQueryParam = (record: Record<string, any>) => {
        let query = "?";
        for (const key in record) {
            query = `${query}${key}=${encodeURIComponent(record[key])}&`;
        }
        return query;
    };

    getPercent = (value: number) => {
        return `${Math.floor(value * 100)}%`;
    };
}
export default new Utils();