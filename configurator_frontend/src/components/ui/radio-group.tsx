import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { CheckIcon, Circle } from "lucide-react"

import { cn } from "@/lib/utils/cn"
import { getTextColor } from "@/lib/utils/getTextColor"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

const RadioGroupItem2 = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  return (
    (<RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "rounded-sm px-2 py-1 border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state='checked']:bg-primary data-[state='checked']:text-primary-foreground",
        className
      )}
      {...props}>
      { children }
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>)
  );
})
RadioGroupItem2.displayName = RadioGroupPrimitive.Item.displayName

const RadioGroupItemImage = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  return (
    (<RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "rounded-sm px-2 py-1 border border-gray-300 ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state='checked']:border-primary data-[state='checked']:text-primary",
        className
      )}
      {...props}>
      { children }
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>)
  );
})
RadioGroupItemImage.displayName = RadioGroupPrimitive.Item.displayName

const RadioGroupItemColor = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, color, children, ...props }, ref) => {
  return (
    (<RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "rounded w-12 h-10 ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        "bg-[var(--color-background)] text-[var(--color-foreground)]",
        className
      )}
      style={{
        // @ts-ignore
        '--color-background': color,
        // @ts-ignore
        '--color-foreground': getTextColor(color),
      }}
      {...props}>
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <CheckIcon className="text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>)
  );
})
RadioGroupItemColor.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem, RadioGroupItem2, RadioGroupItemColor, RadioGroupItemImage }
