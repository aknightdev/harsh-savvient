import * as React from "react"
import { Link } from "gatsby"
import dateFormat, { masks } from "dateformat";

const EventsList = (props) => {
  const dateFormatChange = (d) => {
    const t = d.split(" ");
    const t1 = t[0].split("/").reverse().join("/")
    return t1+" "+t[1];
  }
  
  return(

  <div className="events_mgacademy col-lg-4">
    <div className="my-3">
      <div className="row">
        <div className="col-lg-12">
        <div className=" bg_1">
          <div className="mg_img"> <img className="img-fluid" style={{ objectFit: "cover" }} src={props.data?.featuredImage?.node?.mediaItemUrl} alt={props.data?.featuredImage?.node?.altText} />
            </div>
            <div className="events_mid_part">
          <h4 className="px-4 mb-4">{props.data.title} </h4>
          <span className="px-4">{dateFormat(dateFormatChange(props.data.eventsOption?.eventDate), 'mmmm dS, yyyy, h:MM TT')}</span>
          {props.data.eventsOption?.shortDescription !=null?<div className="py-4 px-4 sh_desc_1" dangerouslySetInnerHTML={{ __html: props.data.eventsOption?.shortDescription }}></div>:<div className="py-4 px-4 desc_1" dangerouslySetInnerHTML={{ __html: props.data.excerpt }}></div>}
          <div className="buttons_2">
          {props.data.eventsOption?.eventStatus != 'enablevideoaccess' ?
            props.data.eventsOption?.registerUrl ? <a className="bt-big px-4 mx-4" href={props.data.eventsOption?.registerUrl}>{props.data.eventsOption?.buttonLabel} <i className="fa fa-chevron-right" aria-hidden="true"></i></a> : null
            :
            <a className="bt-big px-4 mx-4" href="javascript:void(0)" onClick={()=>props.setVideoUrl(props.data.eventsOption?.recordingUrl?.url?props.data.eventsOption?.recordingUrl?.url:props.data.eventsOption.video?.mediaItemUrl,props.data.eventsOption?.recordingUrl?.url?0:1)}>{props.data.eventsOption?.buttonLabel} <i className="fa fa-chevron-right" aria-hidden="true"></i></a>
            // <Link className="bt-big px-4 mx-4" to={props.data.eventsOption?.recordingUrl?.url}>{props.data.eventsOption?.buttonLabel} <i className="fa fa-chevron-right" aria-hidden="true"></i></Link>
          }
          <Link className="ps-4 pe-4 px-4" to={"/insights/" + props.data.slug + "/"}>Read More <i className="fa fa-chevron-right" aria-hidden="true"></i></Link>
          </div>
          </div>
        </div>
         </div>
      </div>
    </div>
  </div>

  )
}
export default EventsList
