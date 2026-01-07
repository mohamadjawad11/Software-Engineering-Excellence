import { promises as fs } from 'fs';
import { parse as csvParse } from 'csv-parse';
import { stringify } from 'csv-stringify';


// function to read data from a CSV file
export async function readCsv(filePath: string,includeHeader: boolean=true): Promise<string[][]> {

  try {
    const fileContent = await fs.readFile(filePath, 'utf8');
    return new Promise((resolve, reject) => {
      csvParse(fileContent,
        {   
          trim: true,
          skip_empty_lines: true
        }, (err, records: string[][]) => {
          if (err) {
            return reject(err);
          }
          if (!includeHeader) {
            records.shift(); // remove header row
          }
          resolve(records);
        });
    })
  } catch (err) {
    throw new Error(`Error reading CSV file at ${filePath}: ${err}`);
  }
}



/**
 * @param filePath - The path to the CSV file to write.
 * @param data - The data to write to the CSV file, as an array of string arrays.
 * @returns A promise that resolves when the file has been written.
 */



// function to write data to a CSV file
export async function writeCsv(filePath: string, data: string[][]): Promise<void> {
  
  try {
    const csvContent = await new Promise<string>((resolve, reject) => {
      stringify(data, (err, output) => {
        if (err) {
          return reject(err);
        }
        resolve(output);
      });
    });

    await fs.writeFile(filePath, csvContent, 'utf8');
  } catch (err) { 
    throw new Error(`Error writing CSV file at ${filePath}: ${err}`);
  }
}