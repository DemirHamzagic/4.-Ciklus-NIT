import "../../styles/HomePage.css";
export const HomeNewsDiv = () => {
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
	const arr = [...news].sort(() => Math.random() - 0.5).slice(0, 3);
	return (
		<div className="homeNews">
			{arr.map((e) => {
				return (
					<div className="newsDiv">
						<h1 className="newsTitle">{e.title}</h1>
						<p className="newsDesc">{e.description}</p>
					</div>
				);
			})}
		</div>
	);
};
