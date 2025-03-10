import { Loader2Icon } from "lucide-react";

export function FullPageLoader({ text = 'Loading...' } : { text?: string }) {
    return (
        <div className="flex items-center justify-center flex-1">
            <div className="flex flex-col items-center gap-2 justify-center">
                <Loader2Icon
                    className="animate-spin text-primary"
                    size={50}
                />
                <div className="text-foreground/50">
                    { text }
                </div>
            </div>
        </div>
    )
}