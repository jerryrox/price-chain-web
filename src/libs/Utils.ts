class Utils {

    recordToQueryParam = (record: Record<string, any>) => {
        let query = "?";
        for (const key in record) {
            query = `${query}${key}=${encodeURIComponent(record[key])}&`;
        }
        return query;
    };
}
export default new Utils();