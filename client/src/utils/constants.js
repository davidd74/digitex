// export const BASE_URL = "http://192.168.8.103:5000";
export const production = true;

export const BASE_URL = production
  ? "https://digitex-server.vercel.app"
  : "http://localhost:5000";

export const PRODUCTS_URL = `${BASE_URL}/products`;
export const GET_ORDER_URL = `${BASE_URL}/orders`;
