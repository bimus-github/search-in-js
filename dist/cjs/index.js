'use strict';

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
        case "fuzzy": {
            return fuzzySearch(value.toString(), query.toString());
        }
        case "equal":
            return value.toString().toLowerCase() === query.toString().toLowerCase();
        case "contains":
            return containsPattern(value.toString(), query.toString());
        case "ends-with":
            return endsWithPattern(value.toString(), query.toString());
        case "starts-with":
            return startsWithPattern(value.toString(), query.toString());
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
function fuzzySearch(search, text) {
    // Escape special characters in the search term
    const escapedSearch = search.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    // Create a fuzzy regex pattern
    const fuzzyPattern = escapedSearch.split("").join(".*?");
    // Create a regex object with the fuzzy pattern
    const regex = new RegExp(fuzzyPattern, "i");
    // Test the regex against the text
    return regex.test(text);
}
function containsPattern(search, text) {
    // Remove all spaces from the search term and the text
    const searchNoSpaces = search.replace(/\s+/g, "");
    const textNoSpaces = text.replace(/\s+/g, "");
    // Escape special characters in the search term
    const escapedSearch = searchNoSpaces.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    // Create a regex object with the escaped search term
    const regex = new RegExp(escapedSearch, "i");
    // Test the regex against the text
    return regex.test(textNoSpaces);
}
function endsWithPattern(search, text) {
    // Remove all spaces from the search term and the text
    const searchNoSpaces = search.replace(/\s+/g, "");
    const textNoSpaces = text.replace(/\s+/g, "");
    // Escape special characters in the search term
    const escapedSearch = searchNoSpaces.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    // Create a regex object with the escaped search term anchored to the end
    const regex = new RegExp(escapedSearch + "$", "i");
    // Test the regex against the text
    return regex.test(textNoSpaces);
}
function startsWithPattern(search, text) {
    // Remove all spaces from the search term and the text
    const searchNoSpaces = search.replace(/\s+/g, "");
    const textNoSpaces = text.replace(/\s+/g, "");
    // Escape special characters in the search term
    const escapedSearch = searchNoSpaces.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    // Create a regex object with the escaped search term anchored to the start
    const regex = new RegExp("^" + escapedSearch, "i");
    // Test the regex against the text
    return regex.test(textNoSpaces);
}

/**
 * Searches for a nested property within an object.
 *
 * @param {T} obj - the object to search within
 * @param {string[]} keys - the keys representing the path to the nested property
 * @param {string} value - the value to search for within the nested property
 * @param {SEARCH_FUNCTION} functionType - the type of search function to use
 * @return {boolean} indicates whether the nested property was found
 */
function searchNestedProperty(obj, keys, value, functionType) {
    const [currentKey, ...remainingKeys] = keys;
    if (obj[currentKey] === undefined)
        return false;
    if (remainingKeys.length === 0) {
        return search({
            value: obj[currentKey],
            query: value,
            searchFunction: functionType,
        });
    }
    if (typeof obj[currentKey] === "object" &&
        obj[currentKey] !== null) {
        return searchNestedProperty(obj[currentKey], remainingKeys, value, functionType);
    }
    return false;
}

/**
 * Hook to search data in an array based on a query using a search function.
 * @template T The type of data in the array.
 * @param {string} value The value to search for in the data.
 * @param {T[]} data The array of data to search.
 * @param {string[]} keys The array of keys to search for in the data.
 * @examle
 * const data: {id: number, name: string, comments: {id: number, text: string}}[] = [
 *  {id: 1, name: "test1", comments: {id: 1, text: "comment1"}},
 * ...
 ]
 
 if you want to search by id and name, you can use the following keys:
 * const keys = ["id", "name"];

 if you want to search by comments.id and comments.text, you can use the following keys:
 * const keys = ["comments.id", "comments.text"];
 * @param {SEARCH_FUNCTION} [functionType="fuzzy"] The type of search function to use.
 *
 * @returns { [string, (newValue: string) => void, T[]]} The current value, setter of the search query and the filtered data.
 *
 * @example
 * const [value, setValue] = useState("");
 * const [filteredData, setFilteredData] = useState(data);
 *
 * useEffect(() => {
 *  setFilteredData(filterData(value, data, keys));
 * }, [value]);
 */
function filterData(value, data, keys, functionType = "fuzzy") {
    return data.filter((item) => {
        return keys.some((query) => {
            if ([...query].find((q) => q === ".")) {
                const keys = query.split(".");
                return searchNestedProperty(item, keys, value, functionType);
            }
            else {
                if (item[query] === undefined)
                    return false;
                return search({
                    value: item[query],
                    query: value,
                    searchFunction: functionType,
                });
            }
        });
    });
}

module.exports = filterData;
//# sourceMappingURL=index.js.map
