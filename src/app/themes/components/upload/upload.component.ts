import { Component } from '@angular/core';
import { FileUploadService } from '../../services/file-upload.service';
import { User } from '../../../feature/pages/trade-calculator/trade-calculator.component';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss',
})
export class UploadComponent {
  uploadedFiles: File[] = [];
  arrayOfObjects: User[] = [];

  constructor(private fileUploadService: FileUploadService) {}

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadedFiles.push(file);
    }
  }

  async processFiles() {
    for (const file of this.uploadedFiles) {
      try {
        const data = await this.fileUploadService.processFile(file);
        this.createArrayOfObjectsFromString(data[0].text.toString()); // Convert data to string before passing it as an argument
        console.log('Processed data:', data);
      } catch (error) {
        console.error('Error processing file:', error);
      }
    }
  }

  createArrayOfObjectsFromString(inputString: string) {
    const values = inputString.split(','); // Split the string by commas

    // Iterate over each value and create an object with a key-value pair
    values.forEach((value, index) => {
      this.arrayOfObjects.push({ name: value.trim() });
      this.fileUploadService.stockNameList.next(this.arrayOfObjects); // Assuming you want to use index as key
      // If you have specific keys, replace 'index' with your desired key name
    });
  }
}
