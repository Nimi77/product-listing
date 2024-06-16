const ErrorIcon = () => (
<svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" fill="red" />
    <line
      x1="8"
      y1="8"
      x2="16"
      y2="16"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="16"
      y1="8"
      x2="8"
      y2="16"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
export default ErrorIcon;
