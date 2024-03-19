import { SEARCH_FUNCTION, search } from "./search";
import { searchNestedProperty } from "./searchNestedProperty";

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
export default function filterData<T>(
  value: string,
  data: T[],
  keys: string[],
  functionType: SEARCH_FUNCTION = "fuzzy"
): T[] {
  return data.filter((item) => {
    return keys.some((query) => {
      if ([...query].find((q) => q === ".")) {
        const keys = query.split(".");
        return searchNestedProperty(item, keys, value, functionType);
      } else {
        if ((item as { [key: string]: any })[query] === undefined) return false;
        return search({
          value: (item as { [key: string]: any })[query],
          query: value,
          searchFunction: functionType,
        });
      }
    });
  });
}
