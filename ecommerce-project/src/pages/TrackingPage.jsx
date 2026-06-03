import axios from "axios";
import dayjs from "dayjs";
import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import "./Tracking.css";

export function TrackingPage({ cart }) {
  const [order, setOrder] = useState(null);
  const { orderId, productId } = useParams();

  useEffect(() => {
    const fetchTrackingData = async () => {
      const response = await axios.get(`api/orders/${orderId}?expand=products`);
      setOrder(response.data);
    };

    fetchTrackingData();
  }, [orderId]);

  if (!order) {
    return null;
  }
  const selectedProduct = order.products.find(
    (item) => item.productId === productId,
  );

  const totalDeliveryTimeMs =
    selectedProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;
  let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;
  if (deliveryPercent > 100) {
    deliveryPercent = 100;
  }

  let isPreparing = false;
  let isShipped = false;
  let isDelivered = false;
  if (deliveryPercent < 33) {
    isPreparing = deliveryPercent;
  } else if (deliveryPercent >= 33 && deliveryPercent < 100) {
    isShipped = deliveryPercent;
  } else if (deliveryPercent === 100) {
    isDelivered = deliveryPercent;
  }
  return (
    <>
      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            {deliveryPercent === 100
              ? "Delivered"
              : `Arriving on ${dayjs(selectedProduct.estimatedDeliveryTime).format("dddd, MMMM D")}`}{" "}
          </div>

          <div className="product-info">{selectedProduct.product.name}</div>

          <div className="product-info">
            Quantity: {selectedProduct.quantity}
          </div>

          <img className="product-image" src={selectedProduct.product.image} />

          <div className="progress-labels-container">
            <div
              className={
                isPreparing ? "progress-label current-status" : "progress-label"
              }
            >
              Preparing
            </div>
            <div
              className={
                isShipped ? "progress-label current-status" : "progress-label"
              }
            >
              Shipped
            </div>
            <div
              className={
                isDelivered ? "progress-label current-status" : "progress-label"
              }
            >
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${deliveryPercent}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
