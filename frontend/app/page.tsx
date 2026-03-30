import { LoginForm } from "@/components/login/LoginForm";

export default function LoginPage() {
  return (
    <>
      <div className="left">
        <div className="left-content">
          <div className="institution-header">
            <div className="badge-wrap">
              <img id="badge-img" src="/badge.png" alt="Soroti University crest" />
            </div>
            <div>
              <div className="institution-name">Soroti University<br />Hospital</div>
              <div className="institution-sub">Health Management Information System</div>
              <div className="motto-ribbon">
                <span className="motto-text">Innovate and Create</span>
              </div>
            </div>
          </div>
          <div className="hero-text">
            <div className="hero-eyebrow">University Hospital</div>
            <div className="hero-title">Care that<br />begins with<br /><em>trust.</em></div>
            <div className="hero-body">
              A unified digital platform for Soroti University Hospital — connecting every role
              from reception to pharmacy, with your patient&apos;s wellbeing at the centre.
            </div>
          </div>
        </div>
      </div>
      <LoginForm />
    </>
  );
}
