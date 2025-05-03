// JavaScript source code

import React, { useEffect, useState } from 'react';

const ManageCustomers = () => {
    const [customers, setCustomers] = useState([]);

    // code to fetch customers from the database
    const fetchCustomers = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/customers');
            const data = await response.json();
            console.log("Fetched customers:", data);
            setCustomers(data);
        } catch (error) {
            console.error("Error fetching customers:", error);
        }
    };

    // Delete customers
    const handleDelete = async (customerId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/customers/${customerId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert("Customer deleted successfully!");
                setCustomers(customers.filter(customer => customer._id !== customerId));
            } else {
                alert("Failed to delete customer.");
            }
        } catch (error) {
            console.error("Error deleting customer:", error);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);
    //graphics for customers page - doesn't match the rest of the site yet
    return (
        <div>
            <h1>Customer List</h1>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Car ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer => (
                        <tr key={customer._id}>
                            <td>{customer.firstName}</td>
                            <td>{customer.lastName}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.carId}</td>
                            <td>
                                <button onClick={() => handleDelete(customer._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageCustomers;
