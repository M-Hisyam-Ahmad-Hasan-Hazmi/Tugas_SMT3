import { validate } from "../validation/validation.js";
import {
  createBookValidation,
  getBookValidation,
  searchBookValidation,
  updateBookValidation,
} from "../validation/book-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const create = async (user, request) => {
  const book = validate(createBookValidation, request);
  book.username = user.username;

  return prismaClient.book.create({
    data: book,
    select: {
      id: true,
      title: true,
      penulis: true,
      deskripsi: true,
      tahunterbit: true,
      kategori: true,
      penerbit: true,
    },
  });
};

const get = async (user, booksId) => {
  booksId = validate(getBookValidation, booksId);

  const book = await prismaClient.book.findFirst({
    where: {
      username: user.username,
      id: booksId,
    },
    select: {
      id: true,
      title: true,
      penulis: true,
      deskripsi: true,
      tahunterbit: true,
      kategori: true,
      penerbit: true,
    },
  });

  if (!book) {
    throw new ResponseError(404, "book is not found");
  }

  return book;
};

const update = async (user, request) => {
  const book = validate(updateBookValidation, request);

  const totalBookInDatabase = await prismaClient.book.count({
    where: {
      username: user.username,
      id: book.id,
    },
  });

  if (totalBookInDatabase !== 1) {
    throw new ResponseError(404, "book is not found");
  }

  return prismaClient.book.update({
    where: {
      id: book.id,
    },
    data: {
      title: book.title,
      penulis: book.penulis,
      deskripsi: book.deskripsi,
      tahunterbit: book.tahunterbit,
      kategori: book.kategori,
      penerbit: book.penerbit,
    },
    select: {
      id: true,
      title: true,
      penulis: true,
      deskripsi: true,
      tahunterbit: true,
      kategori: true,
      penerbit: true,
    },
  });
};

const remove = async (user, booksId) => {
  booksId = validate(getBookValidation, booksId);

  const totalInDatabase = await prismaClient.book.count({
    where: {
      username: user.username,
      id: booksId,
    },
  });

  if (totalInDatabase !== 1) {
    throw new ResponseError(404, "book is not found");
  }

  return prismaClient.book.delete({
    where: {
      id: booksId,
    },
  });
};

const search = async (user, request) => {
  request = validate(searchBookValidation, request);

  // 1 ((page - 1) * size) = 0
  // 2 ((page - 1) * size) = 10
  const skip = (request.page - 1) * request.size;

  const filters = [];

  filters.push({
    username: user.username,
  });

  if (request.title) {
    filters.push({
      title: {
        contains: request.title,
      },
    });
  }
  if (request.penulis) {
    filters.push({
      penulis: {
        contains: request.penulis,
      },
    });
  }
  if (request.tahunterbit) {
    filters.push({
      tahunterbit: {
        contains: request.tahunterbit,
      },
    });
  }

  const books = await prismaClient.book.findMany({
    where: {
      AND: filters,
    },
    take: request.size,
    skip: skip,
  });

  const totalItems = await prismaClient.book.count({
    where: {
      AND: filters,
    },
  });

  return {
    data: books,
    paging: {
      page: request.page,
      total_item: totalItems,
      total_page: Math.ceil(totalItems / request.size),
    },
  };
};

export default {
  create,
  get,
  update,
  remove,
  search,
};