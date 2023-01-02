export interface ICategory {
  id: number;
  tile: string;
}

export interface IProduct {
  id: number;
  title: string;
  author: string;
}
export interface IEditingProduct {
  id: number;
  title?: string;
  author?: string;
}
export interface IContext<T> {
  data : T[] 
}
