import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EnvironmentSettingsForm } from "./environment-settings-form";
import { SunIcon } from "lucide-react";

export function EnvironmentSettingsPopup({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) {
    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    <span className="flex gap-2 items-center">
                        <SunIcon />
                        Environment Settings
                    </span>
                </DialogTitle>
            </DialogHeader>
            <div className="my-4">
                <EnvironmentSettingsForm />
            </div>
        </DialogContent>
    </Dialog>
}