import Pusher from "pusher"
import NextCors from "nextjs-cors"


export default async function handler(req, res) {
	const {message,sender} = req.body

	await NextCors(req,res,{
		methods:["POST","GET"],
		origin:"*"
	})

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID, 
	key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
	cluster: "eu",
  useTLS: true
});

await pusher.trigger("my-channel", "update-chat", {
  message, 
sender
});
  res.status(200).json({ name: 'Mission Complete' })
}
