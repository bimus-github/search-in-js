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
export type SEARCH_FUNCTION = "fuzzy" | "equal" | "contains" | "starts-with" | "ends-with" | "starts-with-no-space" | "greater" | "less" | "greater-equal" | "less-equal";
interface Props {
    value: string | number;
    query: string | number;
    searchFunction: SEARCH_FUNCTION;
}
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
export declare function search(props: Props): boolean;
export {};
