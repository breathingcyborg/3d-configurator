export function getEnumOptions<T extends string>(enumLabels: Record<T, string>): { label: string, value: string }[] {
    const entries = Object.entries(enumLabels) as [string, string][]
    return entries.map(([value, label]) => ({
        label,
        value,
    }));
}