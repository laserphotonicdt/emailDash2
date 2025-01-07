import OverViewPage from "./_components/overview";

export const metadata = {
  title: "Dashboard : Overview",
};

export default function page() {
  return <OverViewPage />;
  const error = console.error;
  console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };
}
