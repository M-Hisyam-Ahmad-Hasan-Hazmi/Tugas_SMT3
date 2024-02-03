import Joi from "joi";

const createBookValidation = Joi.object({
  title: Joi.string().max(100).required(),
  penulis: Joi.string().max(100).required(),
  deskripsi: Joi.string().max(200).allow(''),
  tahunterbit: Joi.string().max(20).required(),
  kategori: Joi.string().max(100).allow(''),
  penerbit: Joi.string().max(100).allow(''),
});

const getBookValidation = Joi.number().positive().required();

const updateBookValidation = Joi.object({
  id: Joi.number().positive().required(),
  title: Joi.string().max(100).required(),
  penulis: Joi.string().max(100).required(),
  deskripsi: Joi.string().max(200).allow(''),
  tahunterbit: Joi.string().max(20).required(),
  kategori: Joi.string().max(100).allow(''),
  penerbit: Joi.string().max(100).allow(''),
});

const searchBookValidation = Joi.object({
  page: Joi.number().min(1).positive().default(1),
  size: Joi.number().min(1).positive().max(100).default(10),
  title: Joi.string().optional(),
  penulis: Joi.string().optional(),
  tahunterbit: Joi.string().optional(),
});

export {
  createBookValidation,
  getBookValidation,
  updateBookValidation,
  searchBookValidation,
};