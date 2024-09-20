import ISoldCartRetriever from "../../../domain/interfaces/infrastructure/repository/retriever/ISoldCartRetriever";
import SoldCart from "../../../domain/model/soldCart/SoldCart";
import SoldCartProvider from "../provider/SoldCartProvider";

export default class SoldCartRetriever implements ISoldCartRetriever {
  constructor(private readonly soldCartProvider: SoldCartProvider) {}

  async getSoldCart(id: number): Promise<SoldCart> {
    return await this.soldCartProvider.find(id);
  }
  async getSoldCarts(): Promise<SoldCart[]> {
    return await this.soldCartProvider.findAll();
  }
}
