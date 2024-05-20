// OrderHistory.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { firestore } from '../../firebase/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

const OrderHistory = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (currentUser) {
        // Construct a query to get orders for the current user
        const ordersRef = query(collection(firestore, 'orders'), where('userId', '==', currentUser.uid));
        try {
          const querySnapshot = await getDocs(ordersRef);
          const ordersData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setOrders(ordersData);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      }
    };

    fetchOrders();
  }, [currentUser]);

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.length > 0 ? (
        orders.map(order => (
          <div key={order.id}>
            <p>Order ID: {order.id}</p>
            {/* Additional order details can be displayed here */}
          </div>
        ))
      ) : (
        <p>No orders found</p>
      )}
    </div>
  );
};

export default OrderHistory;
