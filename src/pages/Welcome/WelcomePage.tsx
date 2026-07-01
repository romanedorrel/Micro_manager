import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Check, DraftingCompass } from "lucide-react";
import { completeOnboarding } from "../../services/profileApi";
import { useAuth } from "../../context/AuthContext";
import welcomeImage from "../../assets/Welcome.png";
import "./welcomePage.css";

const WelcomePage = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  const handleFinish = async () => {
    if (!accessToken) return;

    try {
      await completeOnboarding(accessToken);
      navigate("/scheduler");
    } catch (error) {
      console.error("Failed to complete onboarding", error);
    }
  };

  const progressDots = (
    <div
      className="welcome-progress"
      aria-label={`Welcome step ${step + 1} of 4`}
    >
      {[0, 1, 2, 3].map((index) => (
        <span key={index} className={step === index ? "active" : ""} />
      ))}
    </div>
  );

  return (
    <main className="welcome-page">
      <section className="welcome-card">
        <section className="welcome-content">
          {step === 0 && (
            <>
              <p className="welcome-eyebrow">Welcome</p>
              <h1>Welcome to TrueNorth</h1>
              <p className="welcome-intro">
                A calm, focused experience built to help you turn goals into
                reality
              </p>
              <img
                src={welcomeImage}
                alt="Calm workspace"
                className="welcome-image"
              />
              <p className="welcome-support">
                Small, consistent steps create meaningful progress.
              </p>

              <button className="welcome-primary" onClick={() => setStep(1)}>
                Get Started
              </button>
            </>
          )}
          {step === 1 && (
            <>
              <p className="welcome-eyebrow">How TrueNorth Works</p>

              <div className="welcome-step">
                <span>1</span>
                <div>
                  <h3>Create a Goal</h3>
                  <p>Describe something meaningful you want to accomplish.</p>
                </div>
              </div>

              <div className="welcome-step">
                <span>2</span>
                <div>
                  <h3>Review your plan</h3>
                  <p>
                    We&apos;ll break your goal into smaller, actionable tasks.
                  </p>
                </div>
              </div>

              <div className="welcome-step">
                <span>3</span>
                <div>
                  <h3>Focus on Today</h3>
                  <p>Each day you&apos;ll know exactly what to work on next.</p>
                </div>
              </div>

              <div className="welcome-actions">
                <button onClick={() => setStep(0)}>Back</button>
                <button onClick={() => setStep(2)}>Continue</button>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <p className="welcome-eyebrow">Your Experience</p>
              <h2>What you won&apos;t find</h2>

              <p className="welcome-negative">
                <X /> Endless dashboards
              </p>
              <p className="welcome-negative">
                <X /> Productivity guilt
              </p>
              <p className="welcome-negative">
                <X /> Information overload
              </p>

              <h3>Instead, you&apos;ll find</h3>

              <p className="welcome-positive">
                <Check /> Calm guidance
              </p>
              <p className="welcome-positive">
                <Check /> One clear next step
              </p>
              <p className="welcome-positive">
                <Check /> Quiet progress every day
              </p>

              <div className="welcome-actions">
                <button onClick={() => setStep(1)}>Back</button>
                <button onClick={() => setStep(3)}>Continue</button>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <p className="welcome-eyebrow">You&apos;re Ready</p>
              <h2>Create your first goal</h2>
              <div className="welcome-finish-icon">
                <DraftingCompass size={180} strokeWidth={1.5} />
              </div>
              <p>
                The best way to learn TrueNorth is by creating your first goal.
              </p>

              <div className="welcome-actions">
                <button onClick={() => setStep(2)}>Back</button>
                <button className="welcome-primary" onClick={handleFinish}>
                  Create My Goal
                </button>
              </div>
            </>
          )}
        </section>
        {progressDots}
      </section>
    </main>
  );
};

export default WelcomePage;
