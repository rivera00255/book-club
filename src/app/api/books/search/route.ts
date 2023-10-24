import { queryFetch } from "@/utilities/fetcher";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const apiUrl = process.env.NEXT_PUBLIC_LIBRARY_URL;
  const authKey = process.env.NEXT_PUBLIC_LIBRARY_AUTH_KEY;
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  const author = searchParams.get("author");
  const pageNo = searchParams.get("pageNo");

  if (title) {
    const response = await queryFetch(
      "GET",
      `${apiUrl}/srchBooks?authKey=${authKey}&pageNo=${pageNo}&pageSize=20&format=json&title=${title}`
    );
    return new NextResponse(JSON.stringify(response.response), {
      status: 201,
    });
  }

  if (author) {
    const response = await queryFetch(
      "GET",
      `${apiUrl}/srchBooks?authKey=${authKey}&pageNo=${pageNo}&pageSize=20&format=json&author=${author}`
    );
    return new NextResponse(JSON.stringify(response.response), {
      status: 201,
    });
  }

  return new NextResponse("Not found", { status: 404 });
};
