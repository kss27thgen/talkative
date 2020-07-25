import React, { useState } from "react";
import img from "../images/logo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { CSSTransition } from "react-transition-group";

const Header = () => {
	const [sidebar, setSidebar] = useState(false);
	const [overlay, setOverlay] = useState(false);

	return (
		<header className="mainHeader">
			<p>
				<img src={img} alt="logo" className="logo" />
			</p>
			<ul>
				<li>
					<Link to="/top">Top</Link>
				</li>
				<li>
					<FontAwesomeIcon
						icon={faBars}
						onClick={() => {
							setOverlay(true);
							setSidebar(true);
						}}
					/>
				</li>
			</ul>
			{overlay && (
				<section
					className="overlay"
					onClick={() => {
						setOverlay(false);
						setSidebar(false);
					}}
				></section>
			)}
			<CSSTransition
				in={sidebar}
				timeout={500}
				classNames="fade"
				unmountOnExit
			>
				<section className="sidebar">
					<div className="sidebarWrapper">
						<form>
							<input type="text" />
						</form>
						<ul>
							<li>aaaaaaaaa</li>
							<li>eeeeeeee</li>
						</ul>
					</div>
				</section>
			</CSSTransition>
		</header>
	);
};

export default Header;
