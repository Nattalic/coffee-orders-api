export class UpdateOrderDto {
  item?: string;
  quantity?: number; // ? significa opcional
  status?: 'pending' | 'ready';
}
