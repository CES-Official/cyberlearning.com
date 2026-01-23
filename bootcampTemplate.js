function bootcampTemplate({
  title,
  duration,
  imageUrl,
  price,
  Highlights = [],
  prerequisites = [],
  keySkills = [],
  courseHighlights = [],
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
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Quicksand&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">

  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} - India CyberLearning</title>

  <link rel="stylesheet" href="/styles.css">

				   <style>
	* {
    font-family: "Quicksand", sans-serif !important;
  }
	body {
	  font-family: "Quicksand", sans-serif;
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

		   /* Styling specifically for the page title section */
		   .page-header {
			background-color: navy;
			color: white;
			text-align: center;
			padding: 20px;
			font-size: 2em;
			font-family: "Quicksand", sans-serif;
		   }
				   </style>
				 <style>
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
					
							.logo-left img {
								width: 250px; /* Adjust as needed */
							}
					
							.logo-left span {
								margin-top: 5px;
								font-size: 14px;
								color: #333;
							}
					
							.logo-right img {
								width: 125px; /* Adjust as needed */
							}
					  
					
					</style>
				 <style>
					body {
						font-family: "Quicksand", sans-serif;
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
													   <div class="uhf-container padding-block-lg " style="padding-bottom: 0; margin-bottom: 0;">
														   <div class="columns is-gapless-mobile has-large-gaps">
															   <div class="column is-half display-flex">
																   <div class="is-full-width display-flex flex-direction-column flex-grow-1   padding-block-xs">
																	   <h2 id="teach-ai-with-microsoft-applied-skills" class="title is-2 is-responsive">
																		What is the ${title} Bootcamp?
																	   </h2>
																	   <h4 style="padding-bottom: 1%">The ${title} Bootcamp is a: </h4>
                                                                       <h1 class="" style=" > </h2>
																	   <div class="">
                                                                   <ul class="key-skills-list" style="margin-left: 7.5%"> 
																   <li> Guided zero to hero path to ${title} on MS Azure</li>
																   <li> Course covers ALL necessary concepts and associated skills  </li>
																   <li> Only bootcamp to cover all certifications AND project </li>
																 													
																       ${courseHighlights.map(p => `<li class="font-size-lg">${p}</li>`).join("")}
                                                                       </ul>
                                                                
                                                                        <br>
                                                                   		<h1 class="font-size-lg"> Coveted Azure Certifications Covered</h1>
																	   <div class="content">
																		   <ul>
                                                                       ${keySkills
                                                                        .map(h => `<li class="font-size-lg" style="font-size: 20px; font-weight: 400; text-decoration: none;"> <b> ${h.title} : </b> ${h.description} </li> `)
                                                                        .join("")}
																		   </ul>
                                                                    <h2 class="font-size-lg" style=""> 
																		Guided Project at end of bootcamp includes:
																		
																		</h2>
																		<ul>
																			<li class="font-size-lg">AI Embedded Workflows</li>
																			<li class="font-size-lg">Hands-On Usage of Azure/Open Source  tools</li>
																			<li class="font-size-lg">Real-World Case Scenario with dummy data</li>
																			<li class="font-size-lg">Live Doubt Clearing Sessions with Trainer</li>
																			<li class="font-size-lg">Keyword Lists for Resumes</li>
																		</ul>
																	   <ul>
                                                                    ${prereqArray.map(p => `<li class="font-size-lg">${p}</li>`).join("")}
																		</ul>
                                                                           <h2 class="font-size-lg" style="">
																		Only These Pre-Requisites required For CyberLearning Training
																	   </h2>
																	   <ul>
                                                                    ${prereqArray.map(p => `<li class="font-size-lg">${p}</li>`).join("")}
																		</ul>

																<p> <button class="button-18" role="button"> Vouchers Included  </button> <button class="button-18" role="button"> Price: ₹${price}  </button> <button class="button-18" role="button"> Duration: ${duration}  </button> </p>

																	   </div>														
                                                                       



																	  
																   </div>
															   </div>
															   <div class="" style="margin-left: 25%;">
																   <div class="is-full-width display-flex flex-direction-column flex-grow-1">
																	   <figure class="image  " style="margin-right: 10%;">
																		   <img src="${imageUrl}" alt="${title}" width="50px" data-linktype="absolute-path">
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
							   <!-- div id="markdown-section-6" class="padding-block-sm"> -->
							   <!--	<div class="uhf-container padding-top-sm"> -->
															</div>
					   </div>
				   </div>
<div id="testimonal-div"> </div> 

<button type="button" class="btn btn-primary btn-lg btn-block">Invest in your future with us</button>
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
export default bootcampTemplate;