import { findById } from "@/leads/api";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { Configurator } from "..";
import { Model, Product } from "@/payload-types";
import { ConfiguratorStateJson } from "../configurator-state-json";

export function SavedConfigPage() {
    const { leadId } = useParams();

    const { isLoading, error, data } = useSWR(
        leadId ? ['leads', leadId] : null, 
        (key) => {
            const id = key[1];
            return findById(id);
        }
    );

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Something went wrong</div>
    }

    if (!data || !data.model || !data.product) {
        return <div>Depth parameter too low</div>
    }

    return <div>
        <Configurator
            model={data.model as Model}
            product={data.product as Product}
            savedState={data.data as ConfiguratorStateJson}
        />
    </div>
}