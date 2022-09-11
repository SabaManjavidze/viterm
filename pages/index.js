import {useState,useEffect} from "react"
import Pusher from "pusher-js"
import axios from "axios"
import Chat from "../components/chat"


export default function Home() {
const [chat,setChat] = useState([])
const [sender,setSender] = useState("")


useEffect(()=>{
	const pusher=new Pusher(process.env.NEXT_PUBLIC_KEY,{
	cluster:"eu",
	})
	const channel=pusher.subscribe("my-channel")

	channel.bind("update-chat", (data)=>{
		setChat(
			[
			...chat,
		{
			sender:data.sender,
			message:data.message
		}
		])
	})
	return ()=>{
		channel.unsubscribe("my-channel")
	}
},[])

	const handleSubmit=async (e)=>{
		e.preventDefault()
		const data = new FormData(e.currentTarget)
		const username = data.get("sender")
		const message = data.get("message")

		if(!username || !message) return
		
		setSender(username)
		await axios.post("/api/socket",
			{
				sender:username,
				message
			}
		)
	}

  return (
	  <div  style={{
		width:"100%",
		display:"flex",
		justifyContent:"center",
		alignItems:"center",
	  }}>
	  <form onSubmit={handleSubmit} style={{
		flexDirection:"column"
	  }}
		  >
	  	<input autoFocus type="text" name="sender" style={{width:"100%",height:"35px"}} required placeholder="username" />
	  	<input type="text" name="message" style={{width:"100%",height:"35px"}} required placeholder="message" />
	  <button type="submit" style={{width:"100%",height:"35px"}}>
	  	gaushvi brat
	  </button>
	  </form>
	  <Chat chat={chat} sender={sender}/>
	  </div>
  )
}
