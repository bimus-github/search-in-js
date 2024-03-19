# Array Data Filter Hook

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
import filterData from "search-in-js";

const ExampleComponent = () => {
  const data = [
    { id: 1, name: "test1", comments: { id: 1, text: "comment1" } },
    { id: 2, name: "test2", comments: { id: 2, text: "comment2" } },
    // More data...
  ];

  // Define keys for searching
  const keys = ["id", "name"];

  // State for search query and filtered data
  const [value, setValue] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  // Update filtered data when search query changes
  useEffect(() => {
    setFilteredData(filterData(value, data, keys));
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

#### `filterData(value, data, keys, functionType)`

- `value` (`string`): The value to search for in the data.
- `data` (`Array<T>`): The array of data to search.
- `keys` (`Array<string>`): The array of keys to search for in the data.
- `functionType` (`SEARCH_FUNCTION`, optional): The type of search function to use. Defaults to "fuzzy".

Returns: `Array<T>` - The filtered data based on the search query.

## Contributing

Contributions are welcome! Please feel free to open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```

Feel free to modify and expand upon it to suit your needs!
```
