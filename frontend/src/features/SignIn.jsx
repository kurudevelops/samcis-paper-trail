function SignIn() {
    return (
        <div className="sign-in">
            <div className="sign-in-box">
                <img className="paper-trail-logo" src="/images/paper-trail-logo.png" alt="Paper trail logo" />
                <h1>Paper Trail</h1>
                <button className='with-icon oauth'><img className="btn-icon circular" src="/images/google-logo.png" alt="Google logo" /><div>Sign in with Google</div></button>
                <div className="or-divider">
                    <div className="line"></div>
                    <div>or</div>
                    <div className="line"></div>
                </div>
                <button className='outline'>Sign in as Guest</button>
                <img className='slu-logo' src="/images/slu-logo.svg" alt="SLU logo" />
                </div>
        </div>
    )
}

export default SignIn;