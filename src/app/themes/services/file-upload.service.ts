import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  stockNameList = new BehaviorSubject<any[]>([]);
  constructor() {}

  processFile(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const fileContent: string = event.target.result;
        const data = this.parseFileContent(fileContent);
        resolve(data);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsText(file);
    });
  }

  private parseFileContent(content: string): any[] {
    // Split the content by new lines
    const lines = content.split('\n');
    const dataArray: any[] = [];

    // Process each line
    lines.forEach((line) => {
      // Remove unwanted text or any further processing
      const cleanedLine = this.removeUnwantedText(line);

      // Create object from remaining text
      if (cleanedLine.trim() !== '') {
        const obj = { text: cleanedLine };
        dataArray.push(obj);
      }
    });

    return dataArray;
  }

  createArrayOfObjectsFromString(inputString: string): any[] {
    const values = inputString.split(','); // Split the string by commas
    const arrayOfObjects: any[] = [];

    // Iterate over each value and create an object with a key-value pair
    values.forEach((value, index) => {
      arrayOfObjects.push({ key: index, value: value.trim() }); // Assuming you want to use index as key
      // If you have specific keys, replace 'index' with your desired key name
    });

    return arrayOfObjects;
  }

  private removeUnwantedText(line: string): string {
    // Get the unwanted pattern from the user
    const unwantedPattern = 'NSE:';

    // Remove unwanted text
    return line.replace(new RegExp(unwantedPattern, 'g'), '');
  }
}
