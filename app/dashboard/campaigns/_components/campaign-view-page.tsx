import { fakeCampaigns, Campaign } from "@/constants/mock-api";
import { notFound } from "next/navigation";
import CampaignForm from "./campaign-form";

type TCampaignViewPageProps = {
  campaignId: string;
};

export default async function CampaignViewPage({
  campaignId,
}: TCampaignViewPageProps) {
  let campaign = null;
  let pageTitle = "Create New Campaign";

  if (campaignId !== "new") {
    const data = await fakeCampaigns.getCampaignById(Number(campaignId));
    campaign = data.campaign as Campaign;
    if (!campaign) {
      notFound();
    }
    pageTitle = `Edit Campaign`;
  }

  return <CampaignForm initialData={campaign} pageTitle={pageTitle} />;
}
