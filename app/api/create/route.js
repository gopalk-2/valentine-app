import { nanoid } from "nanoid"

export async function POST(req) {
  const { yourName, partnerName } = await req.json()

  const id = nanoid(8)

  const url = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/love/${id}`

  return Response.json({
    id,
    url,
    yourName,
    partnerName
  })
}
