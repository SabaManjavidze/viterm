export default function Chat({chat,sender}){

	return (
		<div style={{
			padding:"10px 40px",
			width:"100%",
		}}>
		{
			chat.map(item=>(
				<div style={{
					color:"white",
					display:"flex",
					width:"100%",
					flexDirection:"column",
					alignItems:item.sender==sender?"flex-end":"flex-start"
				}} >
				<h5 style={{
					color:"gray",
					margin:0
				}}>{item.sender}</h5>
				<div style={{
					backgroundColor:item.sender==sender?"blue":"gray",
					padding:"10px 5px",
					borderRadius:"30%",
					width:"20%"
				}}>
				<h2 style={{margin:0}}>{item.message}</h2>
				</div>
				</div>
			))
		}
		</div>
	)
}
