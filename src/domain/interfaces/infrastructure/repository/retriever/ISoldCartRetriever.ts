import SoldCart from "../../../../model/soldCart/SoldCart";

export default interface ISoldCartRetriever {
  getSoldCart(id: number): Promise<SoldCart>;
  getSoldCarts(): Promise<SoldCart[]>;
}
