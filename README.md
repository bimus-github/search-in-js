# Array Data Filter Function

This is a custom function designed to filter data in an array based on a search query.
It provides flexibility in specifying the keys to search for within the data,
as well as the type of search function to use.

## Usage

### Installation

```bash
npm install search-in-js
```

```bash
yarn add search-in-js
```

### Example

```javascript
import { useState, useEffect } from "react";
import search from "search-in-js";

const ExampleComponent = () => {
  const data = [
    { id: 1, name: "test1", comment: { id: 1, text: "some comment" } },
    { id: 2, name: "test2", comment: { id: 2, text: "some other comment" } },
    // More data...
  ];

  // Define keys for searching
  const keys = ["id", "comment.text"];

  // State for search query and filtered data
  const [value, setValue] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  // Update filtered data when search query changes
  useEffect(() => {
    setFilteredData(search(value, data, keys, "fuzzy"));
  }, [value]);

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <ul>
        {filteredData.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};
```

### API

#### `search(value, data, keys, functionType)`

- `value` (`string`): The value to search for in the data.
- `data` (`Array<T>`): The array of data to search.
- `keys` (`Array<string>`): The array of keys to search for in the data.

  if you want to search by id and name, you can use the following keys:
  const keys = ["id", "name"];

  if you want to search by comments.id and comments.text, you can use the following keys:
  const keys = ["comments.id", "comments.text"];

- `functionType` (`SEARCH_FUNCTION`, optional): The type of search function to use. Defaults to "fuzzy".

  Available search function types:
  equal, fuzzy, contains, starts-with, ends-with, starts-with-no-space, greater, less, greater-equal, less-equal

Returns: `Array<T>` - The filtered data based on the search query.

## Contributing

Contributions are welcome! Please feel free to open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```

Feel free to modify and expand upon it to suit your needs!
```
