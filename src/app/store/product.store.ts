import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { RealEstateService } from '../core/services';
import { ProductFilter, RealEstate } from '../models';

type ProductStore = {
  realEstates: RealEstate[];
  total: number;
  filter: ProductFilter;
  isLoading: boolean;
};

const initialState: ProductStore = {
  realEstates: [],
  total: 0,
  filter: {
    page: 0,
    limit: 10,
  },
  isLoading: true,
};

export const ProductStore = signalStore(
  { protectedState: false },
  withState(initialState),
  // withComputed(({ changelog, filterVersion }, sanitizer = inject(DomSanitizer)) => ({
  //   changelogSafe: computed<ChangelogHistory<SafeHtml> | null>(() => {
  //     const currentChangelog = changelog();
  //     const version = filterVersion();
  //
  //     return currentChangelog
  //       ? {
  //           ...currentChangelog,
  //           results: currentChangelog?.results
  //             ?.filter((c) => !version || c.framework.version === version)
  //             ?.map((c) => ({
  //               ...c,
  //               framework: {
  //                 ...c.framework,
  //                 html_content: c.framework.html_content
  //                   ? sanitizer.bypassSecurityTrustHtml(
  //                       '<style>' + c.framework.style_content + '</style>' + c.framework.html_content,
  //                     )
  //                   : null,
  //               },
  //             })),
  //         }
  //       : null;
  //   }),
  //
  //   versions: computed<OptionItem[]>(() => {
  //     return [
  //       { id: 0, name: 'All', value: '' },
  //       ...(changelog()?.results?.map((c) => ({
  //         id: c.framework.version,
  //         name: c.framework.version,
  //         value: c.framework.version,
  //       })) || []),
  //     ];
  //   }),
  // })),
  withMethods((store, realEstateService = inject(RealEstateService)) => {
    const updateFilter = (filter: ProductFilter) => {
      patchState(store, (state) => ({ ...state, filter: { ...state.filter, ...filter } }));
      loadProduct({});
    };

    const loadProduct = rxMethod<Partial<{ cache: boolean }>>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(({ cache }) => {
          return realEstateService.getRealEstate(store.filter(), cache).pipe(
            tapResponse({
              next: ({ results: realEstates, total }) => patchState(store, { realEstates, total, isLoading: false }),
              error: () => {
                patchState(store, { isLoading: false });
              },
            }),
          );
        }),
      ),
    );

    return { loadProduct, updateFilter };
  }),
);
