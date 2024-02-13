import * as React from "react"
import { graphql } from "gatsby"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import TopBanner from "../components/top-banner"
import GetInTouch from "../components/get-in-touch3"
import GetInTouchPDF from "../components/get-in-touch-pdf"
import FsLightbox from "fslightbox-react";
import ActiveCampaign from "../components/activecampaign"

// const whyMG = [
//   {
//     "title": "Liquidation",
//     "text":"We’re in the business of resolution. Backed by leading technology and innovative thinking, we make the right decisions at the right time. Capturing opportunity and avoiding obstacles. Delivering the best possible outcome, every day."
//   },
//   {
//     "title": "Receivership",
//     "text":"To achieve success takes determination and focus. We leave no stone unturned. Tailoring solutions to meet your specific needs, on top of every moment. Getting you where you need to be, step by step."
//   },
//   {
//     "title": "Personal Insolvency",
//     "text":"We know time is of the essence. So we put positive action into practice. Taking the initiative, we anticipate your needs and move ahead as swiftly as possible, all without missing a trick."
//   }
// ]

const Post = ({ data }) => {
  const vidRef = React.useRef(null);
  const [glimit,setLimit] = React.useState(6);
  const [showLm,setLm] = React.useState(true);
  const [toggler, setToggler] = React.useState(false);
  const [curslide, setCurslide] = React.useState(0);
  const [showModal, setModal] = React.useState(false);
  const [ytUrl, setYtUrl] = React.useState('');
  const [vdUrl, setVdUrl] = React.useState('');
  const [showVid, setShowVid] = React.useState(false);
  const [showHbForm, setShowHbForm] = React.useState(false);
  const setVideoUrl = (url,tp) => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    if(tp){
      setVdUrl(url);
      setYtUrl('');
    }
    else{
      setVdUrl('');
      setYtUrl((match&&match[7].length==11)? match[7] : false);
    }
    setModal(true);
  }
  const handleStopVideo = () => {
    setModal(false);
    vidRef.current?.pause();
  }
  const checkVideo = () =>{
    if(data.wpPost.title=='Insights into the ATO'){
      setShowVid(false);
    }
    else{
      setShowVid(true);
    }
    setVideoUrl(data.wpPost.eventsOption?.recordingUrl?.url?data.wpPost.eventsOption?.recordingUrl?.url:data.wpPost.eventsOption.video?.mediaItemUrl,data.wpPost.eventsOption?.recordingUrl?.url?0:1);
  }
  const checkVideo1 = () =>{
    if ('hbspt' in window) {
        window.hbspt.forms.create({
        region: "na1",
        portalId: "40112486",
        formId: "33214767-fa74-4e9d-af84-b5c2ab70cc24",
        target: "#formContainer"
      });
      setShowHbForm(true);
    }
  }
  React.useEffect(() => {
    //hubspot
    let scriptEle = document.createElement("script");
    scriptEle.setAttribute("src", '//js.hsforms.net/forms/embed/v2.js');
    scriptEle.setAttribute("type", "text/javascript");
    document.body.appendChild(scriptEle);
    scriptEle.addEventListener("load", () => {
      console.log("File loaded")
    });
    window.addEventListener('message', event => {
      console.log(event.data)
       if(event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormSubmitted') {
           console.log("Form Submitted! Event data: ${event.data}");
       }
    });
    return () => {
    }
   }, [])
  const loadMore = () => {
    setLimit(glimit+6);
    if((glimit+6)>=data.wpPost.backInBusiness.eventGallery.length){
      setLm(false);
    }
  }
  let imgArr = [];
  if(data?.wpPost?.backInBusiness?.eventGallery){
    data?.wpPost?.backInBusiness?.eventGallery.map((d,key) => {
      imgArr.push(d.eventGalleryImage.mediaItemUrl.replace('http://','https://'));
    });
  }
  let breadCrumbs = [
    { link: "/", title: "Home" },
    { title: data.wpPost?.title }
  ]

  if (data.wpPost === null && data.wpArticle !== null) {
    data.wpPost = data.wpArticle;
    breadCrumbs = [
      { link: "/", title: "Home" },
      { link: "/insights", title: "Insights" },
      { link: "/news", title: "News and Articles" },
      { title: data.wpPost.title }
    ]
  } else if (data.wpPost === null && data.wpBusiness !== null) {
    data.wpPost = data.wpBusiness;

    breadCrumbs = [
      { link: "/", title: "Home" },
      { link: "/insights", title: "Insights" },
      { link: "/back-in-business", title: "Back in business" },
      { title: data.wpPost.title }
    ]
  } else if (data.wpPost === null && data.wpEvent !== null) {
    data.wpPost = data.wpEvent;
    data.wpPost.backInBusiness = data.wpPost.eventsOption

    breadCrumbs = [
      { link: "/", title: "Home" },
      { link: "/insights", title: "Insights" },
      { link: "/events", title: "Events" },
      { title: data.wpPost.title }
    ]
  }
  return (<div className="service insolvency posts">
    <Layout>
      <Seo title={data.wpPost?.metaFields?.metaTitle} description={data.wpPost?.metaFields?.metaDescription} />
      <div className="sp_bnr">
      <TopBanner
        title={data.wpPost.title}
        subtitle={data.wpPost.backInBusiness?.subTitle}
        text={''}
        bannerImg={data.wpPost?.featuredImage?.node}
        breadCrumbs={breadCrumbs}
        // btn={typeof window !== 'undefined' && window.location.pathname === '/insights/business-survival-pack/' ? false : true}
        btn={false}
        btnTxt={data.wpPost.backInBusiness?.eventStatus == '' ? '' : (data.wpPost.backInBusiness?.eventStatus == 'enablevideoaccess' ? 'Watch Now' : data.wpPost.backInBusiness?.buttonLabel)}
        sendUrl={data.wpPost.backInBusiness?.eventStatus == 'enablevideoaccess' ? data.wpPost.backInBusiness.recordingUrl?.url : data.wpPost.backInBusiness?.registerUrl}
        downloadBtn2={typeof window !== 'undefined' && window.location.pathname === '/insights/business-survival-pack/' ? true : false}
        readTime={data.wpPost?.articleAuthor?.readTime}
        superbowl={typeof window !== 'undefined' && window.location.pathname === '/insights/super-bowl-lviii/' ? true : false}
        checkVideo1={checkVideo1}
      />
      </div>
       
       <div className="detailPost">
      <div className="container">
        <div className="row">
       
          {data.wpPost?.articleAuthor?.articleAuthor?<div className="col-sm-12 col-md-2 author"> <div className="author_box">
          <div className="socialshare">
            <span>SHARE TO</span>
           <a href={'https://www.facebook.com/share.php?u=https://mackaygoodwin.com.au/insights/'+data.wpPost?.slug} target="_blank">
            <i class="fa fa-facebook-square"></i>
           </a>
             <a href={'https://twitter.com/intent/tweet?url=https://mackaygoodwin.com.au/insights/'+data.wpPost?.slug} target="_blank"><i class="fa fa-twitter"></i></a>
            <a href={'https://www.linkedin.com/sharing/share-offsite/?url=https://mackaygoodwin.com.au/insights/'+data.wpPost?.slug} target="_blank"><i class="fa fa-linkedin"></i></a>
          
          </div>
           
           <div className="post_auther">
           <Link to={'/author/'+data.wpPost?.articleAuthor?.articleAuthor.slug}>
             <div className="autherlt">
              <img src={data.wpPost?.articleAuthor?.articleAuthor.featuredImage?.node.mediaItemUrl} className="img-fluid" alt={data.wpPost?.articleAuthor?.articleAuthor.featuredImage?.node.altText} />
              </div>
             <div className="autherrt">
               <p>AUTHOR</p>
              <h4>{data.wpPost?.articleAuthor?.articleAuthor.title}</h4>
              <h3>{data.wpPost?.articleAuthor?.articleAuthor.backInBusiness?.designation}</h3>

             </div>
             </Link>
           </div>
           
            
             
              
           </div> 
          </div>:null}
          <div className="col-sm-12 col-md-8 sgpost_cont 11">
            <div dangerouslySetInnerHTML={{ __html: data.wpPost.content }}></div>
            <div className="rig_button">

            {data.wpPost.eventsOption?.eventStatus != 'enablevideoaccess' ?
              data.wpPost.eventsOption?.registerUrl ? <a className="bt-big px-4 mx-4" href={data.wpPost.eventsOption?.registerUrl}>{data.wpPost.eventsOption?.buttonLabel} <i className="fa fa-chevron-right" aria-hidden="true"></i></a> : null
            :<a className="bt-big px-4 mx-4" href="javascript:void(0)" onClick={()=>checkVideo()}>{data.wpPost.eventsOption?.buttonLabel} <i className="fa fa-chevron-right" aria-hidden="true"></i></a>
            }
            
            </div>
          </div>
        </div>
      </div>
       </div>
            
      {data.wpPost.backInBusiness?.eventGallery!=null?
      <div className="eventgallery_sec">
        <div className="container">
        
       <FsLightbox
        toggler={toggler}
        sources={imgArr}
        slide={curslide}
        types={[...new Array(imgArr.length).fill('image')]}
      />
            <ul>
            {data.wpPost.backInBusiness.eventGallery!=null && data.wpPost.backInBusiness.eventGallery.map((d,key) => {
              return key<glimit?<li key={key}><div className="event_gsthum">

              <img onClick={() => {setToggler(!toggler);setCurslide(key+1)}} src={d.eventGalleryImage.mediaItemUrl} alt={d.eventGalleryImage.altText} />

              </div></li>:null
            })}
            </ul>
            <div className="me-5 text_center">
              {data.wpPost.backInBusiness.eventGallery!=null && showLm?<button className="btn btn-primary " onClick={()=>loadMore()}>View More</button>:null}
            </div>
        </div>
      </div>
      :null}
      {data.wpPost.backInBusiness?.sponsorsLogo!=null?
      <div className="sponser_sec">
        <div className="container">
        <h2>Thank you to our sponsors for your support!</h2>
          <ul>
            {data.wpPost.backInBusiness.sponsorsLogo.map((d,key) => {
              return <li key={key}><Link target="_blank" to={d.sponsorsLogoLink}><img src={d.sponsorsLogoImage.mediaItemUrl} alt={d.sponsorsLogoImage.altText} /> </Link> </li>
            })}
          </ul>
        </div>
      </div>
      :null}
      <div id="myModal" role="dialog" className={showModal?'in show modal fade':'modal fade'}>
        <div className="model_inner">
          <div className="popup_dialog">
            <div className="modal-content">
              <button type="button" className="close" data-dismiss="modal" onClick={()=>handleStopVideo()}>&times;</button>
              <div className="popup_body">

                {!showVid?<div className="video_form"><ActiveCampaign setShowVid={setShowVid} /></div>:
                <div className="video_ratio cc">
                {vdUrl?<video key={vdUrl} width="100%" ref={vidRef} controls><source src={vdUrl} type="video/mp4" />Your browser does not support the video tag.</video>:<iframe key={ytUrl} className="embed-responsive-item" src={'https://www.youtube.com/embed/'+ytUrl+'?autoplay=1&amp;amp;modestbranding=1&amp;amp;showinfo=0'} id="video" allowscriptaccess="always"></iframe>}
                </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="myModal1" role="dialog" className={showHbForm?'in show modal fade':'modal fade'}>
        <div className="model_inner">
          <div className="popup_dialog">
            <div className="modal-content">
              <button type="button" className="close" data-dismiss="modal" onClick={()=>setShowHbForm(false)}>&times;</button>
              <div className="popup_body">
              <div className="video_form">
              <div class="hs-richtext hs-main-font-element"> <h2>Register your interest</h2></div>
              
               
                <div id="formContainer"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {typeof window !== "undefined" && window.location.pathname.indexOf("/insights/business-survival-pack") >= 0 && <GetInTouchPDF
        title={'Download e-guide'}
        text={'Download your free copy today and get on the path to recovery'}
      />}
      {typeof window !== "undefined" && window.location.pathname.indexOf("/insights/business-survival-pack") < 0 && <div className="home"><GetInTouch
        title={data.allWp.nodes[0].themeGeneralSettings.themeGeneralSettings.getInTouchTitle}
        text={data.allWp.nodes[0].themeGeneralSettings.themeGeneralSettings.getInTouchDescription}
      /></div>}
    </Layout>
  </div>
  )
}
export const query = graphql`
query ($id: String) {
    wpPost(id: {eq: $id}) {
      title
      content
      slug
      featuredImage {
        node {
          altText
          mediaItemUrl
          localFile {
            childImageSharp {
              resize (width: 526, height: 351, cropFocus: CENTER, quality: 80) {
                src
              }
            }
          }
        }
      }
      metaFields {
        metaDescription
        metaTitle
      }
    }
    wpArticle(id: {eq: $id}) {
      title
      content
      slug
      featuredImage {
        node {
          altText
          mediaItemUrl
          localFile {
            childImageSharp {
              resize (width: 526, height: 351, cropFocus: CENTER, quality: 80) {
                src
              }
            }
          }
        }
      }
      metaFields {
        metaDescription
        metaTitle
      }
      articleAuthor {
        readTime
        articleAuthor {
          ... on WpOurpeople {
            slug
            title
            content
            backInBusiness {
              designation
              twitter
              facebook
              linkedin
            }
            featuredImage {
              node {
                altText
                mediaItemUrl
                localFile {
                  childImageSharp {
                    resize (width: 526, height: 351, cropFocus: CENTER, quality: 80) {
                      src
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    wpBusiness(id: {eq: $id}) {
      title
      content
      slug
      backInBusiness {
        subTitle
      }
      featuredImage {
        node {
          altText
          mediaItemUrl
        }
      }
      metaFields {
        metaDescription
        metaTitle
      }
    }
    wpEvent(id: {eq: $id}) {
      title
      content
      slug
      eventsOption {
        subTitle
        buttonLabel
        registerUrl
        eventStatus
        recordingUrl {
          url
        }
        sponsorsLogo{
          sponsorsLogoImage{
            altText
            mediaItemUrl
          }
          sponsorsLogoLink
        }
        eventGallery{
          eventGalleryImage{
            altText
            mediaItemUrl
          }
        }
        shortDescription
        video {
          mediaItemUrl
        }
      }
      featuredImage {
        node {
          altText
          mediaItemUrl
          localFile {
            childImageSharp {
              resize (width: 526, height: 351, cropFocus: CENTER, quality: 80) {
                src
              }
            }
          }
        }
      }
      metaFields {
        metaDescription
        metaTitle
      }
    }
    allWp {
      nodes {
        themeGeneralSettings {
          themeGeneralSettings {
            copyrightText
            expertAdviceLink
            expertAdviceTitle
            fieldGroupName
            getInTouchDescription
            getInTouchTitle
            speakExpertLink
            speakExpertTitle
          }
        }
      }
    }
  }
`

export default Post
