import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { PRODUCT_CATEGORIES, PRODUCT_TYPES } from '../../core/constant';
import { FileStore } from '../../store';
import { FileUploaderComponent } from '../file-uploader/file-uploader.component';
import { FormService } from './services/form.service';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInput, MatSelect, MatOption, MatIcon, FileUploaderComponent],
  providers: [FileStore],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFormComponent {
  formRowClass = 'grid grid-cols-1 gap-x-5 gap-y-3 sm:grid-cols-2';

  readonly typeOptions = PRODUCT_TYPES;
  readonly categoryOptions = PRODUCT_CATEGORIES;

  readonly formService = inject(FormService);
  selectedFile: File | null = null;
  private readonly fireStore = inject(FileStore);

  constructor() {
    effect(() => {
      if (this.fireStore.files() && this.selectedFile) {
        const fileUrl = this.fireStore.files()[this.selectedFile.name];

        if (fileUrl) {
          this.formService.form.get('imageUrl')?.setValue(fileUrl);
        }
      }
    });
  }

  uploadFile(files: File[]) {
    this.selectedFile = files[0];
  }
}
