export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      purchases: {
        Row: {
          id: string
          user_id: string | null
          stripe_checkout_session_id: string
          stripe_customer_id: string | null
          stripe_customer_email: string
          has_course: boolean
          has_assessment: boolean
          amount_total: number
          currency: string
          payment_status: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          stripe_checkout_session_id: string
          stripe_customer_id?: string | null
          stripe_customer_email: string
          has_course?: boolean
          has_assessment?: boolean
          amount_total: number
          currency?: string
          payment_status?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          stripe_checkout_session_id?: string
          stripe_customer_id?: string | null
          stripe_customer_email?: string
          has_course?: boolean
          has_assessment?: boolean
          amount_total?: number
          currency?: string
          payment_status?: string
          created_at?: string
        }
        Relationships: []
      }
      intake_forms: {
        Row: {
          id: string
          purchase_id: string | null
          user_id: string | null
          email: string
          full_name: string
          job_title: string
          income_bracket: string
          communication_goal: string
          assigned_coach: string | null
          calendly_link: string | null
          routing_reason: string | null
          created_at: string
        }
        Insert: {
          id?: string
          purchase_id?: string | null
          user_id?: string | null
          email: string
          full_name: string
          job_title: string
          income_bracket: string
          communication_goal: string
          assigned_coach?: string | null
          calendly_link?: string | null
          routing_reason?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          purchase_id?: string | null
          user_id?: string | null
          email?: string
          full_name?: string
          job_title?: string
          income_bracket?: string
          communication_goal?: string
          assigned_coach?: string | null
          calendly_link?: string | null
          routing_reason?: string | null
          created_at?: string
        }
        Relationships: []
      }
      course_access: {
        Row: {
          id: string
          user_id: string
          purchase_id: string
          access_granted_at: string
          is_active: boolean
        }
        Insert: {
          id?: string
          user_id: string
          purchase_id: string
          access_granted_at?: string
          is_active?: boolean
        }
        Update: {
          id?: string
          user_id?: string
          purchase_id?: string
          access_granted_at?: string
          is_active?: boolean
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
