import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.SMTP_API_KEY;
  const apiUrl = "https://api.smtp.com/v4/analytics";

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data from SMTP.com API");
    }

    const data = await response.json();

    // Process the data as needed
    const processedData = {
      sent: data.sent || 0,
      delivered: data.delivered || 0,
      opened: data.opened || 0,
      clicked: data.clicked || 0,
    };

    return NextResponse.json(processedData);
  } catch (error) {
    console.error("Detailed error:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Internal Server Error", details: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        {
          error: "Internal Server Error",
          details: "An unknown error occurred",
        },
        { status: 500 }
      );
    }
  }
}
