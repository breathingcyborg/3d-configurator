import { Configurator } from "@/configurator";
import { getModelById } from "@/catalog/api";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { FullPageLoader } from "@/components/ui/full-page-loader";

export function ModelPage() {

    const { id } = useParams();

    const {
        data,
        isLoading,
    } = useSWR(['/models', id], async (key) => {
        const id = key[1];
        if (id === undefined) {
            return null;
        }
        return getModelById(id);
    })

    if (isLoading) {
        return <div className="flex w-screen h-screen">
            <FullPageLoader />
        </div> 
    }

    if (!data) {
        return <div className="flex w-full h-full justify-center items-center">
            <span>No Data</span>
        </div>
    }
    
    return <Configurator
        model={data}
    />
}