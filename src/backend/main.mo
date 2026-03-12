import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";

actor {
  type Product = {
    id : Nat;
    title : Text;
    price : Nat;
    quantity : Nat;
  };

  type Order = {
    id : Nat;
    customerName : Text;
    address : Text;
    mobile : Text;
    products : [Product];
    timestamp : Int;
  };

  let orders = Map.empty<Nat, Order>();
  var nextOrderId = 0;

  public shared ({ caller }) func submitOrder(customerName : Text, address : Text, mobile : Text, products : [Product]) : async () {
    let order : Order = {
      id = nextOrderId;
      customerName;
      address;
      mobile;
      products;
      timestamp = Time.now();
    };

    orders.add(nextOrderId, order);
    nextOrderId += 1;
  };

  public query ({ caller }) func getAllOrders() : async [Order] {
    orders.values().toArray();
  };

  public query ({ caller }) func getOrderById(id : Nat) : async Order {
    switch (orders.get(id)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) { order };
    };
  };

  public shared ({ caller }) func deleteOrder(id : Nat) : async () {
    if (not orders.containsKey(id)) {
      Runtime.trap("Order with given ID does not exist");
    };

    orders.remove(id);
  };
};
