/** Search functions
 *
 * equal - returns true if the value is equal to the query value (e.g. 1 == 1) (default)
 *
 * fuzzy - returns true if the value fuzzy matches the query value (e.g. 1 == 1 or 1 == 11 or "111" == "11 1")
 *
 * contains - returns true if the value contains the query value (e.g. 1 contains 1 or 1 contains 11)
 *
 * starts-with - returns true if the value starts with the query value (e.g. 1 == 1 or 1234 === 12)
 *
 * ends-with - returns true if the value ends with the query value (e.g. 1 == 1 or 1234 == 34)
 *
 * starts-with-no-space - returns true if the value starts with the query value (e.g. 1 == 1 or "abd" == "ab" or "ab d" === "a bd")
 *
 * greater - returns true if the value is greater than the query value (e.g. 1 > 0 or a > b)
 *
 * less - returns true if the value is less than the query value (e.g. 1 < 2 or a < b)
 *
 * greater-equal - returns true if the value is greater than or equal to the query value (e.g. 1 >= 1 or a >= a)
 *
 * less-equal - returns true if the value is less than or equal to the query value (e.g. 1 <= 1 or a <= a)
 *
 */
type SEARCH_FUNCTION = "fuzzy" | "equal" | "contains" | "starts-with" | "ends-with" | "starts-with-no-space" | "greater" | "less" | "greater-equal" | "less-equal";

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
declare function filterData<T>(value: string, data: T[], keys: string[], functionType?: SEARCH_FUNCTION): T[];

export { filterData as default };
