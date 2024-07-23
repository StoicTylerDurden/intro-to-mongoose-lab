// Imported Modules
const prompt = require('prompt-sync')();
const dotenv = require("dotenv").config(); 
const mongoose = require('mongoose');
const Customer = require("./models/customer.js");


const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
};


const createCustomer = async () => {
    const customerName = prompt("What is the customer's name: ");
    const customerAge = prompt("What is the customer's age: ");
    const customers = [{ name: customerName, age: customerAge }];
    await Customer.create(customers);
    customerApp();
};


const viewCustomers = async () => {
    const customers = await Customer.find();

    customers.forEach( (customer) => {
         console.log(`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`)
        });
    customerApp();
};

const updateCustomer = async () => {
    const customers = await Customer.find();
    console.log("Below is a list of customers:");

    customers.forEach( (customer) => {
         console.log(`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`)
        });

    const customerId = prompt('Copy and paste the id of the customer you would like to update here: ');
    const customerNameUpdate = prompt("What is the customer's new name? ");
    const customerAgeUpdate = prompt("What is the customer's new age? ");
    await Customer.findByIdAndUpdate(customerId, { name: customerNameUpdate, age: customerAgeUpdate });
    customerApp();
};

const deleteCustomer = async () => {
    const customers = await Customer.find();
    customers.forEach( (customer) => {
         console.log(`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`)
        });

    const customerId = prompt('Copy and paste the id of the customer you would like to delete here: ');
    await Customer.findByIdAndDelete(customerId);
    customerApp();
};

const customerApp = async () => {
    console.log('\nWelcome to the CRM \n\nWhat would you like to do?\n  1. Create a customer\n  2. View all customers\n  3. Update a customer\n  4. Delete a customer\n  5. Quit\n');
    const Option = prompt('Number of action to run: ');
    await connect();

    if (Option === '1') {
        await createCustomer();

      } else if (Option === '2') {
        await viewCustomers();

      } else if (Option === '3') {
        await updateCustomer();

      } else if (Option === '4') {
        await deleteCustomer();

      } else if (Option === '5') {
        await mongoose.connection.close();
        console.log('exiting...');
        process.exit();
        
      } else {
        console.log('Please try again');
      }
};

customerApp();
