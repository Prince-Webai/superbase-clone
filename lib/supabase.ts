
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kkqhuabebrcseehyiqbj.supabase.co';
const supabaseAnonKey = 'sb_publishable_fAIKWmkEA0ye3uJD4f1TFQ_bQyjwsHk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
