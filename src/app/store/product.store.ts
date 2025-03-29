import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Notify } from 'notiflix';
import { pipe, switchMap, tap } from 'rxjs';
import { OPERATION_STATE } from '../core/constant';
import { RealEstateService } from '../core/services';
import { ProductFilter, RealEstate, RealEstateRequest } from '../models';
import { OperationStatus } from '../models/types';

type ProductStore = {
  realEstates: {
    results: RealEstate[];
    total: number;
    isLoading: boolean;
  };
  filter: ProductFilter;
  createRealEstateStatus: {
    status: OperationStatus;
    inProgress: boolean;
  };
};

const initialState: ProductStore = {
  realEstates: {
    results: [],
    total: 0,
    isLoading: true,
  },
  filter: {
    page: 0,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  },
  createRealEstateStatus: {
    status: OPERATION_STATE.Idle,
    inProgress: false,
  },
};

export const ProductStore = signalStore(
  { protectedState: false },
  withState(initialState),
  withMethods((store, realEstateService = inject(RealEstateService)) => {
    const updateFilter = (filter: ProductFilter) => {
      patchState(store, (state) => ({ ...state, filter: { ...state.filter, ...filter } }));
      loadProduct({});
    };

    const resetCreateProductStatus = () => {
      patchState(store, (state) => ({
        ...state,
        createRealEstateStatus: { status: OPERATION_STATE.Idle, inProgress: false },
      }));
    };

    const loadProduct = rxMethod<Partial<{ clearCache: boolean }>>(
      pipe(
        tap(() => patchState(store, (state) => ({ ...state, realEstates: { ...state.realEstates, isLoading: true } }))),
        switchMap(({ clearCache }) => {
          return realEstateService.getRealEstate(store.filter(), clearCache).pipe(
            tapResponse({
              next: ({ results: realEstates, total }) =>
                patchState(store, (state) => ({
                  ...state,
                  realEstates: { ...state.realEstates, results: realEstates, total, isLoading: false },
                })),
              error: () => {
                patchState(store, (state) => ({ ...state, realEstates: { ...state.realEstates, isLoading: false } }));
              },
            }),
          );
        }),
      ),
    );

    const createProduct = rxMethod<{ data: RealEstateRequest }>(
      pipe(
        tap(() =>
          patchState(store, (state) => ({
            ...state,
            createRealEstateStatus: { ...state.createRealEstateStatus, inProgress: true },
          })),
        ),
        switchMap(({ data }) => {
          return realEstateService.createRealEstate(data).pipe(
            tapResponse({
              next: () => {
                patchState(store, (state) => ({
                  ...state,
                  createRealEstateStatus: { status: OPERATION_STATE.Success, inProgress: false },
                }));
                Notify.success('Real estate was created successfully');
                loadProduct({ clearCache: true });
              },
              error: (err: HttpErrorResponse) => {
                patchState(store, (state) => ({
                  ...state,
                  createRealEstateStatus: { status: OPERATION_STATE.Failure, inProgress: false },
                }));
                Notify.failure(err.error.message || err.message);
              },
            }),
          );
        }),
      ),
    );

    return { loadProduct, updateFilter, createProduct, resetCreateProductStatus };
  }),
);
