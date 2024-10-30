const fs = require("fs");

function fileExists(filename) {
  return fs.existsSync(filename);
}

function validNumber(value) {
    // Regex matching any occurence of + anywhere and . at the end of the string. 
    if (/[+]|[.]$/.test(String(value))) return false;
  
    const numberValue = Number(value);
    return !isNaN(numberValue) && isFinite(numberValue) && String(numberValue) === String(parseFloat(value));
}

function dataDimensions(dataframe) {
    // returns a list [rows (int), cols (int)]
    if (!dataframe || dataframe.length === 0) return [-1, -1];

    const rows = dataframe.length;
    const columns = Array.isArray(dataframe[0]) ? dataframe[0].length : -1;
  
    return [rows, columns];
}

function findTotal(dataset) {
  if (!Array.isArray(dataset) || dataset.some(Array.isArray)) {
    return 0; // Return 0 if dataset is not a 1D array
  }
  
  let total = 0;
  for (let value of dataset) {
    if (validNumber(value)) {
      total += parseFloat(value); // Convert to a number and add to the total
    }
  }
  return total;
}


function calculateMean(dataset) {
  if (!Array.isArray(dataset) || dataset.some(Array.isArray)) {
    return 0; // Return 0 if dataset is not a valid 1D array
  }

  let total = 0;
  let count = 0;

  // Iterate over the dataset to calculate total and count valid numbers
  for (let value of dataset) {
    if (validNumber(value)) {
      total += parseFloat(value); // Add valid number to total
      count++; // Increment count for each valid number
    }
  }

  // Calculate and return the average, or return 0 if no valid numbers were found
  return count > 0 ? total / count : 0;
}

function calculateMedian(dataset) {
  // Return null if dataset is not a valid 1D array
  if (!Array.isArray(dataset) || dataset.some(Array.isArray)) {
    return 0;
  }
  
  // Filter valid numbers using the validNumber function
  const validNumbers = dataset.filter(value => validNumber(value)).map(Number);

  // Return null if there are no valid numbers
  if (validNumbers.length === 0) {
    return 0;
  }
  
  // Sort the valid numbers in ascending order
  validNumbers.sort((a, b) => a - b);

  // Calculate the median
  const mid = Math.floor(validNumbers.length / 2);
  
  // If the length is odd, return the middle element
  if (validNumbers.length % 2 !== 0) {
    return validNumbers[mid];
  }
  
  // If the length is even, return the average of the two middle elements
  return (validNumbers[mid - 1] + validNumbers[mid]) / 2;
}

function convertToNumber(dataframe, col) {
  let conversionCount = 0; // Counter for successful conversions
  
  // Skip the header row and iterate over each row in the dataset
  for (let i = 1; i < dataframe.length; i++) {
    const value = dataframe[i][col];
    
    // Check if value is a valid number string and convert to number if true
    if (typeof value === 'string' && !isNaN(value)) {
      dataframe[i][col] = parseFloat(value);
      conversionCount++; // Increment counter for each successful conversion
    }
  }
  
  return conversionCount; // Return the count of successful conversions
}

function flatten(dataframe) {
  // Validate that the input is a single-column dataframe
  if (!Array.isArray(dataframe) || dataframe.some(row => !Array.isArray(row) || row.length !== 1)) {
    return []; // Return an empty array for invalid input
  }

  // Extract and convert valid numbers
  const dataset = [];
  for (let row of dataframe) {
    const value = row[0];
    if (validNumber(value)) {
      dataset.push(parseFloat(value));
    }
  }
  
  return dataset; // Return the 1D array of valid numbers
}

function loadCSV(csvFile, ignoreRows = [], ignoreCols = []) {
  // Check if the file exists
  if (!fs.existsSync(csvFile)) {
    return [[], -1, -1];
  }

  try {
    // Read the file content as a single string
    const fileContent = fs.readFileSync(csvFile, "utf8");

    // Split the file content by new lines to get each row
    const rows = fileContent.split(/\r?\n/).filter(line => line.trim() !== "");
    const totalRows = rows.length;

    // Get total columns from the first row if there are rows available
    const totalColumns = rows.length > 0 ? rows[0].split(",").length : -1;

    const dataframe = rows
      .map((line, rowIndex) => {
        if (ignoreRows.includes(rowIndex)) return null;

        const row = line.split(",");  // Split each line into columns
        const filteredRow = row.filter((_, colIndex) => !ignoreCols.includes(colIndex));

        return filteredRow;
      })
      .filter(row => row !== null);  // Remove any skipped rows

    return [dataframe, totalRows, totalColumns];
  } catch (error) {
    console.error("Error reading file:", error);
    return [[], -1, -1];
  }
}


function createSlice(dataframe, columnIndex, pattern, exportColumns = []) {
  // Validate dataframe as a 2D array
  if (!Array.isArray(dataframe) || !dataframe.every(row => Array.isArray(row))) {
    return []; // Return empty array if dataframe is invalid
  }

  // Validate columnIndex
  if (columnIndex < 0 || columnIndex >= dataframe[0].length) {
    return []; // Return empty array if columnIndex is out of bounds
  }

  // Check if exportColumns are within bounds
  const validExportCols = exportColumns.filter(
    colIndex => colIndex >= 0 && colIndex < dataframe[0].length
  );

  // If exportColumns is empty, include all columns
  const includeAllColumns = validExportCols.length === 0;

  // Filter rows based on the pattern and columnIndex
  const slicedData = dataframe.filter(row => {
    if (pattern === "*") return true; // Include all rows if pattern is '*'
    return row[columnIndex] === pattern;
  });

  // Map filtered rows to include only the specified columns (or all if empty)
  const result = slicedData.map(row => {
    return includeAllColumns ? row : validExportCols.map(colIndex => row[colIndex]);
  });

  return result;
}

module.exports = {
  fileExists,
  validNumber,
  dataDimensions,
  calculateMean,
  findTotal,
  convertToNumber,
  flatten,
  loadCSV,
  calculateMedian,
  createSlice,
};