import "./UserFooter.css"

export default function UserFooter() {
	return (
		<>
		<footer className="footer">
			<div className="container">
				<div className="row">
					<div className="col-md-4">
						<h4>About Us</h4>
						<p>R U Hungry is a food delivery company operating in Singapore that aims to provide customers with a hassle-free and convenient dining experience.</p>
					</div>
					<div className="col-md-4">
						<h4>Contact</h4>
						<p>Address: WKWSCI, Nanyang Technological University, Singapore</p>
						<p>Name: Zhang Xinlei (MSc in Information Systems)</p>
						<p>Course: IN6225 Enterprise Application and Development	</p>
						<p>Phone: +65 8884 1234</p>
						<p>Email: W220026@e.ntu.edu.sg</p>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
							<hr />
							<p className="text-center">R U Hungry © 2023 Company, Inc. All Rights Reserved.</p>
					</div>
				</div>
			</div>
		</footer>
		</>
	)

}
