import { userType } from "@/redux/slices/auth";

export type CategoryPrpos = {
    id: number;
    title: string;
    section_id: number;
    parent_id?: number;
    is_active: boolean;
}

type Comments = {
    id: number;
    comment: string;
    blog_id: number;
    replay_id?: number;
    is_active: 1 | 0;
    created_at: string;
    user?: userType;
    admin?: userType;
}

type CommentWithReplay = Comments & { replays: Comments[] };

export type Blog = {
    id: number;
    admin_id?: number;
    user_id?: number;
    category_id: number;
    title: string;
    slug: string;
    article: string;
    body: string;
    image?: string;
    meta_keywords: string;
    is_active: 0 | 1;
    user?: userType;
    admin?: userType;
    cat: CategoryPrpos;
    comments: CommentWithReplay[];
    is_favorite: boolean;
}