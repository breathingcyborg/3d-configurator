import client from "@/lib/api/client";
import { PaginatedDocs } from "@/payload-other-types";
import { Texture } from "@/payload-types";

export async function getAllTextures() {
    const { data } = await client.get<PaginatedDocs<Texture>>('/textures', {
        params: {
            limit: 1000,
            page: 1,
            depth: 1,
        }
    });
    return data.docs;
}