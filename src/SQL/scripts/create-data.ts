import { neon } from "@neondatabase/serverless";

const sql = neon(String(process.env.DATABASE_URL));

async function createTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS data (
        id SERIAL PRIMARY KEY,
        data VARCHAR(100) NOT NULL
      );
    `;

    console.log('Table "data" created successfully');
  } catch (error) {
    console.error("Failed to create table:", error);
    process.exit(1);
  }
}

async function seedData() {
  try {
    await sql`
      INSERT INTO data (data)
      VALUES
        ('apple'),
        ('banana'),
        ('orange');
    `;

    console.log("🍎🍌🍊 Data inserted successfully");
  } catch (error) {
    console.error("Failed to insert data:", error);
    process.exit(1);
  }
}

createTable();
seedData();
