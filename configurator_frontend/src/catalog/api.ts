import { PaginatedDocs } from "@/payload-other-types";
import client from "../lib/api/client";
import { Model } from '@/payload-types';

export async function getAllModels() {
    const { data } = await client.get<PaginatedDocs<Model>>('/models', {
        params: {
            limit: 100,
            page: 1,
        }
    })
    return data;
}


export async function getModelById(id: string) {

    const { data } = await client.get<Model | null>(`/models/${id}`, {
        params: {
            depth: 3,
        }
    })

    return data;
}
