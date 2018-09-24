import MembranaSDK, { OrderRequest, OrderSide } from './MembranaSDK';

class OrderBlank {
  public AMOUNT: number = 0;
  public LIMIT: number = 0;
  public SIDE: OrderSide = OrderSide.SELL;
  public SYMBOL: string;
  public TYPE = 'LIMIT' as 'LIMIT';

  private sdk: MembranaSDK;

  constructor(symbol: string, sdk: MembranaSDK) {
    this.sdk = sdk;
    this.SYMBOL = symbol;
    Object.defineProperty(this, 'sdk', { enumerable: false });
  }

  public amount(amount: number) {
    const clone = this.clone();
    clone.AMOUNT = amount;
    return clone;
  }

  public buy() {
    const clone = this.clone();
    clone.SIDE = OrderSide.BUY;
    return clone;
  }

  public clone(): OrderBlank {
    const clone = new OrderBlank(this.SYMBOL, this.sdk);
    Object.assign(clone, this);
    return clone;
  }

  public limit(limitPrice: number) {
    const clone = this.clone();
    clone.LIMIT = limitPrice;
    return clone;
  }

  public sell() {
    const clone = this.clone();
    clone.SIDE = OrderSide.SELL;
    return clone;
  }

  public send() {
    return this.sdk.placeOrder(this.toJSON());
  }

  public symbol(symbol: string) {
    const clone = this.clone();
    clone.SYMBOL = symbol;
    return clone;
  }

  public toJSON(): OrderRequest {
    return {
      amount: this.AMOUNT,
      limit: this.LIMIT,
      side: this.SIDE,
      symbol: this.SYMBOL,
      type: this.TYPE,
    };
  }
}

export default OrderBlank;