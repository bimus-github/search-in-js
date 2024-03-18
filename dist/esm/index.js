/**
 * Search function
 * @param {string | number} value - The value to search
 * @param {string | number} query - The query to search for in the value
 *
 * @returns {boolean} Returns true if the value matches the query
 *
 * @example
 * const data: {id: number, name: string}[] = [
 *  {id: 1, name: "test1"},
 *  {id: 12, name: "test2"},
 *  {id: 123, name: "test3"}
 ]
 * const filterdedData = data.filter((data) => search({value: data.id, query: 1, searchFunction: "equal"}));
 * console.log(filterdedData); // [{id: 1, name: "test1"}]
 *
 * const filterdedData = data.filter((data) => search({value: data.id, query: 1, searchFunction: "fuzzy"}));
 * console.log(filterdedData); // [{id: 1, name: "test1"}, {id: 12, name: "test2"}, {id: 123, name: "test3"}]
 */
function search(props) {
    const { value, query, searchFunction } = props;
    switch (searchFunction) {
        case "fuzzy":
            return value
                .toString()
                .replaceAll(" ", "")
                .includes(query.toString().replaceAll(" ", ""));
        case "equal":
            return value.toString() === query.toString();
        case "contains":
            return value.toString().includes(query.toString());
        case "ends-with":
            return value.toString().startsWith(query.toString());
        case "starts-with":
            return value.toString().endsWith(query.toString());
        case "starts-with-no-space":
            return value
                .toString()
                .toLowerCase()
                .replaceAll(" ", "")
                .startsWith(query.toString().toLowerCase().replaceAll(" ", ""));
        case "greater":
            return value > query;
        case "less":
            return value < query;
        case "greater-equal":
            return value >= query;
        case "less-equal":
            return value <= query;
        default:
            return value === query;
    }
}

export { search as default };
//# sourceMappingURL=index.js.map
