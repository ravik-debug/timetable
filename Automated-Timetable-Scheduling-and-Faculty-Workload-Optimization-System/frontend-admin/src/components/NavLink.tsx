// Import NavLink from react-router-dom and rename it to avoid name clash
import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";

// forwardRef allows passing refs to the underlying <a> element
import { forwardRef } from "react";

// cn is a utility function to combine class names conditionally
import { cn } from "@/lib/utils";

/* --------------------------------------------------
   CUSTOM NAVLINK PROPS
   Extends react-router's NavLinkProps
   Removes default className handling
-------------------------------------------------- */
interface NavLinkCompatProps extends Omit<NavLinkProps, "className"> {
  className?: string;        // Base class name
  activeClassName?: string;  // Class applied when link is active
  pendingClassName?: string; // Class applied when route is loading
}

/* --------------------------------------------------
   CUSTOM NAVLINK COMPONENT
   Adds backward-compatible className support
-------------------------------------------------- */
const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(

  // Destructure props
  ({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
    return (
      <RouterNavLink
        ref={ref}     // Forward ref to anchor tag
        to={to}       // Navigation target

        /* ------------------------------------------
           Dynamic className based on route state
           isActive  → current route
           isPending → route is loading
        ------------------------------------------ */
        className={({ isActive, isPending }) =>
          cn(
            className,                 // Always applied
            isActive && activeClassName,   // Applied if active
            isPending && pendingClassName  // Applied if pending
          )
        }

        // Pass remaining props (like onClick, end, etc.)
        {...props}
      />
    );
  },
);

/* --------------------------------------------------
   DISPLAY NAME (for React DevTools)
-------------------------------------------------- */
NavLink.displayName = "NavLink";

// Export the custom NavLink component
export { NavLink };
