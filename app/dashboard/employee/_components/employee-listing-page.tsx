"use client";

import { useEffect, useState } from 'react';
import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Employee } from '@/constants/data';
import { fakeUsers } from '@/constants/mock-api';
import { searchParamsCache } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import EmployeeTable from './employee-tables';


type TEmployeeListingPage = {
  employees: Employee[];
};

// export default async function EmployeeListingPage({}: TEmployeeListingPage) {
  export default function EmployeeListingPage({ employees }: TEmployeeListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('q');
  const gender = searchParamsCache.get('gender');
  const pageLimit = searchParamsCache.get('limit');
  // const [employees, setEmployees] = useState<Employee[]>([]);
  // const [totalUsers, setTotalUsers] = useState(0);
  const totalUsers = employees.length;
  
  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(gender && { genders: gender })
  };

  // mock api call
  //const data = await fakeUsers.getUsers(filters);
  //const totalUsers = data.total_users;
  //const employee: Employee[] = data.users;

  // const employees = await getEmployees();
  // const totalUsers = employees.length;

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Employee (${totalUsers})`}
            description="Manage employees (Server side table functionalities.)"
          />

          <Link
            href={'/dashboard/employee/new'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <EmployeeTable data={employees} totalData={totalUsers} />
      </div>
    </PageContainer>
  );
}
