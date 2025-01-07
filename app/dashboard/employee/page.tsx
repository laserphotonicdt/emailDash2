import EmployeeListingPage from "./_components/employee-listing-page";

export const metadata = {
  title: "Dashboard : Employees",
};

export default function EmployeePage() {
  // Pass empty array - client component will handle fetching
  return <EmployeeListingPage employees={[]} />;
}
