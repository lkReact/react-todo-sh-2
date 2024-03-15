export type CakeType = {
  id?: number;
  imageSource?: string;
  title?: string;
  price?: number;
  quantity?: number;
  isAvailable?: boolean;
  isAdvertised?: boolean;
};

export type CakeFormType = {
  name?: string;
  picture?: string;
  price?: number;
};

export type CakeBusType = { cake: CakeType | null };
