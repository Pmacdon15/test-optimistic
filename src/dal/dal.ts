import { neon } from "@neondatabase/serverless";
import { cacheTag } from "next/cache";
import type { Data } from "@/types/data-types";

export async function fetchData(): Promise<Data[]> {
  "use cache";
  cacheTag("data");
  const sql = neon(String(process.env.DATABASE_URL));
  try {
    return (await sql`
      SELECT * FROM data;
    `) as Data[];

    // console.log('Table "data" created successfully');
  } catch (error) {
    console.error("Failed to fetch table:", error);
    process.exit(1);
  }
}
