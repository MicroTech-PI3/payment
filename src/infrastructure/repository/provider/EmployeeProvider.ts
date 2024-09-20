import IProvider from "../../../domain/interfaces/infrastructure/repository/provider/IProvider";
import DBIEmployee from "../../../domain/model/database/DBIEmployee";
import Employee from "../../../domain/model/employee/Employee";
import MySqlDBC from "../../../util/database/MySqlDBC";

export default class EmployeeProvider implements IProvider<Employee> {
  constructor(private readonly mySqlDBC: MySqlDBC) {}

  async findAll(): Promise<Employee[]> {
    return new Promise((resolve, reject) => {
      this.mySqlDBC
        .query<DBIEmployee>("SELECT * FROM EMPLOYEE")
        .then((result) => {
          resolve(
            result.map((employee) => {
              return new Employee(
                employee.NAME,
                employee.LASTNAME,
                employee.PHONE,
                employee.EMAIL,
                employee.ID,
                employee.ADDRESS
              );
            })
          );
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });
  }

  find(id: number): Promise<Employee> {
    return new Promise((resolve, reject) => {
      this.mySqlDBC
        .query<DBIEmployee>(`SELECT * FROM EMPLOYEE WHERE ID = ${id}`)
        .then((result) => {
          if (result.length === 0) {
            reject(new Error("Employee not found"));
          }
          const employee = result[0];
          resolve(
            new Employee(
              employee.NAME,
              employee.LASTNAME,
              employee.PHONE,
              employee.EMAIL,
              employee.ID,
              employee.ADDRESS
            )
          );
        });
    });
  }
}
