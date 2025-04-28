# LYGOS Node.js SDK

LYGOS is a lightweight Node.js SDK to easily interact with the LYGOS Payment API.  
It allows you to:
- Create payment links
- Check payment status
- Retrieve detailed payment information
- List all your transactions

## Installation

Run the following command to install dependencies:
```bash
npm install lygos
```

Import LYGOS into your project:

```javascript
const LYGOS = require('lygos'); 
const lygos = new LYGOS('YOUR_API_KEY');
```

## Where to get your API key

Create an account and get your API key from:  
[https://pay.lygosapp.com/dashboard/api-keys](https://pay.lygosapp.com/dashboard/api-keys)

## Available Methods

### 1. `initPayement(data)`

Create a new payment link.

**Parameters:**
- `amount` (Integer) — Required — Minimum: 100 XAF
- `shop_name` (String) — Required — Name of your shop
- `order_id` (String) — Required — Unique ID for your order
- `failure_url` (String) — Optional — URL to redirect on payment failure
- `success_url` (String) — Optional — URL to redirect on payment success
- `message` (String) — Optional — Custom message

**Example:**

```javascript
const payment = await lygos.initPayement({
    amount: 500,
    shop_name: "My Store",
    order_id: "ORDER12345",
    success_url: "https://yourwebsite.com/success",
    failure_url: "https://yourwebsite.com/failure",
    message: "Thank you for your purchase!"
});
console.log(payment);
```

---

### 2. `payementStatus(order_id)`

Check the current status of a payment ("pending", "success", "failed").

**Parameters:**
- `order_id` (String) — Required — The ID of your order

**Example:**

```javascript
const status = await lygos.payementStatus("ORDER12345");
console.log(status);
```

---

### 3. `getPayement(order_id)`

Get full details about a specific payment.

**Parameters:**
- `order_id` (String) — Required — The ID of your order

**Example:**

```javascript
const paymentDetails = await lygos.getPayement("ORDER12345");
console.log(paymentDetails);
```

---

### 4. `listOfPayement()`

List all your previous transactions.

**Example:**

```javascript
const allPayments = await lygos.listOfPayement();
console.log(allPayments);
```

---

## Error Handling

All methods handle errors and return a clear object:

```json
{
    "status": 400,
    "message": "amount is required"
}
```

---

## Full Example

```javascript
const LYGOS = require("lygos");
const lygos = new LYGOS('YOUR_API_KEY');

async function main() {
    const payment = await lygos.initPayement({
        amount: 1000,
        shop_name: "CypherX Store",
        order_id: "CYX-98765",
        success_url: "https://cypherx.com/success",
        failure_url: "https://cypherx.com/fail"
    });
    console.log(payment);

    const status = await lygos.payementStatus("CYX-98765");
    console.log(status);

    const details = await lygos.getPayement("CYX-98765");
    console.log(details);

    const transactions = await lygos.listOfPayement();
    console.log(transactions);
}

main();
```

---

## License

MIT License © 2025 — Developed by Warano

---

## Acknowledgements

- Thanks to [LYGOSAPP](https://lygosapp.com) for their API.
- Thanks to the Node.js community for libraries and tools.

---
