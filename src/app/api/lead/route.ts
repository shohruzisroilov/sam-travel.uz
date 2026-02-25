import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone required" },
        { status: 400 },
      );
    }

    const BX_ENDPOINT =
      "https://samtravel.bitrix24.kz/rest/13/2bdfbb9qfnkmjwtw/crm.lead.add.json";

    const data = {
      fields: {
        TITLE: `С сайта: ${name}`,
        NAME: name,
        PHONE: [{ VALUE: phone, VALUE_TYPE: "WORK" }],
      },
      params: { REGISTER_SONET_EVENT: "Y" },
    };

    const res = await fetch(BX_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (result.error) {
      return NextResponse.json(
        { error: result.error, error_description: result.error_description },
        { status: 400 },
      );
    }

    return NextResponse.json({ success: true, lead: result.result });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Server error", message: err },
      { status: 500 },
    );
  }
}
