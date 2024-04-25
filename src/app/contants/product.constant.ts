import { Product } from "../interfaces/product.interface";

export const mockProducts: Product[] = [
  {
    id: '100',
    name: 'Cuentas de ahorro tradicionales',
    description: 'Tasa de interes mas bajo',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR36b6ZBLCuL5k7eo20kd-_lolP3WdJ148VDLfJbkqfew&s',
    date_release: '2024-04-14T00:00:00.000+00:00',
    date_revision: '2025-04-14T00:00:00.000+00:00'
  },
  {
    id: '1002',
    name: 'Prestamo',
    description: 'Prestamo Credito',
    logo: 'https://kapitalizateya.com/wp-content/uploads/2023/06/prestamo.jpeg',
    date_release: '2024-04-20T00:00:00.000+00:00',
    date_revision: '2025-05-01T00:00:00.000+00:00'
  },
  {
    id: 'trj-mnd-20',
    name: 'Visa Mileage Plus',
    description: 'acumula millas y viaja por el mundo',
    logo: 'https://www.copaair.com/assets/Banco-General-Signature.png',
    date_release: '2023-06-07T00:00:00.000+00:00',
    date_revision: '2024-06-07T00:00:00.000+00:00'
  },
];
