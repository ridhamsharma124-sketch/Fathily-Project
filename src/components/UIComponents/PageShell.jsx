import React from "react";

/* ==========================================================================
   RESPONSIVE PAGE PRIMITIVES
   Shared layout building blocks so every admin page behaves the same way on
   small screens: the header stacks, the toolbar wraps, grids collapse and
   wide tables scroll instead of pushing the page sideways.
   ========================================================================== */

/**
 * Page frame for an admin page.
 * `min-w-0` + `overflow-x-clip` stop wide children (tables, boards) from
 * stretching the flex row in DashboardLayout and causing a page-wide
 * horizontal scrollbar.
 */
export function PageShell({ children, className = "", ...rest }) {
  return (
    <div
      className={`flex min-h-screen w-full min-w-0 flex-col gap-4 overflow-x-clip px-4 py-4 sm:gap-5 sm:px-6 sm:py-6 ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

/**
 * Page title block with an optional action area on the right.
 * On mobile the actions drop below the title and stretch full width.
 */
export function PageHeader({
  title,
  description,
  actions,
  breadcrumb,
  className = "",
  titleClassName = "text-xl font-bold text-[#0A0847]",
}) {
  return (
    <div
      className={`flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 ${className}`}
    >
      <div className="min-w-0">
        {breadcrumb}
        <h1 className={`${titleClassName} break-words`}>{title}</h1>
        {description && (
          <p className="mt-2 text-sm font-medium text-[#0A084799]">{description}</p>
        )}
      </div>
      {actions && (
        <div className="flex w-full shrink-0 flex-wrap items-center gap-2 sm:w-auto sm:justify-end">
          {actions}
        </div>
      )}
    </div>
  );
}

/**
 * Responsive stat card row. Collapses to 1 column, then 2, then 4.
 */
export function StatGrid({ children, columns = 4, className = "" }) {
  const cols =
    {
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
      5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
    }[columns] || "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
  return (
    <div className={`grid gap-4 ${cols} ${className}`}>{children}</div>
  );
}

/**
 * Filter / search bar. Wraps its children instead of overflowing.
 */
export function Toolbar({ children, className = "" }) {
  return (
    <div
      className={`flex w-full min-w-0 flex-wrap items-center gap-2 sm:gap-3 ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * Horizontally scrollable region for wide tables.
 * `min-w-0` keeps it from stretching its flex/grid parent.
 */
export function TableScroll({ children, className = "", ...rest }) {
  return (
    <div
      className={`w-full min-w-0 overflow-x-auto overscroll-x-contain ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

/**
 * Horizontal tab strip. Scrolls on narrow screens instead of wrapping
 * into an unpredictable second row.
 */
export function TabStrip({ children, className = "" }) {
  return (
    <div
      className={`flex w-full min-w-0 items-center gap-3 overflow-x-auto pb-1 ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * Action button row (Save / Preview / Submit). Wraps and lets buttons grow
 * to fill the row on mobile instead of overflowing.
 */
export function ActionRow({ children, className = "" }) {
  return (
    <div
      className={`flex w-full min-w-0 flex-wrap items-center gap-2 sm:gap-3 ${className}`}
    >
      {children}
    </div>
  );
}
