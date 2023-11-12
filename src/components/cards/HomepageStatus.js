import React, {useEffect, useState} from "react";
import {getClassConverter, getFirstLetterUpperCase} from "../../utils/utils";

const HomepageStatus = (props) => {

  const [servicesCount, setServicesCount] = useState(0)

  useEffect(() => {
    setServicesCount(props.servicesCount)
  }, [props]);

  return (
      <>
        <div className={"card border-" + getClassConverter(props.status)
            + " mb-4"}
             style={{border: "1px solid red"}}>
          <div className={"card-body text-" + getClassConverter(props.status)}>
            <span id={props.status
                + " _count"}> {servicesCount[props.status]} </span>
            {getFirstLetterUpperCase(props.status) + " service(s)"}
          </div>
          <div
              className="card-footer d-flex align-items-center justify-content-between"
              style={{
                padding: "0.75rem 1.25rem",
                backgroundColor: "rgba(0, 0, 0, 0.03)",
                borderTop: "1px solid rgba(0, 0, 0, 0.125)"
              }}>
            <a className={"small text-" + getClassConverter(props.status)
                + " stretched-link"}
               href={"/all-" + props.status}>
              View Details</a>
            <div className={"small text-" + getClassConverter(props.status)}><i
                className="fas fa-angle-right"></i></div>
          </div>
        </div>
      </>
  )

}

export default HomepageStatus