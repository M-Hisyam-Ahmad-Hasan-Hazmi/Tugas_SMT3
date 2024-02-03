# Book API Spec

## Create Book API

Endpoint : POST /api/books

Headers :

- Authorization : token

Request Body :

```json
{
  "title": "Habis Gelap Terbitlah terang",
  "penulis": "K.H. Agus Salim",
  "deskripsi": "Habis Gelap Terbitlah Terang adalah...",
  "tahunterbit": "1927",
  "kategori": "Buku Motivas",
  "penerbit": "Gramedia Pustaka Utama"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "title": "Habis Gelap Terbitlah terang",
    "penulis": "K.H. Agus Salim",
    "deskripsi": "Habis Gelap Terbitlah Terang adalah...",
    "tahunterbit": "1927",
    "kategori": "Buku Motivas",
    "penerbit": "Gramedia Pustaka Utama"
  }
}
```

Response Body Error :

```json
{
  "errors": "taunterbir is invalid"
}
```

## Update Book API

Endpoint : PUT /api/books/:id

Headers :

- Authorization : token

Request Body :

```json
{
  "title": "Habis Gelap Terbitlah terang",
  "penulis": "K.H. Agus Salim",
  "deskripsi": "Habis Gelap Terbitlah Terang adalah...",
  "tahunterbit": "1927",
  "kategori": "Buku Motivas",
  "penerbit": "Gramedia Pustaka Utama"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "title": "Habis Gelap Terbitlah terang",
    "penulis": "K.H. Agus Salim",
    "deskripsi": "Habis Gelap Terbitlah Terang adalah...",
    "tahunterbit": "1927",
    "kategori": "Buku Motivas",
    "penerbit": "Gramedia Pustaka Utama"
  }
}
```

Response Body Error :

```json
{
  "errors": "Year is invalid"
}
```

## Get Book API

Endpoint : GET /api/books/:id

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "title": "Habis Gelap Terbitlah terang",
    "penulis": "K.H. Agus Salim",
    "deskripsi": "Habis Gelap Terbitlah Terang adalah...",
    "tahunterbit": "1927",
    "kategori": "Buku Motivas",
    "penerbit": "Gramedia Pustaka Utama"
  }
}
```

Response Body Error :

```json
{
  "errors": "Book is not found"
}
```

## Search Books API

Endpoint : GET /api/books

Headers :

- Authorization : token

Query params :

- title : Search by title using like, optional
- penerbit : Search by penerbit using like, optional
- year : Search by year using like, optional
- page : number of page, default 1
- size : size per page, default 10

Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "title": "Habis Gelap Terbitlah terang",
      "penulis": "K.H. Agus Salim",
      "deskripsi": "Habis Gelap Terbitlah Terang adalah...",
      "tahunterbit": "1927",
      "kategori": "Buku Motivas",
      "penerbit": "Gramedia Pustaka Utama"
    },
    {
      "id": 2,
      "title": "Habis Gelap Terbitlah terang",
      "penulis": "K.H. Agus Salim",
      "deskripsi": "Habis Gelap Terbitlah Terang adalah...",
      "tahunterbit": "1927",
      "kategori": "Buku Motivas",
      "penerbit": "Gramedia Pustaka Utama"
    }
  ],
  "paging": {
    "page": 1,
    "total_page": 3,
    "total_item": 30
  }
}
```

Response Body Error :

## Remove Profile API

Endpoint : DELETE /api/books/:id

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": "OK"
}
```

Response Body Error :

```json
{
  "errors": "Books is not found"
}
```