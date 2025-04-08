"use server"

// In-memory storage for emails (will reset on server restart)
// This is a simple fallback when database options fail
const emailStore = new Set<string>()

export async function readWaitlistEmails(): Promise<string[]> {
  try {
    return Array.from(emailStore)
  } catch (error) {
    console.error("Error reading waitlist data:", error)
    return []
  }
}

export async function addWaitlistEmail(email: string): Promise<boolean> {
  try {
    emailStore.add(email)
    return true
  } catch (error) {
    console.error("Error adding email to waitlist:", error)
    return false
  }
}
