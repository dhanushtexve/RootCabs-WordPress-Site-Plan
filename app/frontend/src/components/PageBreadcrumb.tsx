import { Fragment } from "react";
import { Link } from "react-router-dom";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

export type PageBreadcrumbItem = {
  label: string;
  href?: string;
};

type PageBreadcrumbProps = {
  items: PageBreadcrumbItem[];
  className?: string;
};

export function PageBreadcrumb({ items, className }: PageBreadcrumbProps) {
  if (!items.length) return null;

  return (
    <Breadcrumb className={cn("w-full", className)}>
      <BreadcrumbList className="justify-start">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <Fragment key={`${item.label}-${index}`}>
              <BreadcrumbItem>
                {item.href && !isLast ? (
                  <BreadcrumbLink asChild className="text-inherit transition-colors hover:text-current">
                    <Link to={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className="text-current font-medium">{item.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator className="text-current/60" />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
