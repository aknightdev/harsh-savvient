import * as React from "react"
import { Link } from "gatsby"


const topBanner = (props) => {
	const sendemail = () => {
		//creating an invisible element
		var element = document.createElement('a');
		element.setAttribute('href', "/ebook.pdf");
		element.setAttribute('download', "ebook");

		// Above code is equivalent to
		// <a href="path of file" download="file name">

		document.body.appendChild(element);

		//onClick property
		element.click();

		document.body.removeChild(element);
	}
	return (
		<section id="banner-section">
			<div className="container position-relative">
				{typeof props.breadCrumbs !== "undefined" ? <nav aria-label="breadcrumb" className="breadcrumbs">
					<ol className="breadcrumb">
						{props.breadCrumbs.map((bc, key) => (bc.link ? <li className="breadcrumb-item" key={key}><Link to={bc.link}>{bc.title}</Link></li> : <li className="breadcrumb-item active" aria-current="page" key={key}>{bc.title}</li>))}
					</ol>
				</nav> : ""}
				<div className="row">
					<div className={typeof props.equalWidth !== "undefined" && props.equalWidth ? "col-sm-12 col-md-12 col-lg-6 col-xl-6" : "col-sm-12 col-md-12 col-lg-6 col-xl-5"}>
						<div className="banner-content innerpage-banner">
							<h1 className="banner-heading">{props.title}</h1>
							<h2 className="banner-subheading">{props.subtitle}</h2>
							{props.text !== "" && <div className="banner-desc d-none d-sm-none d-md-none d-lg-block" dangerouslySetInnerHTML={{ __html: props.text }}></div>}
							{props.btn !== false && props.sendUrl !== null && props.sendUrl !== "" ? <Link className="btn btn-primary d-none d-sm-none d-md-none d-lg-inline-block" to={props.sendUrl}>{props.btnTxt || "Learn more"}</Link> : ""}
							{props.downloadBtn === true ? <button className="btn btn-primary" onClick={() => { sendemail() }}>Download e-guide</button> : ""}
							{props.downloadBtn2 === true ? <a className="btn btn-primary" href="#get-in-touch">Download e-guide</a> : ""}
							{props.readTime !== null && props.readTime !== "" && props.readTime !== undefined ? <div class="rdtime">Read Time<br />{props.readTime}</div> : ""}

							
						</div>
					</div>
					<div className={typeof props.equalWidth !== "undefined" && props.equalWidth ? "col-sm-12 col-md-12 col-lg-6 col-xl-6" : "col-sm-12 col-md-12 col-lg-6 col-xl-5"}>
						<div className="banner-image">
							<img src={props.bannerImg?.localFile?.childImageSharp?.resize?.src} className="img-fluid" alt={props.bannerImg?.altText} />
						</div>
					</div>
					<div className="col-12 d-block d-sm-block d-md-block d-lg-none banner-mdesc">
						<div className="banner-desc" dangerouslySetInnerHTML={{ __html: props.text }}></div>

						{props.btn !== false && props.sendUrl !== null && props.sendUrl !== "" ? <Link className="btn btn-primary" to={props.sendUrl}>{props.btnTxt || "Learn more"}</Link> : ""}
						
					</div>
				</div>
			</div>
		</section>
	)
}
export default topBanner