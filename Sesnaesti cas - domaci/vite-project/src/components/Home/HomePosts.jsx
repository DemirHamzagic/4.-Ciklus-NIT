import "../../styles/HomePage.css";
export const HomePosts = () => {
	const news = [
		{
			title: "Vest1",
			description: "blablabla1",
		},
		{
			title: "Vest2",
			description:
				"loremsakdoksadkaosfjgfjwoijdjwajdwadijaoiwjdijwqijdoiwajdijwaloremsakdoksadkaosfjgfjwoijdjwajdwadijaoiwjdijwqijdoiwajdijwaloremsakdoksadkaosfjgfjwoijdjwajdwadijaoiwjdijwqijdoiwajdijwaloremsakdoksadkaosfjgfjwoijdjwajdwadijaoiwjdijwqijdoiwajdijwaloremsakdoksadkaosfjgfjwoijdjwajdwadijaoiwjdijwqijdoiwajdijwa",
		},
		{
			title: "Vest3",
			description: "blablabla3",
		},
		{
			title: "Vest4",
			description: "blablabla4",
		},
		{
			title: "Vest5",
			description: "blablabla5",
		},
	];
	return (
		<div className="postContainer">
			{news.map((el, index) => {
				return (
					<div key={index} className="postDiv">
						<h1 className="postTitle">{el.title}</h1>
						<p className="postDesc">{el.description}</p>
					</div>
				);
			})}
		</div>
	);
};
