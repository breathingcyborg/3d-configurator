import { DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Dialog, DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { DownloadIcon } from "lucide-react";
import { LeadForm, LeadFormSchema } from "./lead-form";
import { useSimpleConfigurator } from "./context";
import { useEnvContext } from "./environment/context";
import { ConfiguratorStateJson } from "./configurator-state-json";
import { useState } from "react";
import { Link } from "react-router-dom";
import { createLead, CreateLeadRequest } from "@/leads/api";
import { SpecsPDF } from "./pdf/components/specs-pdf";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { buttonVariants } from "@/components/ui/button";

export function DownloadPopup({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) {
    const { model, product, values } = useSimpleConfigurator();
    const { coords, date, groundVisible, skyVisible, time } = useEnvContext();
    const [step, setStep] = useState<'form' | 'download'>('form');
    const [leadId, setLeadId] = useState<string | null>(null);
    const [leadData, setLeadData] = useState<LeadFormSchema | null>(null);

    const onSubmit = async (data: LeadFormSchema) => {

        const dataJson : ConfiguratorStateJson = {
            values,
            env: {
                date: date !== null ? date.toString() : null,
                coords,
                time,
                groundVisible,
                skyVisible,
            }
        }

        const request : CreateLeadRequest = {
            ...data,
            model: model.id,
            product: product.id,
            data: dataJson,
        }

        const { doc } = await createLead(request);       
        setLeadId(doc.id);
        setLeadData(data)
        setStep('download');
    }

    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[min(calc(100dvw-32px),600px)] max-h-[calc(100dvh-32px)] overflow-auto">
            <DialogHeader className="mb-6">
                <DialogTitle className="font-bold text-2xl flex gap-2 items-center mb-3">
                    <span className="hidden lg:inline-block">
                        <DownloadIcon/> 
                    </span>
                    <span>
                        Download PDF
                    </span>
                </DialogTitle>
                <DialogDescription className="text-left text-foreground/50">
                    {
                        step === 'form' && (
                            <p>
                                Share your contact information to download this configuration as pdf.
                            </p>
                        )
                    }
                    {
                        step === 'download' && (
                            <p>
                                Your PDF is ready.
                            </p>
                        )
                    }
                </DialogDescription>
            </DialogHeader>
            <div>
                {
                    step === 'form' && (
                        <LeadForm onSubmit={onSubmit} />
                    )
                }
                {
                    step === 'download' && leadId !== null && leadData !== null && (
                        <div className="flex gap-4">
                            <PDFDownloadLink
                                className={buttonVariants({ size: 'lg' })} 
                                target="__blank"
                                document={
                                    (
                                        <SpecsPDF
                                            model={model}
                                            product={product}
                                            values={values}
                                            leadId={leadId} 
                                            lead={leadData}
                                        />
                                    )
                                }
                            >
                                {
                                    ({ loading }) => loading ? 'Loading document...' : 'Download PDF'
                                }
                            </PDFDownloadLink>
                            <Link 
                                className={buttonVariants({ variant: 'secondary' })}
                                to={`/configs/${leadId}`}
                            >
                                3d Viewer Link
                            </Link>
                        </div>
                    )
                }
            </div>
        </DialogContent>
    </Dialog>
}