import { queryFetch } from "@/utilities/fetcher";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const apiUrl = process.env.LIBRARY_URL;
  const authKey = process.env.LIBRARY_AUTH_KEY;
  const { searchParams } = new URL(request.url);
  const isbn = searchParams.get("isbn");
  const region = searchParams.get("region");
  const pageNo = searchParams.get("pageNo");

  if (isbn && region) {
    const response = await queryFetch(
      "GET",
      `${apiUrl}/libSrchByBook?authKey=${authKey}&isbn=${isbn}&region=${region}&format=json&pageNo=${pageNo}&pageSize=10`
    );
    return new NextResponse(JSON.stringify(response.response), {
      status: 201,
    });
  }

  return new NextResponse("Not found", { status: 404 });
};
