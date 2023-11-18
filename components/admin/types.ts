export type AdminType = {
    id: number;
    first_name: string;
    last_name: string;
    profile_picture: string;
    created_at: string;
    username: string;
    email: string;
    phone: string;
    gender: string;
    email_verified_at: string | null;
    is_active: boolean;
    is_super: boolean;
}