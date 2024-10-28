[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/K4DYhmyn)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=16809907)
# DataFrame Project Documentation

### This project uses many of the same techniques you've already completed in the previous tasks. This project has been specifically designed to be a challenging task. Don't forget - you do not need to complete ALL tasks in this assignment to PASS this module overall.

![spacer](assets/spacer8x8.png)

## Overview and Key Concepts

### What is a DataFrame?

A DataFrame is a 2-dimensional array, similar to a spreadsheet with rows and columns. You can think of it as a table of data.

```javascript
// Example DataFrame
const weatherData = [
  ["date", "temp", "humidity"], // Headers
  ["2024-01", 23.5, 45], // Row 1
  ["2024-02", 25.1, 42], // Row 2
];

// Accessing elements using [row][column]:
weatherData[1][1]; // → 23.5 (First data row, temperature column)
weatherData[2][2]; // → 42 (Second data row, humidity column)
```

### What is a dataset?

A Dataset is a 1-dimensional array - like a single row or column of data.

```javascript
// Example Dataset
const temperatures = [23.5, 25.1, 24.8, 26.2];

// Accessing elements:
temperatures[0]; // → 23.5 (First temperature)
temperatures[3]; // → 26.2 (Fourth temperature)
```

## Core Functions

### Valid Number Check (`validNumber`)

Determines if a value represents a valid number. Works with positive/negative numbers and integers/decimals.

```javascript
validNumber("0.1"); // → true
validNumber("-1.12"); // → true
validNumber(5); // → true
validNumber(-10); // → true
validNumber("5."); // → false (decimal point must be followed by digits)
validNumber("+5"); // → false (explicit plus sign not allowed)
validNumber("0.0.1"); // → false (multiple decimal points)
validNumber("three"); // → false (not a number)
```

### Data Dimensions (`dataDimensions`)

Returns the dimensions [rows, columns] of a dataframe or dataset.

```javascript
const salesData = [
  ["Q1", 1000, 1200, 950],
  ["Q2", 1100, 1300, 975],
  ["Q3", 1200, 1400, 1000],
];

dataDimensions(salesData); // → [3, 4] (3 rows, 4 columns)
dataDimensions([1000, 1100]); // → [2, -1] (Dataset with 2 elements)
dataDimensions(undefined); // → [-1, -1] (No data)
```

### Find Total (`findTotal`)

Sums all valid numbers in a dataset.

```javascript
const monthlyRevenue = [1500.5, 1900.25, "2000.00", 1750.75, "pending"];
findTotal(monthlyRevenue); // → 7151.50 (sums all valid numbers including '2000.00')

const invalidInput = [[100], [200]]; // 2D array instead of dataset
findTotal(invalidInput); // → 0 (invalid dimensions)
```

### Calculate Mean (`calculateMean`)

Calculates the average of all valid numbers in a dataset.

```javascript
const salesFigures = [1500, 1900, 2000, 1750, "1800", "invalid"];
calculateMean(salesFigures); // → 1790 (averages all valid numbers including '1800')

const invalidDataset = [["not"], ["a"], ["dataset"]];
calculateMean(invalidDataset); // → 0 (invalid dimensions)
```

### Calculate Median (`calculateMedian`)

Finds the middle value of a sorted dataset.

```javascript
const responseTimes = [1.5, 1.9, 10.0, 50, -10, "3", "1"];
calculateMedian(responseTimes); // → 1.9

const evenDataset = [1, 2, 3, 4];
calculateMedian(evenDataset); // → 2.5 (average of 2 and 3)

const invalidData = [[1], [2]]; // 2D array instead of dataset
calculateMedian(invalidData); // → 0
```
### Convert to Number (`convertToNumber`)

Converts string numbers to actual numbers in a specified column.

```javascript
const trafficData = [
  ["protocol", "requests", "latency"], // Column indices: 0, 1, 2
  ["tcp", "1000", "2.5"], //                ↓  ↓  ↓
  ["udp", "1500", "1.8"], //                0  1  2
];

// Convert string numbers in 'requests' column (index 1)
convertToNumber(trafficData, 1); // → 2 (converted '1000' and '1500' to numbers)
// trafficData is now:
// [
//   ['protocol', 'requests', 'latency'],
//   ['tcp',       1000,     '2.5'    ],  // '1000' → 1000
//   ['udp',       1500,     '1.8'    ]   // '1500' → 1500
// ]

// Convert string numbers in 'latency' column (index 2)
convertToNumber(trafficData, 2); // → 2 (converted '2.5' and '1.8' to numbers)
// trafficData is now:
// [
//   ['protocol', 'requests', 'latency'],
//   ['tcp',       1000,      2.5     ],  // '2.5' → 2.5
//   ['udp',       1500,      1.8     ]   // '1.8' → 1.8
// ]
```

### Flatten DataFrame (`flatten`)

Converts a single-column dataframe into a dataset. Only works on dataframes with exactly one column.

```javascript
const temperatures = [[23.5], [25.1], [24.8]];

flatten(temperatures); // → [23.5, 25.1, 24.8]
dataDimensions(temperatures); // → [3, 1]
dataDimensions(flatten(temperatures)); // → [3, -1]

// Won't flatten multi-column dataframes
const invalidData = [
  [23.5, 45],
  [25.1, 42],
];
flatten(invalidData); // → [] (empty array returned for invalid input)
```

### Load CSV (`loadCSV`)

#### Parameters

1. `filepath` (string)

   - The path to the CSV file to load
   - Can be relative (e.g., './data/sales.csv') or absolute
   - Required parameter
   - Example: `'./sales_data.csv'`

2. `ignoreRows` (array of numbers, optional)

   - Array of row indices to skip when loading the data
   - Zero-based indexing (0 = first row, 1 = second row, etc.)
   - Common use: `[0]` to skip header row
   - Default value: `[]` (include all rows)
   - Examples:
     - `[0]` - Skip first row
     - `[0, 1]` - Skip first and second rows
     - `[]` - Skip no rows

3. `ignoreCols` (array of numbers, optional)
   - Array of column indices to exclude from the loaded data
   - Zero-based indexing (0 = first column, 1 = second column, etc.)
   - Default value: `[]` (include all columns)
   - Examples:
     - `[0]` - Exclude first column
     - `[0, 2]` - Exclude first and third columns
     - `[]` - Exclude no columns

#### Return Value

Returns an array containing three elements: `[dataframe, totalRows, totalColumns]`

1. `dataframe`: The loaded data as a 2D array
2. `totalRows`: Number of rows in original file
3. `totalColumns`: Number of columns in original file

#### Sample CSV File (salesData.csv):

```csv
date,region,product,quantity,unit_price,total_sales,status
2024-01-15,North,Laptop,5,999.99,4999.95,completed
2024-01-15,South,Phone,10,499.99,4999.90,completed
2024-01-16,North,Tablet,3,699.99,2099.97,pending
2024-01-16,East,Laptop,7,999.99,6999.93,completed
2024-01-17,West,Phone,4,499.99,1999.96,completed
2024-01-17,South,Tablet,6,699.99,4199.94,cancelled
```

#### Example 1: Load entire CSV (skip header)

```javascript
const [salesData, totalRows, totalColumns] = loadCSV(
  "./salesData.csv",
  [0], // Ignore first row (headers)
  [] // Include all columns
);

// totalRows → 7 (6 data rows + 1 header)
// totalColumns → 7
// salesData will be:
// [
//   ['2024-01-15', 'North', 'Laptop', '5', '999.99', '4999.95', 'completed'],
//   ['2024-01-15', 'South', 'Phone',  '10', '499.99', '4999.90', 'completed'],
//   ['2024-01-16', 'North', 'Tablet', '3', '699.99', '2099.97', 'pending'],
//   ['2024-01-16', 'East',  'Laptop', '7', '999.99', '6999.93', 'completed'],
//   ['2024-01-17', 'West',  'Phone',  '4', '499.99', '1999.96', 'completed'],
//   ['2024-01-17', 'South', 'Tablet', '6', '699.99', '4199.94', 'cancelled']
// ]
```

#### Example 2: Load CSV (skip header and ignore some columns)

```javascript
const [filteredData, rows, cols] = loadCSV(
  "./salesData.csv",
  [0], // Ignore header row
  [0, 5, 6] // Ignore date, total_sales, and status columns
);

// rows → 7 (original row count unchanged)
// cols → 7 (original column count unchanged)
// filteredData will be:
// [
//   ['North', 'Laptop', '5', '999.99'],
//   ['South', 'Phone',  '10', '499.99'],
//   ['North', 'Tablet', '3', '699.99'],
//   ['East',  'Laptop', '7', '999.99'],
//   ['West',  'Phone',  '4', '499.99'],
//   ['South', 'Tablet', '6', '699.99']
// ]
```

#### Example 3: Loading a non-existent file

```javascript
const [emptyData, rows, cols] = loadCSV("./nonexistent.csv");
// Returns: [[], -1, -1]
```

#### Key Points:

1. The function returns an array containing three elements:

   - The loaded data as a dataframe
   - Total rows in original file (including headers)
   - Total columns in original file

2. The `ignoreRows` parameter:

   - Array of row indices to skip
   - Common use: `[0]` to skip header row
   - Can skip multiple rows: `[0, 1, 2]`

3. The `ignoreCols` parameter:

   - Array of column indices to exclude
   - Empty array `[]` keeps all columns
   - Column indices are zero-based

4. Data types:

   - All values are initially loaded as strings
   - Use `convertToNumber` afterwards if needed
   - Empty cells become empty strings

5. Error handling:
   - Returns `[[], -1, -1]` if file doesn't exist
   - Skips empty rows
   - Handles varying row lengths

#### Common Usage Pattern:

```javascript
// Load data and convert numeric columns
const [salesData, rows, cols] = loadCSV("./salesData.csv", [0], []);
if (rows !== -1) {
  // Convert quantity column (index 3) to numbers
  convertToNumber(salesData, 3);

  // Convert unit_price column (index 4) to numbers
  convertToNumber(salesData, 4);

  // Convert total_sales column (index 5) to numbers
  convertToNumber(salesData, 5);
}
```


### Creating a slice `createSlice`

## Function Signature

```javascript
createSlice(dataframe, columnIndex, pattern, (exportColumns = []));
```

## Parameters Explained

### 1. `dataframe`

- The source dataframe to slice from
- Must be a 2D array (array of arrays)

### 2. `columnIndex`

- Which column to check for matches
- Zero-based index (0 = first column, 1 = second column, etc.)
- Used to identify which rows to include based on the pattern

### 3. `pattern`

- The value to match in the specified column
- Special case: '\*' matches any value (includes all rows)
- Case-sensitive for string matches

### 4. `exportColumns` (optional)

- Array of column indices to include in the result
- If omitted or empty array (`[]`), includes all columns
- Zero-based indices

## Detailed Examples

### Example 1: Basic Filtering

```javascript
const salesData = [
  ["region", "product", "sales", "profit"], // Column indices: 0, 1, 2, 3
  ["north", "laptop", 1000, 200],
  ["south", "phone", 500, 100],
  ["north", "tablet", 750, 150],
  ["east", "laptop", 1200, 240],
];

// Get all rows where region (column 0) is 'north'
createSlice(salesData, 0, "north");
// Returns:
// [
//   ['north', 'laptop', 1000, 200],
//   ['north', 'tablet', 750, 150]
// ]
```

### Example 2: Filtering with Column Selection

```javascript
// Get sales and profit columns (2 and 3) for 'north' region
createSlice(salesData, 0, "north", [2, 3]);
// Returns:
// [
//   [1000, 200],  // Only sales and profit columns for north rows
//   [750, 150]
// ]
```

### Example 3: Using Wildcard Pattern

```javascript
// Get all rows (*) but only product and sales columns (1 and 2)
createSlice(salesData, 0, "*", [1, 2]);
// Returns:
// [
//   ['laptop', 1000],
//   ['phone',  500],
//   ['tablet', 750],
//   ['laptop', 1200]
// ]
```

### Example 4: Filtering by Non-First Column

```javascript
// Get all rows where product (column 1) is 'laptop'
createSlice(salesData, 1, "laptop", [0, 2]);
// Returns:
// [
//   ['north', 1000],  // Region and sales for laptop rows
//   ['east',  1200]
// ]
```

## Common Use Cases

### Getting Specific Product Data

```javascript
const inventoryData = [
  ["sku", "type", "stock", "price"],
  ["A123", "mobile", 50, 499],
  ["B456", "tablet", 30, 699],
  ["C789", "mobile", 45, 549],
  ["D012", "laptop", 20, 999],
];

// Get all mobile devices' stock and price
createSlice(inventoryData, 1, "mobile", [2, 3]);
// Returns:
// [
//   [50, 499],   // stock and price for first mobile
//   [45, 549]    // stock and price for second mobile
// ]
```

### Selecting Data by Category

```javascript
const transactionData = [
  ["date", "type", "amount", "status"],
  ["2024-01-01", "sale", 100, "complete"],
  ["2024-01-02", "refund", -50, "complete"],
  ["2024-01-03", "sale", 75, "pending"],
  ["2024-01-04", "sale", 200, "complete"],
];

// Get dates and amounts for completed sales only
createSlice(transactionData, 1, "sale", [0, 2]);
// Returns:
// [
//   ['2024-01-01', 100],
//   ['2024-01-03', 75],
//   ['2024-01-04', 200]
// ]
```

## Key Points to Remember

1. Column Indexing:

   - Always zero-based
   - First column is 0, second is 1, etc.
   - Invalid column indices are ignored

2. Pattern Matching:

   - Case sensitive ('SALE' ≠ 'sale')
   - '\*' is special wildcard character
   - Exact match required for all other patterns

3. Export Columns:

   - Optional parameter
   - If omitted, all columns are included
   - Order matters: [2, 0] will return columns in that order
   - Invalid indices are ignored

4. Return Value:
   - Always returns a new dataframe
   - Original dataframe is unchanged
   - Empty dataframe (`[]`) if no matches found

## Implementation Requirements

1. No external libraries allowed except those specifically provided
2. All functions must handle invalid inputs gracefully
3. Use -1 to indicate 'no data' on an axis
4. Functions should validate input dimensions before processing
5. Maintain consistent type handling (strings vs numbers)

## Testing Guidelines

1. Create small test files during development
2. Test edge cases:
   - Empty arrays
   - Invalid numbers
   - Mixed data types
   - Missing or undefined values
3. Verify dimension handling:
   - Single-row dataframes
   - Single-column dataframes
   - Empty dataframes
   - Datasets vs dataframes
4. Check type conversions:
   - String to number conversions
   - Valid vs invalid number formats
5. Test with both valid and invalid inputs:
   - Correct file paths
   - Incorrect file paths
   - Valid column indices
   - Invalid column indices
   - Valid patterns for slicing
   - Invalid patterns for slicing

## File Processing Note

The example dataset (`datatrafficdataset_2000.csv`) contains 2001 rows and 21 columns including headers. Consider creating smaller test files during development to optimize your workflow.
