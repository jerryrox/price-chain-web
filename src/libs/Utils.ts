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

    toHexString = (bytes: any[]) => {
        return bytes.map((b) => {
            return `0${(b & 0xff).toString(16)}`.slice(-2);
        }).join("");
    };
}
export default new Utils();