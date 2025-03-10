import { getAllModels } from "@/catalog/api"
import { FullPageLoader } from "@/components/ui/full-page-loader";
import { Model,  } from "@/payload-types";
import { Link } from "react-router-dom";
import useSWR from "swr"

export function Models() {

    const { data, isLoading } = useSWR('/api/models', async () => {


        const response = await getAllModels();

        return {
            models: response?.docs || []
        }
    });


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

    return <div className="container">
        <div className="my-4">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {
                    data.models?.map(model => (
                        <ModelCard key={model.id} model={model} />
                    ))
                }
            </div>
        </div>
    </div>
}


function ModelCard({ model } : { model: Model }) {
    const url = `/models/${model.id}`;

    return <div className="bg-card text-card-foreground shadow rounded-lg overflow-clip relative">
        <Link to={url} className="absolute inset-0 w-full h-full">
        </Link>
        <h2 className="text-2xl p-4">
            { model.title }
        </h2>
    </div>
}
