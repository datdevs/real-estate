import { FormControl } from '@angular/forms';

export type RealEstateFormType = {
  name: FormControl<string>;
  type: FormControl<string>;
  category: FormControl<string>;
  description: FormControl<string>;
  location: FormControl<string>;
  price: FormControl<number>;
  imageUrl: FormControl<string>;
  quantity: FormControl<number>;
};
