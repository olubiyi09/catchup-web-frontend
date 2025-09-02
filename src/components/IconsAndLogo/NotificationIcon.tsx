import * as React from "react";

const NotificationIcon = (props: any) => (
  <svg
    width={24}
    height={25}
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6 19.5V10.5C6 8.9087 6.63214 7.38258 7.75736 6.25736C8.88258 5.13214 10.4087 4.5 12 4.5C13.5913 4.5 15.1174 5.13214 16.2426 6.25736C17.3679 7.38258 18 8.9087 18 10.5V19.5M6 19.5H18M6 19.5H4M18 19.5H20M11 22.5H13"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 4.5C12.5523 4.5 13 4.05228 13 3.5C13 2.94772 12.5523 2.5 12 2.5C11.4477 2.5 11 2.94772 11 3.5C11 4.05228 11.4477 4.5 12 4.5Z"
      stroke="currentColor"
      strokeWidth={2}
    />
  </svg>
);

export default NotificationIcon;
