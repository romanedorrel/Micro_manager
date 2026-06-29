import {
  Calendar,
  CheckCircle,
  CircleUserRound,
  Leaf,
  Mail,
  Shield,
} from "lucide-react";
import profileReflectionImage from "../../assets/clearPath.png";
import useMediaQuery from "../../hooks/useMediaQuery";
import "./profile.css";

const AccountManagement = () => {
  const showSidePanel = useMediaQuery("(min-width: 1401px)");

  return (
    <main className="profile-section-page">
      <section className="profile-section-header">
        <h1>
          Your TrueNorth Profile <Leaf size={24} />
        </h1>
        <p>Manage your account details and view your progress at a glance.</p>
      </section>

      <section className="profile-layout">
        <div className="profile-main">
          <article className="profile-section-card profile-identity-card">
            <div className="profile-avatar">
              <CircleUserRound size={42} />
            </div>

            <div>
              <h2>TrueNorth User</h2>
              <p>Building steady progress, one goal at a time.</p>
            </div>

            <button className="profile-secondary-btn" disabled>
              Edit Profile Coming Soon
            </button>
          </article>

          <article className="profile-section-card">
            <h3>Account Information</h3>

            <div className="profile-info-list">
              <div className="profile-section-row profile-info-row">
                <span>
                  <Mail size={18} />
                  Email
                </span>

                <strong>Account email</strong>
              </div>

              <div className="profile-section-row profile-info-row">
                <span>
                  <Shield size={18} />
                  Password
                </span>

                <strong>••••••••</strong>
              </div>

              <div className="profile-section-row profile-info-row">
                <span>
                  <Calendar size={18} />
                  Member Since
                </span>

                <strong>June 2026</strong>
              </div>
            </div>
          </article>

          <article className="profile-section-card">
            <h3>Progress Snapshot</h3>

            <div className="profile-stats-grid">
              <div>
                <span>Active Goals</span>
                <strong>5</strong>
              </div>

              <div>
                <span>Completed Goals</span>
                <strong>6</strong>
              </div>

              <div>
                <span>Tasks Completed</span>
                <strong>12</strong>
              </div>

              <div>
                <span>Current Focus</span>
                <strong>V1.1</strong>
              </div>
            </div>
          </article>
        </div>

        {showSidePanel && (
          <aside className="profile-side-panel">
            <article className="profile-image-card">
              <img
                src={profileReflectionImage}
                alt=""
                loading="lazy"
                className="profile-reflection-image"
              />

              <div>
                <Leaf size={30} />
                <p>Small steps today create a calmer tomorrow.</p>
              </div>
            </article>

            <article className="profile-section-card">
              <h3>Profile Enhancements</h3>

              <ul className="profile-check-list">
                <li>
                  <CheckCircle size={17} />
                  Name editing coming soon
                </li>

                <li>
                  <CheckCircle size={17} />
                  Username support planned
                </li>

                <li>
                  <CheckCircle size={17} />
                  Personalization planned for V1.2
                </li>
              </ul>
            </article>
          </aside>
        )}
      </section>
    </main>
  );
};

export default AccountManagement;
