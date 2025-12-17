// To run this script:
// 1. Execute in your terminal: node run-test.js
// 2. This file MUST be in the root of your project (same level as the 'src' folder).

// This file contains the test logic as a callable function.

// FIX: We use a named import { prisma } to match the named export in src/lib/prisma.ts.
// The path './src/lib/prisma' is correct assuming this file is in the project root.
import { prisma } from './src/lib/prisma';

export async function runDatabaseTest() {
  console.log("--- Starting Database Connection Test ---");

  try {
    // 1. Connection Verification (Read Count)
    // We use a simple count query on the 'User' model to verify connectivity and authentication.
    const userCount = await prisma.user.count();
    console.log(`\n✅ SUCCESS: Connection verified! Found ${userCount} existing User records.`);

    // 2. Write Operation (Create)
    const dummyUser = await prisma.user.create({
      data: {
        email: `test-${Date.now()}@example.com`,
        name: 'Test Runner',
      },
    });
    console.log(`📝 SUCCESS: Created new user with ID: ${dummyUser.id}`);
    
    // 3. Clean up Operation (Delete)
    await prisma.user.delete({
        where: { id: dummyUser.id }
    });
    console.log(`🗑️ SUCCESS: Cleaned up dummy user.`);

  } catch (error) {
    console.error("\n❌ FATAL ERROR: Database connection failed!");
    console.error("This often indicates issues with the DATABASE_URL or credentials in your .env file, or a networking issue with your Supabase server.");
    console.error("Error details:", error);
  } finally {
    // Essential: Disconnect the client to allow the script to exit cleanly.
    await prisma.$disconnect();
    console.log("\n--- Connection Test Finished ---");
  }
}

// NOTE: This function is exported, and it will be called by run-test.js.