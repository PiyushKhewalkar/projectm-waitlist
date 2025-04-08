"use server"

import { z } from "zod"
import { revalidatePath } from "next/cache"
import { addWaitlistEmail } from "./file-storage"

// Schema for form validation
const FormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

// Initialize Supabase client
let supabaseClient: any = null

// We'll initialize Supabase in the action itself to avoid issues with require/import
async function getSupabaseClient() {
  if (supabaseClient) return supabaseClient

  try {
    if (
      typeof process.env.NEXT_PUBLIC_SUPABASE_URL === "string" &&
      process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith("http") &&
      typeof process.env.SUPABASE_SERVICE_ROLE_KEY === "string" &&
      process.env.SUPABASE_SERVICE_ROLE_KEY.length > 0
    ) {
      // Use dynamic import instead of require
      const { createClient } = await import("@supabase/supabase-js")
      supabaseClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
      return supabaseClient
    }
  } catch (error) {
    console.error("Failed to initialize Supabase client:", error)
  }

  return null
}

export async function subscribeToWaitlist(formData: FormData) {
  try {
    // Extract and validate email
    const email = formData.get("email") as string
    const validatedFields = FormSchema.safeParse({ email })

    if (!validatedFields.success) {
      return {
        success: false,
        message: "Please enter a valid email address",
      }
    }

    let usedFallback = true

    // Try Supabase first if available
    const supabase = await getSupabaseClient()
    if (supabase) {
      try {
        const { error } = await supabase.from("waitlist").insert([{ email, joined_at: new Date().toISOString() }])

        if (!error) {
          usedFallback = false
        } else {
          console.error("Supabase insert error:", error)
        }
      } catch (supabaseError) {
        console.error("Error using Supabase:", supabaseError)
      }
    }

    // If Supabase failed or isn't available, use file storage
    if (usedFallback) {
      const success = await addWaitlistEmail(email)
      if (!success) {
        throw new Error("Failed to store email")
      }
    }

    revalidatePath("/")

    return {
      success: true,
      message: "Thank you for joining our waitlist!",
      showModal: true,
    }
  } catch (error) {
    console.error("Error submitting to waitlist:", error)
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    }
  }
}
