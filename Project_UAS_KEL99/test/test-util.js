import { prismaClient } from "../src/application/database.js";
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      username: "test",
    },
  });
};

export const createTestUser = async () => {
  await prismaClient.user.create({
    data: {
      username: "test",
      password: await bcrypt.hash("rahasia", 10),
      name: "test",
      token: "test",
    },
  });
};

export const getTestUser = async () => {
  return prismaClient.user.findUnique({
    where: {
      username: "test",
    },
  });
};

export const removeAllTestBooks = async () => {
  await prismaClient.book.deleteMany({
    where: {
      username: "test",
    },
  });
};

export const createTestBook = async () => {
  await prismaClient.book.create({
    data: {
      title: "test",
      penulis: "test",
      deskripsi: "test",
      tahunterbit: "2000",
      kategori: "test",
      penerbit: "test",
    },
  });
};

export const createManyTestBooks = async () => {
  for (let i = 0; i < 15; i++) {
    await prismaClient.book.create({
      data: {
        username: `test`,
        title: `test ${i}`,
        penulis: `test ${i}`,
        deskripsi: `test ${i}`,
        tahunterbit: `2000${i}`,
        kategori: `test${i}`,
        penerbit: `test${i}`,
      },
    });
  }
};

export const getTestBook = async () => {
  return prismaClient.book.findFirst({
    where: {
      username: "test",
    },
  });
};