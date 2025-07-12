const { createEntity } = require("./firestoreHelpers.js");

async function seedDropdowns() {
  const earningSources = [
    { name: "Donation" },
    { name: "Sponsorship" },
    { name: "Ticket" },
    { name: "Others" }
  ];
  const paymentMethods = [
    { name: "Cash" },
    { name: "UPI" },
    { name: "Bank" },
    { name: "Others" }
  ];

  for (const src of earningSources) {
    await createEntity("earningSources", src);
  }
  for (const pm of paymentMethods) {
    await createEntity("paymentMethods", pm);
  }
  console.log("Dropdown options seeded successfully.");
}

seedDropdowns();
