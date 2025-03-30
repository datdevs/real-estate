import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UploaderService {
  progressMap = signal(new Map<string, { percent: number; success: boolean }>());
  failedFiles = signal<string[]>([]);

  updateProgress(fileName: string, percent: number, success: boolean) {
    this.progressMap.update(() => {
      const map = new Map(this.progressMap());
      map.set(fileName, { percent, success });
      return map;
    });
  }

  removeProgress(fileName: string) {
    this.progressMap.update((map) => {
      const newMap = new Map(map);
      newMap.delete(fileName);
      return newMap;
    });
  }

  exists(fileName: string) {
    return !!this.progressMap().get(fileName);
  }

  clearProgress() {
    this.progressMap.update(() => new Map<string, { percent: number; success: boolean }>());
    this.failedFiles.update(() => []);
  }

  updateFailedFiles(fileName: string) {
    this.failedFiles.update((files) => {
      if (!files.includes(fileName)) {
        return [...files, fileName];
      }
      return files;
    });
  }
}
