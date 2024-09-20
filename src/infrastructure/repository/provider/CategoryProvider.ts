import IProvider from "../../../domain/interfaces/infrastructure/repository/provider/IProvider";
import Category from "../../../domain/model/category/Category";
import DBICategory from "../../../domain/model/database/DBICategory";
import MySqlDBC from "../../../util/database/MySqlDBC";

export default class CategoryProvider implements IProvider<Category> {
  constructor(private readonly mySqlDBC: MySqlDBC) {}

  async findAll(): Promise<Category[]> {
    return new Promise((resolve, reject) => {
      this.mySqlDBC
        .query<DBICategory>("SELECT * FROM CATEGORY")
        .then((result) => {
          resolve(
            result.map((category) => {
              return new Category(
                category.NAME,
                category.DESCRIPTION,
                category.ID
              );
            })
          );
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });
  }

  find(id: number): Promise<Category> {
    return new Promise((resolve, reject) => {
      this.mySqlDBC
        .query<DBICategory>(`SELECT * FROM CATEGORY WHERE ID = ${id}`)
        .then((result) => {
          if (result.length === 0) {
            reject(new Error("Category not found"));
          }
          const category = result[0];
          resolve(
            new Category(category.NAME, category.DESCRIPTION, category.ID)
          );
        });
    });
  }
}
