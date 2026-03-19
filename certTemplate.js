
function certTemplate({
  title,
  price,
  duration,
  imageUrl,
  Highlights = [],
  prerequisites = [],
  keySkills = [],
  courseHighlights = []
}) {

    console.log("Key Skills:", keySkills)
	console.log("Rendering Highlights:", Highlights);
    let prereqArray = prerequisites;
	let highlightArray = Highlights;
  return `
<!DOCTYPE html>
<html lang="en-us" dir="ltr">
<head>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} - India CyberLearning</title>

  <link rel="stylesheet" href="/styles.css">

				   <style>
				   	* {
    font-family: "Quicksand", sans-serif !important;
  }
  .key-skills-list li {
    font-weight: 200 !important;
	list-style: disc !important;

  }
  .injected-content {
    font-size: 18px;
    line-height: 1.6;
    font-weight: 400;
  }

  .injected-content ul {
    list-style: disc;
    padding-left: 2rem;
  }

  .injected-content li {
    margin-bottom: 0.5rem;
  }
	html, body {
  max-width: 100%;
  overflow-x: hidden;
}

		   /* Styling specifically for the page title section */
		   .page-header {
			background-color: navy;
			color: white;
			text-align: center;
			padding: 20px;
			font-size: 2em;
			font-family: Arial, sans-serif;
		   }
				   </style>
				 <style>
				.cert-badge-container {
					width: 100%;
					min-width: 30vw; /* Adjust this to how big you want the badge to be */
					margin: 0 auto;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.cert-badge-img {
					max-width: 30vw;      /* Take up the full 200px width */
					max-height: 50vh;     /* Maintain original aspect ratio automatically */
					display: block;
					object-fit: contain; 
				}
                .large-text
                 {
                    font-size: 64px;
                 }
                .chunky-text {
                    font-size: 48px;
                }
                .chubby-text {
                font-size: 36px;
                }
                .okay-text{
                font-size: 24px;
                }
                .skinny-text{
                font-size: 16px;
                }
					/* Two logo flex header */
					header {
								display: flex;
								justify-content: space-between;
								align-items: flex-start;
								padding: 10px;
								background-color: #f4f4f4;
							}
					
							.logo-left {
								display: flex;
								flex-direction: column;
								align-items: flex-start;
							}
					
							.logo-left img,
							.logo-right img {
							max-width: 30vw;
							max-height: 20vh;
							object-fit: contain;
							}
					
							.logo-left span {
								margin-top: 5px;
								font-size: 14px;
								color: #333;
							}

					  
					
					</style>
				 <style>
					body {
						font-family: Arial, sans-serif;
						margin: 0;
						padding: 0;
					}
				
					nav {
						background-color: navy;
						color: white;
						padding: 0;
					}
				
					.menu {
						list-style: none;
						padding: 15px 20px;
						margin: 0;
						display: flex;
					}
				
					.menu > li {
						position: relative; /* Needed for dropdown positioning */
						padding: 15px 20px;
						cursor: pointer;
					}
				
					.menu a {
						text-decoration: none;
						color: white !important; /* Force white text in all cases */
					}
				
					/* Override all link states with high specificity */
					.menu a:link,
					.menu a:visited,
					.menu a:hover,
					.menu a:active {
						color: white !important; /* Ensure white text remains consistent */
						text-decoration: none !important; /* Prevent underlines or other hover effects */
					}
				
					/* Dropdown styles */
					.ndropdown, .dropdown-sub {
						display: none; /* Hidden by default */
						position: absolute;
						background-color: navy;
						padding: 0;
						list-style: none;
						margin: 0;
						top: 100%;
						left: 0;
						min-width: 150px;
						z-index: 10;
						border: 1px solid #555;
					}
				
					.ndropdown li {
						position: relative; /* Needed for sub-dropdown positioning */
						padding: 10px 15px;
					}
				
					.ndropdown li:hover {
						background-color: #003366; /* Slightly lighter navy for hover */
						color: white !important; /* Ensure text color stays white */
					}
				
					/* Sub-dropdown styles */
					.dropdown-sub {
						top: 0;
						left: 100%; /* Sub-menu appears to the right of the parent */
					}
				
					/* Show dropdowns on hover */
					.menu > li:hover > .ndropdown,
					.ndropdown li:hover > .dropdown-sub {
						display: block; /* Ensure dropdown is visible */
					}
				
					/* Add spacing for smooth transitions to sub-menus */
					.ndropdown li {
						padding-right: 20px; /* Adds space between text and sub-dropdown */
					}
				</style>
				<style>
				/* CSS */
.button-18 {
  align-items: center;
  background-color: #0A66C2;
  border: 0;
  border-radius: 100px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-flex;
  font-family: -apple-system, system-ui, system-ui, "Segoe UI", Roboto, "Helvetica Neue", "Fira Sans", Ubuntu, Oxygen, "Oxygen Sans", Cantarell, "Droid Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Lucida Grande", Helvetica, Arial, sans-serif;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  line-height: 20px;
  max-width: 480px;
  min-height: 40px;
  min-width: 0px;
  overflow: hidden;
  padding: 0px;
  padding-left: 20px;
  padding-right: 20px;
  text-align: center;
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;
  vertical-align: middle;
    cursor: default;
}

  .key-skills-wrapper {
    font-weight: normal;
  }

  .key-skills-wrapper ul,
  .key-skills-wrapper li {
      list-style: disc !important;
    font-weight: 300 !important;
    font-size: 20px;
  }
</style>

</head>

<body>

  <div id="header-div"></div>

  

     <body lang="en-us" dir="ltr">
				<div id="header-div"></div>  
				   </div>

                    
                    

				   <div class="mainContainer  uhf-container is-full  has-default-focus" data-bi-name="body">

					   <div class="columns has-large-gaps is-gapless-mobile  is-gapless">
						   <!-- .primary-holder -->
						   <section class="primary-holder column ">
							   <!--div.columns -->
							   <div class="columns is-gapless-mobile has-large-gaps  is-gapless">
								   <div id="main-column" class="column ">

									   <main id="main" class="" role="main" data-bi-name="content" lang="en-us" dir="ltr">
										   <div>
											   <button type="button" class="border contents-button button button-clear button-sm is-hidden-tablet has-inner-focus" data-bi-name="contents-expand" data-contents-button hidden>
												   <span class="icon">
													   <span class="docon docon-editor-list-bullet" aria-hidden="true"></span>
												   </span><span class="contents-expand-title">Table of contents</span>
											   </button>
										   </div><!-- end mobile-contents button  -->

										   <div class="">
											   <!-- <content> --><div id="Marketing" class="has-overflow-hidden">
<div class="injected-content">

												   <div id="bifold-section-5">
													   <div class="uhf-container padding-block-lg " style="padding-bottom:-5%; margin-bottom: 0;">
														   <div class="columns is-gapless-mobile has-large-gaps">
															   <div class="column display-flex">
																   <div class="is-full-width display-flex flex-direction-column flex-grow-1   padding-block-xs">
																	   <h2 id="teach-ai-with-microsoft-applied-skills" class="title is-2 is-responsive">
																		What is the ${title} Certification?
																	   </h2>
                                                                       <h4 style="padding-bottom: 1%">The ${title} Certification is the Official Microsoft Certification to certify the following skills: </h4>
																	   <div class="key-skills-wrapper font-size-lg">
                                                                   <ul class="key-skills-list" style=""> 
                                                                       ${keySkills.map(p => `<li class="key-skills-list font-size-lg" style="">${p}</li>`).join("")}
                                                                       </ul>
                                                                </div>
                                                                       <br>
                                                                   		<h2 class="font-size-lg"  >Benefits of learning with us?</h2>
																	   <div class="content">
																		   <ul>
																		   <li> <b> 100% Pass Rate:</b> for ${title} as of January 2026  
																		   <li> <b> Live Training:</b> Master trainer will answer doubts and clarify concepts live </li>
																		   <li> <b> Hands-on Demos:</b> Live demos using Azure AI services </li>
																		   <li> <b> Per Day Costing:</b> Expert trainer at same payment, regardless of batch size </li>
                                                                           </ul>
																	<h2 class="font-size-lg" style="margin-right: 7.5%"> Only These Pre-Requisites required For CyberLearning Training
																	   </h2>
																	   <ul>
                                                                    ${prereqArray.map(p => `<li class="font-size-lg">${p}</li>`).join("")}
																		</ul>
																	   </div>														
                                                                    <p> <button class="button-18" role="button"> Vouchers Included  </button> <button class="button-18" role="button"> Price/day: ₹${price}  </button> <button class="button-18" role="button"> Duration: ${duration}  </button> </p>




																	  
																   </div>
															   </div>
															   <div class="" style="">
																<div class="column "> <div class="display-flex flex-direction-column flex-grow-1">
																		<figure class="">
																			<img src="${imageUrl}" alt="${title}" class="cert-badge-img">
																		</figure>
																	</div>
																</div>
															   </div>
																			</div>
																	   </div>

														   </div>
													   </div>
												   </div>
											   </div>
										   </div>
								   </div>
							   </div>
							   <!-- div id="markdown-section-6" class=""> -->
							   <!--	<div class="uhf-container padding-top-sm"> -->
															</div>
					   </div>
				   </div>
<div id="testimonal-div"> </div> 

<button type="button" class="btn btn-primary btn-lg btn-block"> <a href="https://calendly.com/cyberlearningindia" style="color: white;"> Invest in your future with us </a> </button>
				   </div>
				   </div>
				   </div>
				   <!-- end of interactive container -->
                   
				   </div>

				   </div>
				   <!--end of .mainContainer -->
				   <section class="border-top has-default-focus is-hidden-interactive margin-top-sm  margin-top-none">

				</section>
				<div id="footer-div"></div>
				   <div id="action-panel" role="region" aria-label="Action Panel" class="action-panel has-default-focus" tabindex="-1"></div>
			   </body>

  <div id="footer-div"></div>

  <script>
    async function loadHtmlPartial(url, targetId) {
      const res = await fetch(url);
      const html = await res.text();
      document.getElementById(targetId).innerHTML = html;
    }

    document.addEventListener("DOMContentLoaded", () => {
      loadHtmlPartial("/icpl_header.html", "header-div");
	  loadHtmlPartial("/testimonials.html", "testimonal-div");
      loadHtmlPartial("/footer.html", "footer-div");
	  
    });
  </script>

</body>
</html>
`;
};
export default certTemplate;
