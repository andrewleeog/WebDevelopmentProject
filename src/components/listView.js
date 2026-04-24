import React, { useState, useEffect } from 'react';
import { getInstructors, getCustomers, getPackages, getClasses } from '../api';

function ListView() {
    const [type, setType] = useState('instructors');
    const [data, setData] = useState([]);

    useEffect(() => {
        loadData();
    }, [type]);

    const loadData = async () => {
        try {
            if (type === 'instructors') setData(await getInstructors());
            else if (type === 'customers') setData(await getCustomers());
            else if (type === 'packages') setData(await getPackages());
            else if (type === 'classes') setData(await getClasses());
        } catch (err) {
            console.error(err);
        }
    };

    const getColumns = () => {
        if (type === 'instructors' || type === 'customers') {
            return ['ID', 'Name', 'Email', 'Phone'];
        }
        if (type === 'packages') {
            return ['Name', 'Category', 'Classes', 'Price'];
        }
        if (type === 'classes') {
            return ['ID', 'Instructor', 'Day', 'Time', 'Type'];
        }
        return [];
    };

    const getRow = (item) => {
        if (type === 'instructors' || type === 'customers') {
            return [item.instructorId || item.customerId, `${item.firstName} ${item.lastName}`, item.email, item.phone];
        }
        if (type === 'packages') {
            return [item.packageName, item.packageCategory, item.classCount, `$${item.price}`];
        }
        if (type === 'classes') {
            return [item.classId, item.instructorId, item.day, item.time, item.classType];
        }
        return [];
    };

    return (
        <div className="card">
            <h2>View Records</h2>
            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="instructors">Instructors</option>
                <option value="customers">Customers</option>
                <option value="packages">Packages</option>
                <option value="classes">Classes</option>
            </select>
            <table>
                <thead>
                    <tr>
                        {getColumns().map((col) => <th key={col}>{col}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item._id}>
                            {getRow(item).map((val, i) => <td key={i}>{val}</td>)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListView;