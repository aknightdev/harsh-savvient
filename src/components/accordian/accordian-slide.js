import * as React from "react"
import { Link } from "gatsby"
import $ from "jquery"
const AccordianSlide = (props) => {
  // const [cls,setCls] = React.useState('');

  const setCls = function(this_ele){
    console.log($(this_ele).html());
    if($(this_ele).closest('.accordion-item').hasClass('active')){
      console.log(222);
      $(this_ele).closest('.accordion-item').removeClass('active');
    } else {
      console.log(333);
      $('.accordion-item').removeClass('active');
      $(this_ele).closest('.accordion-item').addClass('active');
    }
  }
  const setRmCls = function(){
  }
  React.useEffect(() => {
    if(window.location.hash=='#heading3'){
      document.getElementById('heading3').children[0].classList.remove('collapsed');
      document.getElementById('heading3').nextSibling.classList.add('show');
    }

    return () => {

    };
  });
  return <div className="accordion-item" key={props.keyloc}>
    <h3 className="accordion-header" id={"heading" + props.keyloc}>
      <button
        className="accordion-button collapsed"
        type="button" data-bs-toggle="collapse"
        data-bs-target={"#collapse" + props.keyloc}
        aria-expanded="false"
        aria-controls={"collapse" + props.keyloc}
        onMouseOver={(thisa) => { thisa.target.style.color = props.textHoverColor }}
        onMouseOut={(thisa) => { !thisa.target.classList.contains('collapsed') ? thisa.target.style.color = props.textHoverColor : thisa.target.style.color = props.textColor }}
        onClick={(thisa) => { const col = thisa.target.classList.contains('collapsed') ? props.textColor : props.textHoverColor; thisa.target.style.color = col; setRmCls(); setCls(thisa.target) }}
      >
        {props.title} <sup>{props.tag && props.tag !== null ? props.tag : ""}</sup>
      </button>
    </h3>
    <div id={"collapse" + props.keyloc} className="accordion-collapse collapse hide" aria-labelledby={"heading" + props.keyloc} data-bs-parent="#accordionExample">
      <div className="accordion-body">
        <div dangerouslySetInnerHTML={{ __html: props.text }}></div>
        {props.showEnquireButton == true ? <Link className="btn btn-primary" to={props.learnMoreUrl != null ? props.learnMoreUrl : (props.title=='Voluntary Administration'?'/voluntary-administration/':(props.title=='Small Business Restructure'?'/small-business-restructure/':(props.title=='Safe Harbour'?'/safe-harbour/':"#get-in-touch")))}>{props.learnMoreText != null ? props.learnMoreText : 'Learn More'}</Link> : ""}
      </div>
    </div>
  </div>
}

export default AccordianSlide
