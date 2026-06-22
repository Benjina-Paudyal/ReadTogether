import connection from "../configs/knex-config.js";
export const CategoryModel = {
  getAll() {
    return connection("Category").select("*");
  },

  getById(id) {
    return connection("Category").where({ id }).first();
  },

  create(data) {
    return connection("Category").insert(data).returning("*");
  },

  delete(id) {
    return connection("Category").where({ id }).del();
  },
  
};

// Benjina Paudyal (Dependency) so wait

// export const BookModel = {
//   getAll() {
//     return connection("books");
//   },

//   getByCategory(category_id) {
//     return connection("books")
//       .where({ category_id })
//       .select("*");
//   }
// };