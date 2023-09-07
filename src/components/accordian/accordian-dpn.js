import * as React from "react"
import AccordianSlideDpn from "./accordian-slide-dpn"

const Accordian = (props) => {
  const isBrowser = typeof window !== "undefined"  

  React.useEffect(() => {

  }, []);


  return <section id="why-mg" className={props.className}>
    <div className="container">
      {props.title && props.title !== '' ? <div className="row">
        <div className="col">
          <h2>{props.title}</h2>
        </div>
      </div> : ""}
      <div className="row">
        <div className="col">
          <div className="accordion" id="accordionExampleDpn">
            {props.data.map((d, key) => {
              return <AccordianSlideDpn
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
