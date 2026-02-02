// TEMP in-memory store (server memory)
global.valentineStore = global.valentineStore || {}

export async function POST(req) {
  const { id, action } = await req.json()

  if (!global.valentineStore[id]) {
    global.valentineStore[id] = {
      opened: true,
      response: null,
      time: new Date().toISOString()
    }
  }

  if (action === "YES" || action === "NO") {
    global.valentineStore[id].response = action
    global.valentineStore[id].time = new Date().toISOString()
  }

  return Response.json({ success: true })
}

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")

  return Response.json(global.valentineStore[id] || {})
}
