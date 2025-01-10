import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filters = Object.fromEntries(searchParams.entries());

  const supabase = createRouteHandlerClient({ cookies });

  let query = supabase
    .from("campaigns")
    .select(
      `
      id,
      date,
      campaign_name_id,
      subject_line,
      owner,
      status,
      total_emails_sent,
      total_emails_delivered,
      total_emails_opened,
      total_clicks,
      deliverability,
      open_rate,
      clickthrough_rate
    `,
    )
    .order("date", { ascending: false });

  // Apply filters
  if (filters.industry) {
    query = query.eq("industry", filters.industry);
  }
  if (filters.vertical) {
    query = query.eq("vertical", filters.vertical);
  }
  if (filters.owner) {
    query = query.eq("owner", filters.owner);
  }
  if (filters.status) {
    query = query.eq("status", filters.status);
  }
  if (filters.mailServer) {
    query = query.eq("mail_server", filters.mailServer);
  }
  if (filters.search) {
    query = query.ilike("campaign_name_id", `%${filters.search}%`);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Transform snake_case to camelCase to match column definitions
  const transformedData = data?.map((campaign: any) => ({
    ...campaign,
    campaign_name_id: campaign.campaign_name_id,
    subjectLine: campaign.subject_line,
  }));

  return NextResponse.json(transformedData);
}
