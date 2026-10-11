"use client";

import clsx from "clsx";
import { m } from "framer-motion";
import { useId, useState, type ReactNode } from "react";
import { ChevronDown } from "./icons";

export type AccordionItem = { id: string; title: ReactNode; content: ReactNode };

type AccordionProps = {
  items: AccordionItem[];
  defaultOpen?: number[];
  allowMultiple?: boolean;
  /** Heading element wrapping each trigger, for document outline */
  headingLevel?: "h3" | "h4";
  className?: string;
  itemClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
  /** Show the divider line under each item (FAQ style) */
  divided?: boolean;
};

/**
 * Collapsed panels stay in the server HTML (height 0 + inert), so their text is crawlable (§11.1).
 */
export function Accordion({
  items,
  defaultOpen = [],
  allowMultiple = false,
  headingLevel: Heading = "h3",
  className,
  itemClassName,
  triggerClassName,
  contentClassName,
  divided = true,
}: AccordionProps) {
  const [open, setOpen] = useState<number[]>(defaultOpen);
  const baseId = useId();

  const toggle = (index: number) =>
    setOpen((current) =>
      current.includes(index)
        ? current.filter((i) => i !== index)
        : allowMultiple
          ? [...current, index]
          : [index],
    );

  return (
    <div className={className}>
      {items.map((item, index) => {
        const isOpen = open.includes(index);
        const triggerId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;
        return (
          <div key={item.id} className={clsx(divided && "border-b border-line", itemClassName)}>
            <Heading className="m-0">
              <button
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className={clsx(
                  "flex w-full cursor-pointer items-center justify-between gap-4 text-left",
                  triggerClassName,
                )}
              >
                <span className="min-w-0">{item.title}</span>
                <ChevronDown
                  className={clsx(
                    "size-4 shrink-0 transition-transform duration-250",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
            </Heading>
            <m.div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              inert={!isOpen}
              initial={false}
              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className={contentClassName}>{item.content}</div>
            </m.div>
          </div>
        );
      })}
    </div>
  );
}
