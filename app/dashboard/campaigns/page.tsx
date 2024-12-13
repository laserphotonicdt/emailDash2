import { searchParamsCache } from '@/lib/searchparams';
import { SearchParams } from 'nuqs/parsers';
import React from 'react';
import CampaignListingPage from './_components/campaign-listing-page';

type PageProps = {
  searchParams: SearchParams;
};

export const metadata = {
  title: 'Dashboard : Campaigns'
};

export default async function Page({ searchParams }: PageProps) {
  searchParamsCache.parse(searchParams);

  return <CampaignListingPage />;
}
