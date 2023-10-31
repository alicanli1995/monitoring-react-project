function Error404() {
  return (

      <div id="layoutError">
        <div id="layoutError_content">
          <main>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-6">
                  <div className="text-center mt-4">
                    <img className="mb-4 img-error"
                         src="../../assets/img/error-404-monochrome.svg"/>
                    <p className="lead">This requested URL was not found on this
                      server.</p>
                    <a href="/public">
                      <i className="fas fa-arrow-left mr-1"></i>
                      Return to home page
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
        <div id="layoutError_footer">
          <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid">
              <div
                  className="d-flex align-items-center justify-content-between small">

              </div>
            </div>
          </footer>
        </div>
      </div>
  )
}

export default Error404