export interface Item {
  name: string;
  description?: string;
  price: number;
  tax?: number;
}

export interface ApiResponse {
  message?: string;
  item_id?: number;
  q?: string;
  item?: Item;
  status?: string;
}
