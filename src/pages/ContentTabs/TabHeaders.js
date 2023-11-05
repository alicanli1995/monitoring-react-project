const TabHeaders = ({host, handleTabChanges}) => {

  return (
      <>
        <ul className="nav nav-tabs" id="host-tabs">
          <li className="nav-item">
            <a className="nav-link active"
               data-target="" data-toggle="tab"
               onClick={() => handleTabChanges('host-tab')}
               id="host-tab" role="tab">Host</a>
          </li>

          {host.ID !== 0 &&
              <li className="nav-item">
                <a className="nav-link"
                   data-target="" data-toggle="tab"
                   onClick={() => handleTabChanges('services-tab')}
                   id="services-tab" role="tab">Manage Services</a>
              </li>
          }
          {host.ID !== 0 &&
              <li className="nav-item">
                <a className="nav-link"
                   data-target=""
                   data-toggle="tab"
                   onClick={() => handleTabChanges('healthy-tab')}
                   id="healthy-tab" role="tab">Healthy</a>
              </li>
          }
          {host.ID !== 0 &&
              <li className="nav-item">
                <a className="nav-link"
                   data-target=""
                   data-toggle="tab"
                   onClick={() => handleTabChanges('warning-tab')}
                   id="warning-tab" role="tab">Warning</a>
              </li>
          }

          {host.ID !== 0 &&
              <li className="nav-item">
                <a className="nav-link"
                   data-target=""
                   data-toggle="tab"
                   onClick={() => handleTabChanges('problem-tab')}
                   id="problem-tab" role="tab">Problems</a>
              </li>
          }

          {host.ID !== 0 &&
              <li className="nav-item">
                <a className="nav-link"
                   data-target=""
                   data-toggle="tab"
                   onClick={() => handleTabChanges('pending-tab')}
                   id="pending-tab" role="tab">Pending</a>
              </li>
          }
        </ul>
      </>
  )
}

export default TabHeaders;