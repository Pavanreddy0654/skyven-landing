import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "outline";

const base =
  "inline-flex h-9 items-center justify-center px-5 font-body text-button font-medium uppercase transition duration-200 ease-out hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-60 motion-reduce:transition-none motion-reduce:hover:translate-y-0";

const variants: Record<Variant, string> = {
  primary:
    "border border-gold bg-linear-to-br from-btn-from to-btn-to text-btn-text shadow-glow hover:shadow-glow-strong",
  outline: "border border-ivory text-ivory hover:shadow-glow",
};

type ButtonProps = { variant?: Variant; className?: string } & (
  | ({ href: string } & Omit<ComponentPropsWithoutRef<"a">, "href" | "className">)
  | ({ href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, "className">)
);

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  const classes = clsx(base, variants[variant], className);

  if (props.href !== undefined) {
    const external = /^https?:\/\//.test(props.href);
    return (
      <a
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      />
    );
  }
  const { type = "button", ...rest } = props;
  return <button type={type} className={classes} {...rest} />;
}
