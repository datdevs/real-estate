import { booleanAttribute, ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { UploaderService } from '../../core/services';
import { FileStore } from '../../store';
import { FilePreviewPipe } from '../../utils';

@Component({
  selector: 'app-file-uploader',
  imports: [MatIcon, FilePreviewPipe, MatIconButton, MatTooltip],
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploaderComponent {
  disabled = input(false, { transform: booleanAttribute });
  multiple = input(false, { transform: booleanAttribute });
  acceptedTypes = input<string>('*');
  placeholderText = input<string>('Drop your file here, or browse');
  selected = output<File[]>();

  files = signal<File[]>([]);

  readonly uploaderService = inject(UploaderService);

  private readonly store = inject(FileStore);

  onFileChange(event: Event) {
    if (this.disabled()) return;

    const {
      target: { files: rawFiles },
    } = event as Event & { target: HTMLInputElement };

    if (!rawFiles) return;

    if (!this.multiple()) {
      this.files.set([rawFiles[0]]);
    } else {
      this.files.update((prevFiles) => {
        const newFiles = Array.from(rawFiles).filter((file) => {
          const isDuplicate = prevFiles.some((prevFile) => prevFile.name === file.name);
          return !isDuplicate;
        });

        return [...prevFiles, ...newFiles];
      });
    }

    this.selected.emit(this.files());

    this._uploadFile();
  }

  onDeleteFile(file: File) {
    this.files.update((prevFiles) => {
      const newFiles = prevFiles.filter((f) => f.name !== file.name);
      return newFiles;
    });

    this.selected.emit(this.files());

    this.store.remove(file.name);
  }

  private _uploadFile() {
    const filesWasUploaded = this.files().filter((f) => !this.uploaderService.exists(f.name));

    filesWasUploaded.forEach((file) => {
      this.store.upload({ file });
    });
  }
}
