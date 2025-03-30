import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Notify } from 'notiflix';
import { concatMap, pipe } from 'rxjs';
import { FileService } from '../core/services';

type FileStoreState = {
  files: {
    [key: string]: string;
  };
};

const initialState: FileStoreState = {
  files: {},
};

export const FileStore = signalStore(
  { protectedState: false },
  withState(initialState),
  withMethods((store, fileService = inject(FileService)) => {
    const upload = rxMethod<{ file: File }>(
      pipe(
        concatMap(({ file }) => {
          return fileService.upload(file).pipe(
            tapResponse({
              next: (resp) => {
                patchState(store, (state) => ({ ...state, files: { ...state.files, [file.name]: resp.fileUrl } }));
                Notify.success('File uploaded successfully');
              },
              error: (err: HttpErrorResponse) => {
                Notify.failure(err?.error?.message || 'File upload failed');
              },
            }),
          );
        }),
      ),
    );

    const remove = (fileName: string) => {
      patchState(store, (state) => {
        const { [fileName]: _, ...rest } = state.files;
        return { ...state, files: rest };
      });
    };

    return { upload, remove };
  }),
);
