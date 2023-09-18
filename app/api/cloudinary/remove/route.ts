import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(request: Request) {
  const { public_id } = await request.json();

  if(!public_id) {
    return NextResponse.json(
      { message: "Can not remove previous image" },
      { status: 400 }
    )
  }

  console.log(public_id, "public_id public_id, public_id")

  try {
    await cloudinary.uploader.destroy(public_id);

    return NextResponse.json({ message: "Successfully remove previous image" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}