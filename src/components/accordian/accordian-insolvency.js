import * as React from "react"
import AccordianSlide from "./accordian-slide-insolvency"

const Accordian = (props) => {

  React.useEffect(() => {

  }, []);


  return <section id="why-mg" className={props.className}>
    <div className="container">
      {props.title && props.title !== '' ? <div className="row">
        <div className="col">
          <h2>{props.title}</h2>
        </div>
      </div> : ""}
      {props.description && props.description !== '' ? <div className="row">
        <div className="col ins_desc">
          <div dangerouslySetInnerHTML={{ __html: props.description }}></div>
        </div>
      </div> : ""}
      <div className="row">
        <div className="col">
          <div className="accordion" id="accordionExample">
            {props.data.map((d, key) => {
              return <AccordianSlide
                showEnquireButton={props.showEnquireButton}
                learnMoreText={d.learnMoreText}
                learnMoreUrl={d.learnMoreUrl}
                title={d.title}
                text={d.description}
                tag={d.tag}
                keyloc={key}
                key={key}
              />
            })}
          </div>
        </div>
      </div>
    </div>
  </section>
}

export default Accordian
