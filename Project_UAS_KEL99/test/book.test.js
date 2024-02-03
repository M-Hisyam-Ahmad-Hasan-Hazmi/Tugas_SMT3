import {
  createManyTestBooks,
  createTestBook,
  createTestUser,
  getTestBook,
  removeAllTestBooks,
  removeTestUser,
} from "./test-util.js";
import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";

describe("POST /api/books", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeAllTestBooks();
    await removeTestUser();
  });

  it("should can create new book", async () => {
    const result = await supertest(web)
      .post("/api/books")
      .set("Authorization", "test")
      .send({
        title: "test",
        penulis: "test",
        deskripsi: "test",
        tahunterbit: "2000",
        kategori: "test",
        penerbit: "test",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.title).toBe("test");
    expect(result.body.data.penulis).toBe("test");
    expect(result.body.data.deskripsi).toBe("test");
    expect(result.body.data.tahunterbit).toBe("2000");
    expect(result.body.data.kategori).toBe("test");
    expect(result.body.data.penerbit).toBe("test");
  });

  it("should reject if request is not valid", async () => {
    const result = await supertest(web)
      .post("/api/books")
      .set("Authorization", "test")
      .send({
        title: "",
        penulis: "",
        deskripsi: "",
        tahunterbit: "",
        kategori: "",
        penerbit: "",
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/books/:bookId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestBook();
  });

  afterEach(async () => {
    await removeAllTestBooks();
    await removeTestUser();
  });

  it("should can get book", async () => {
    const testBook = await getTestBook();

    const result = await supertest(web)
      .get("/api/books/" + testBook.id)

      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testBook.id);
    expect(result.body.data.title).toBe(testBook.title);
    expect(result.body.data.penulis).toBe(testBook.penulis);
    expect(result.body.data.deskripsi).toBe(testBook.deskripsi);
    expect(result.body.data.tahunterbit).toBe(testBook.tahunterbit);
    expect(result.body.data.kategori).toBe(testBook.kategori);
    expect(result.body.data.penerbit).toBe(testBook.penerbit);
  });

  it("should return 404 if book id is not found", async () => {
    const testBook = await getTestBook();

    const result = await supertest(web)
      .get("/api/books/" + (testBook.id + 1))
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});

describe("PUT /api/books/:bookId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestBook();
  });

  afterEach(async () => {
    await removeAllTestBooks();
    await removeTestUser();
  });

  it("should can update existing books", async () => {
    const testbBook = await getTestbBook();

    const result = await supertest(web)
      .put("/api/books/" + testBook.id)
      .set("Authorization", "test")
      .send({
        title: "Habis Gelap Terbitlah Terang",
        penulis: "K.H. Agus Salim",
        deskripsi: "Habis Gelap Terbitlah Terang Adalah...",
        tahunterbit: "1927",
        kategori: "Buku Motivasi",
        penerbit: "Gramedia Pustaka Utama",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testBook.id);
    expect(result.body.data.title).toBe("Habis Gelap Terbitlah Terang");
    expect(result.body.data.penulis).toBe("K.H. Agus Salim");
    expect(result.body.data.deskripsi).toBe("Habis Gelap Terbitlah Terang Adalah...");
    expect(result.body.data.tahunterbit).toBe("1927");
    expect(result.body.data.kategori).toBe("Buku Motivasi");
    expect(result.body.data.penerbit).toBe("Gramedia Pustaka Utama");
  });

  it("should reject if request is invalid", async () => {
    const testBook = await getTestBook();

    const result = await supertest(web)
      .put("/api/books/" + testBook.id)
      .set("Authorization", "test")
      .send({
        title: "",
        penulis: "",
        deskripsi: "",
        tahunterbit: "",
        kategori: "",
        penerbit: "",
      });

    expect(result.status).toBe(400);
  });

  it("should reject if books is not found", async () => {
    const testBook = await getTestBook();

    const result = await supertest(web)
      .put("/api/books/" + (testBook.id + 1))
      .set("Authorization", "test")
      .send({
        title: "Habis Gelap Terbitlah Terang",
        penulis: "K.H. Agus Salim",
        deskripsi: "Habis Gelap Terbitlah Terang Adalah...",
        tahunterbit: "1927",
        kategori: "Buku Motivasi",
        penerbit: "Faiz Novascotia Saripudin",
      });

    expect(result.status).toBe(404);
  });
});

describe("DELETE /api/books/:booksId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestBook();
  });

  afterEach(async () => {
    await removeAllTestBooks();
    await removeTestUser();
  });

  it("should can delete book", async () => {
    let testBook = await getTestBook();
    const result = await supertest(web)
      .delete("/api/books/" + testBook.id)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");

    testBook = await getTestBook();
    expect(testBook).toBeNull();
  });

  it("should reject if book is not found", async () => {
    let testBook = await getTestBook();
    const result = await supertest(web)
      .delete("/api/books/" + (testBook.id + 1))
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});

describe("GET /api/books", function () {
  beforeEach(async () => {
    await createTestUser();
    await createManyTestBooks();
  });

  afterEach(async () => {
    await removeAllTestBooks();
    await removeTestUser();
  });

  it("should can search without parameter", async () => {
    const result = await supertest(web)
      .get("/api/books")
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(10);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_item).toBe(15);
  });

  it("should can search to page 2", async () => {
    const result = await supertest(web)
      .get("/api/books")
      .query({
        page: 2,
      })
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(5);
    expect(result.body.paging.page).toBe(2);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_item).toBe(15);
  });

  it("should can search using title", async () => {
    const result = await supertest(web)
      .get("/api/books")
      .query({
        name: "test 1",
      })
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });

  it("should can search using penulis", async () => {
    const result = await supertest(web)
      .get("/api/books")
      .query({
        penulis: "test1",
      })
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });

  it("should can search using tahunterbit", async () => {
    const result = await supertest(web)
      .get("/api/books")
      .query({
        tahunterbit: "2001",
      })
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });
});