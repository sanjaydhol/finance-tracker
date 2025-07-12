import('./firestoreHelpers.ts').then(({ createEntity }) => {
  async function seedRoles() {
    const roles = [
      {
        name: "member",
        canRead: true,
        canWrite: false,
        description: "Member - can only read partially."
      },
      {
        name: "ec_member",
        canRead: true,
        canWrite: false,
        description: "EC Member - can read everything."
      },
      {
        name: "finance_member",
        canRead: true,
        canWrite: true,
        description: "Finance Member - can read and write to everything."
      }
    ];

    for (const role of roles) {
      await createEntity("roles", role);
    }
    console.log("Roles seeded successfully.");
  }

  seedRoles();
});
