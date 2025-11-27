export const NotFoundPage = () => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				height: "90vh",
				justifyContent: "center",
			}}
		>
			<div
				style={{
					textAlign: "center",
					backgroundColor: " rgb(255, 240, 212)",
					boxShadow: "0 0.7rem 1rem rgb(180, 147, 88)",
					borderRadius: "2rem",
					padding: "1rem",
				}}
			>
				<h1 style={{ marginBottom: "0", fontSize: "	4rem" }}>404</h1>
				<p style={{ fontSize: "1.5rem" }}>Stranica ne postoji</p>
			</div>
		</div>
	);
};
