import * as React from "react";

const SubscriptionIcon = (props: any) => (
  <svg
    width={24}
    height={25}
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M2 5.5C2 5.23478 2.10536 4.98043 2.29289 4.79289C2.48043 4.60536 2.73478 4.5 3 4.5H21C21.2652 4.5 21.5196 4.60536 21.7071 4.79289C21.8946 4.98043 22 5.23478 22 5.5V19.5C22 19.7652 21.8946 20.0196 21.7071 20.2071C21.5196 20.3946 21.2652 20.5 21 20.5H3C2.73478 20.5 2.48043 20.3946 2.29289 20.2071C2.10536 20.0196 2 19.7652 2 19.5V5.5Z"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinejoin="round"
    />
    <path
      d="M2 8.5H22"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="square"
      strokeLinejoin="round"
    />
    <path
      d="M13.5 16.5H18M22 5.5V13.5M2 5.5V13.5"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SubscriptionIcon;
