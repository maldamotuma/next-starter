import { userType } from "@/redux/slices/auth";
import { AdminType } from "../admin/types";
import { UserType } from "../user/types";
import { CategoryPrpos } from "@/app/dashboard/categories/types";

type Comments = {
    id: number;
    comment: string;
    blog_id: number;
    replay_id?: number;
    is_active: 1 | 0;
    created_at: string;
    user?: UserType;
    admin?: AdminType;
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
    admin?: AdminType;
    cat: CategoryPrpos;
    comments: CommentWithReplay[];
    is_favorite: boolean;
}