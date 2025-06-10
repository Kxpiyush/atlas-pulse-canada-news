
import { supabase } from '../lib/supabase'

export const setupDatabase = async () => {
  try {
    console.log('Starting database setup...')

    // Test connection first
    const { data: testData, error: testError } = await supabase
      .from('admin_users')
      .select('count')
      .limit(1)

    if (testError) {
      console.error('Connection test failed:', testError)
      throw new Error('Failed to connect to Supabase. Please check your configuration.')
    }

    console.log('Connection successful, checking admin user...')

    // Check if admin user already exists
    const { data: existingAdmin, error: checkError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', 'kxpiyush@gmail.com')
      .single()

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking admin user:', checkError)
      throw checkError
    }

    if (!existingAdmin) {
      console.log('Creating admin user...')
      // Insert admin user
      const { error: insertError } = await supabase
        .from('admin_users')
        .insert([
          {
            email: 'kxpiyush@gmail.com',
            name: 'Piyush Kumar',
            role: 'admin'
          }
        ])

      if (insertError) {
        console.error('Error creating admin user:', insertError)
        throw insertError
      }
      console.log('Admin user created successfully!')
    } else {
      console.log('Admin user already exists')
    }

    // Check if we have any articles
    const { data: articles, error: articlesError } = await supabase
      .from('articles')
      .select('count')
      .limit(1)

    if (articlesError) {
      console.error('Error checking articles:', articlesError)
      // Don't throw here, articles table might not exist yet
    }

    console.log('Database setup completed successfully!')
    return { success: true }
  } catch (error) {
    console.error('Database setup failed:', error)
    return { 
      success: false, 
      error: error.message || 'Unknown error occurred'
    }
  }
}
