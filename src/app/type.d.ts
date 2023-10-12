export type Books = {
  no: number;
  ranking: string;
  bookname: string;
  authors: string;
  publisher: string;
  publication_year: string;
  publication_date?: string;
  isbn?: string;
  isbn13: string;
  addition_symbol?: string;
  vol: string;
  class_no?: string;
  class_nm?: string;
  loan_count: string;
  bookImageURL: string;
  bookDtlUrl: string;
  description?: string;
};

export type Lib = {
  libCode: string;
  libName: string;
  address: string;
  tel: string;
  fax: string;
  latitude: string;
  longitude: string;
  homepage: string;
  closed: string;
  operatingTime: string;
};
