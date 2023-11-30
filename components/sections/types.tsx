import { CategoryPrpos } from "@/app/categories/types";

export type sectionPrpos = {
    id: number;
    title: string;
    is_active: boolean;
}

export type Section = sectionPrpos & {
    categories: CategoryPrpos[]
};